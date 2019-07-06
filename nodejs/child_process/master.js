const childProcess = require('child_process');
const worker = childProcess.fork('./worker.js');

// 主进程向子进程发送消息
worker.send('Hello World');

// 监听子进程发送过来的消息
worker.on('message', (msg) => {
    console.log('Received message from worker:' + msg);
})