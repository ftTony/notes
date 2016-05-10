TCP/IP七层模型分别是：应用层、表示层、会话层、传输层、网络层、数据链路层、物理层


##### 在TCP/IP协议中，TCP协议提供可靠的连接服务，采用三次握手建立一个连接。 

第一次握手：建立连接时，客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认； 

第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。 完成三次握手，客户端与服务器开始传送数据.


参考资料：

`http://blog.csdn.net/whuslei/article/details/6667471`

`http://www.cnblogs.com/rootq/articles/1377355.html`