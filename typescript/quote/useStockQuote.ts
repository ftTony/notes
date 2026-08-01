import { useEffect } from "react";
import { useQuoteStore } from "./quote";
import { quoteWsManager } from "./QuoteWsManager";

// 单个标的订阅hook
export function useStockQuote(code: string) {
    // 细料度订阅对应标的数据，无关标的更新不会触发组件更新
    const stockQuote = useQuoteStore((state) => state.quoteMap[code]);

    useEffect(() => {
        // 组件挂载：计数+1，按需发起订阅
        quoteWsManager.subscribeCode(code);
        return () => {
            // 组件卸载：计数-1，按需取消订阅
            quoteWsManager.unSubscribeCode(code);
        }
    }, [code]);

    return stockQuote
}