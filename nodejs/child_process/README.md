### node中child_process模块实现多进程

*child_process* 提供了4个方法，用于创建子进程，这四个方法分别为 spawn, execFile, exec 和 fork. 所有的方法都是异步的。

该如上4个方法的区别是什么？

- *spawn*: 子进程中执行的是非node程序，提供一组参数后，执行的结果以流的形式返回。
- *execFile*: 子进程中执行的是非node程序, 提供一组参数后，执行的结果以回调的形式返回。
- *exec*: 子进程执行的是非node程序，提供一串shell命令，执行结果后以回调的形式返回，它与 execFile不同的是，exec可以直接执行一串
shell命令。

- *fork*: 子进程执行的是node程序，提供一组参数后，执行的结果以流的形式返回，它与spawn不同的是，fork生成的子进程只能执行node应用。

### 父子进程间如何通信？

- 基本使用方法
- Master实现对Worker的请求进行分发
- Worker监听同一个端口
- 实现进程重启

### 理解cluster集群