// 接收主进程发来的消息
process.on('message', (msg, socket) => {
    if (msg === 'socket' && socket) {
        // 利用setTimeout模拟异步请求
        setTimeout(() => {
            socket.end('Request handled by worker-' + process.pid);
        }, 100);
    }
});