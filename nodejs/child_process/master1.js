const childProcess = require('child_process');
const cpuNum = require('os').cpus().length;

for (let i = 0; i < cpuNum; ++i) {
    childProcess.fork('./worker1.js');
}
console.log('Master:xxx');