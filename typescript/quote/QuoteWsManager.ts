
// 一、核心需求梳理
// 全局仅维持一条 WebSocket 长连接，不创建多连接，节省服务端连接资源；
// 支持单页面同时订阅多只不同标的（如持仓列表同时展示 10 只股票行情）；
// 单标的可被页面内多个组件同时使用（如 K 线组件、分时卡片、持仓表格共用同一只股票）；
// 组件销毁只做引用计数递减，仅当该标的所有使用组件全部销毁时，才发送取消订阅指令，避免重复订阅、频繁上下行信令，减轻行情网关压力；
// 行情数据统一落地 Zustand 状态库，所有组件按需细粒度读取，规避 RTK 高频渲染卡顿问题。
// 仅靠独立 Hooks 无法实现，Hooks 作用域隔离，每个组件实例内部变量互不互通，必须抽离全局单例 WS 订阅管理器统一维护所有标的的引用计数、消息收发、重连逻辑。
// 二、最优实现方案：单例 WS 订阅管理器（生产标准落地方案）
// 1. 整体设计思路
// 全局唯一 WebSocket 实例，全程复用，页面多标的、多组件共用这一条连接；
// 管理器内部维护两张核心 Map：
// subscribeRefCount: Map<string, number>：key = 股票代码，value = 当前使用该标的的组件计数；
// activeCodes: Set<string>：记录当前已向服务端订阅、有效存活的标的集合；
// 对外暴露subscribeCode(code)、unSubscribeCode(code)两个方法，只做计数增减；
// 计数从 0→1：发送 ws 订阅指令，将 code 存入 activeCodes；
// 计数从 1→0：发送 ws 取消订阅指令，从 activeCodes 移除 code；
// WebSocket 全局消息监听，后端推送任意标的行情后，统一更新 Zustand 行情仓库；
// 封装通用 Hook useStockQuote(code)，所有业务组件统一调用，自动处理挂载订阅、卸载减计数，业务层无需关心 WS 底层、计数逻辑。


// 不能只单纯把订阅逻辑放到同一个 hooks 里，因为 hooks 内部变量作用域隔离，多个组件调用同一个 hooks 会各自维护独立状态，无法共享引用计数，一个组件销毁就会直接取消标的订阅，导致其他组件丢失行情。
// 正确实现方式是：封装全局 WS 订阅管理器，用 Map 记录每个股票标的的组件引用计数，再封装统一 useStockQuote 公共 hooks 给所有组件使用。
// 组件挂载时计数加一，计数从 0 变为 1 才向后端发起订阅；组件销毁计数减一，只有计数归零才执行取消订阅。
// 多个组件共用同一标的时，单个组件销毁只会减少计数，不会断开订阅，保证其余存活组件正常接收行情，同时统一管理 ws 连接，避免重复订阅、频繁收发消息。


type QuoteMsg = {
    type: "sub" | "unsub" | "ping" | "pong";
    code?: string;
}

type QuoteData = Record<string, any>;
interface QuoteStore {
    quoteMap: Record<string, QuoteData>;
    updateQuote: (code: string, data: QuoteData) => void;
}
declare const useQuoteStore: {
    getState: () => QuoteStore;
}

class QuoteWsManager {
    static instance: QuoteWsManager;
    // 全局唯一ws连接
    private ws: WebSocket | null = null;
    // 每个标的组件引用计数
    private subscribeRefCount = new Map<string, number>();
    // 当前已真正订阅、服务端生效的标的
    private activeCodes = new Set<string>();

    // 心跳相关
    private heartTimer: number | null = null;
    private pongTimeoutTimer: number | null = null;
    private readonly HEART_INTERVAL = 10000; // 10s发一次ping
    private readonly PONG_TIMEOUT = 5000;   // 5s没收到pong判定断线

    // 重连相关
    private reconnectTimer: number | null = null;
    private reconnectDelay = 1000; // 初始1s
    private readonly MAX_RECONNECT_DELAY = 16000; // 最大退避16s
    private isReconnecting = false;   // 重连锁，防止并发多次重连

    // 消息队列：ws未打开时缓存待发送指令
    private messageQueue: QuoteMsg[] = [];

    private readonly WS_URL = "wss://xxx/quote";

    static getInstance() {
        if (!QuoteWsManager.instance) {
            QuoteWsManager.instance = new QuoteWsManager();
        }
        return QuoteWsManager.instance;
    }

    // 初始化ws连接，全局只执行一次
    initConnect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) return;
        this.ws == new WebSocket(this.WS_URL);
        this.bindWsEvent();
        this.startHeartBeat();
    }

    // 绑定ws事件：消息、关闭、错误
    private bindWsEvent() {
        if (!this.ws) return;

        // 链接成功
        this.ws.onopen = () => {
            this.isReconnecting = false;
            this.reconnectDelay = 1000; // 重连成功后重置退避时间
            this.startHeartBeat();
            // 补发队列中所有等待发送的消息
            this.flushMessageQueue();
        }

        // 接收服务端消息
        this.ws.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data) as QuoteMsg & { code?: string };
                // 响应pong，清除超时计时器
                if (data.type === "pong") {
                    this.clearPongTimeout();
                    return;
                }
                // 普通行情数据写入Zustand状态库，供各组件按需读取
                if (data.code) {
                    useQuoteStore.getState().updateQuote(data.code, data);
                }
            } catch (err) {
                console.error("ws消息解析失败", ev.data, err);
            }
        };

        // 连接关闭
        this.ws.onclose = (event) => {
            this.clearAllTimer();
            // 非正常关闭触发重连
            if (!event.wasClean) {
                this.handleReconnect();
            }
        }

        this.ws.onerror = (err) => {
            this.clearAllTimer();
            this.handleReconnect();
        }
    }

    /**
     * 组件挂载调用：标的计数+1
     */
    subscribeCode(code: string) {
        if (!code) return;
        this.initConnect();

        const currCount = this.subscribeRefCount.get(code) ?? 0;
        const newCount = currCount + 1;
        this.subscribeRefCount.set(code, newCount);

        // 当前无任何组件订阅，第一次向服务端发起订阅
        if (currCount === 0 && !this.activeCodes.has(code)) {
            this.sendMsg({ type: "sub", code });
            this.activeCodes.add(code);
        }
    }

    // 组件卸载调用：标的计数-1，计数归零才取消订阅
    unSubscribeCode(code: string) {
        if (!code) return;
        const currCount = this.subscribeRefCount.get(code) ?? 0;
        if (currCount <= 0) return;

        const newCount = currCount - 1;
        this.subscribeRefCount.set(code, newCount);

        // 当前无任何组件订阅，向服务端发起取消订阅
        if (newCount === 0 && this.activeCodes.has(code)) {
            this.sendMsg({ type: "unsub", code });
            this.activeCodes.delete(code);
            this.subscribeRefCount.delete(code);
        }
    }

    /**
     * 统一发送消息，未就绪刚入队缓存
     */
    private sendMsg(msg: QuoteMsg) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.messageQueue.push(msg);
            return;
        }
        try {
            this.ws.send(JSON.stringify(msg));
        } catch (err) {
            console.error("ws发送消息失败", msg, err);
            this.messageQueue.push(msg); // 发送失败也入队，等待下次连接成功再发
        }
    }

    // 连接成功后批量发送缓存消息
    private flushMessageQueue() {
        while (this.messageQueue.length > 0) {
            const msg = this.messageQueue.shift();
            msg && this.sendMsg(msg);
        }
    }


    // 启动心跳
    private startHeartBeat() {
        this.clearHeartTimer();
        this.heartTimer = window.setInterval(() => {
            this.sendMsg({ type: "ping" });
            // 等待pong响应，超时判定断线
            this.startPongTimeout();
        },
            this.HEART_INTERVAL
        );
    }

    private startPongTimeout() {
        this.clearPongTimeout();
        this.pongTimeoutTimer = window.setTimeout(() => {
            console.warn("行情服务pong超时，主动断开ws连接，尝试重连...");
            this.ws?.close();
        }, this.PONG_TIMEOUT);
    }

    private clearPongTimeout() {
        if (this.pongTimeoutTimer) {
            clearTimeout(this.pongTimeoutTimer);
            this.pongTimeoutTimer = null;
        }
    }

    private clearHeartTimer() {
        if (this.heartTimer) {
            clearInterval(this.heartTimer);
            this.heartTimer = null;
        }
    }

    private clearAllTimer() {
        this.clearHeartTimer();
        this.clearPongTimeout();
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }

    // 指数退避重连+重连成功批量恢复订阅
    private handleReconnect() {
        if (this.isReconnecting) return;
        this.isReconnecting = true;

        this.reconnectTimer = window.setTimeout(() => {
            console.log(`行情ws尝试重连，等待延时：${this.reconnectDelay}ms`);
            this.initConnect();
            // 指数退避，不超过上限
            this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.MAX_RECONNECT_DELAY);
            this.isReconnecting = false;

            // 【核心】重连建立成功后，指重新订阅所有activeCodes
            // onopen触发flush队列，在这里把当前活跃标的重新推入消息队列
            this.activeCodes.forEach(code => {
                this.sendMsg({ type: "sub", code });
            });
        }, this.reconnectDelay);
    }

    // 可选：页面卸载/业务退出主动关闭连接
    destroy() {
        this.clearAllTimer();
        this.messageQueue = [];
        this.subscribeRefCount.clear();
        this.activeCodes.clear();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const quoteWsManager = QuoteWsManager.getInstance();