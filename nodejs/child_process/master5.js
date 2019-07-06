const cluster = require('cluster');
if (cluster.isMaster) {
    const cpuNum = require('os').cpus().length;
    for (let i = 0; i < cpuNum; ++i) {
        cluster.fork();
    }

    // 创建进程完成后输出信息
    cluster.on('online', (worker) => {
        console.log('Create worker-' + worker.process.pid);
    });

    // 监听子进程退出后重启事件
    cluster.on('exit', (worker, code, signal) => {
        console.log('[Master] worker ' + worker.process.pid + ' died with code:' + code + ', and' + signal);
        cluster.fork();     //重启子进程
    });
} else {
    const net = require('net');
    net.createServer().on('connection', (socket) => {
        setTimeout(() => {
            socket.end('Request handled by worker-' + process.pid);
        }, 10);
    }).listen(8989);
}