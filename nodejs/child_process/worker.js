// 接收主进程发来的消息
process.on('message', (msg) => {
    console.log('Received message from master:' + msg);
    // 子进程向主进程发送消息
    process.send('Hi master.');
})