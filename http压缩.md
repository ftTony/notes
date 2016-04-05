### **什么是http压缩**

HTTP压缩是指: Web服务器和浏览器之间压缩传输的”文本内容“的方法。 HTTP采用通用的压缩算法，比如gzip来压缩HTML,Javascript, CSS文件。 能大大减少网络传输的数据量，提高了用户显示网页的速度。当然，同时会增加一点点服务器的开销。 本文从HTTP协议的角度，来理解HTTP压缩这个概念。

### **http压缩的过程**

1. 浏览器发送Http request 给Web服务器,  request 中有Accept-Encoding: gzip, deflate。 (告诉服务器， 浏览器支持gzip压缩)

2. Web服务器接到request后， 生成原始的Response, 其中有原始的Content-Type和Content-Length。

3. Web服务器通过Gzip，来对Response进行编码， 编码后header中有Content-Type和Content-Length(压缩后的大小)， 并且增加了Content-Encoding:gzip.  然后把Response发送给浏览器。

4. 浏览器接到Response后，根据Content-Encoding:gzip来对Response 进行解码。 获取到原始response后， 然后显示出网页。

### **http内容编码与http压缩的区别**

HTTP压缩，在HTTP协议中，其实是内容编码的一种。

在http协议中，可以对内容（也就是body部分）进行编码， 可以采用gzip这样的编码。 从而达到压缩的目的。 也可以使用其他的编码把内容搅乱或加密，以此来防止未授权的第三方看到文档的内容。

所以我们说HTTP压缩，其实就是HTTP内容编码的一种。 所以大家不要把HTTP压缩和HTTP内容编码两个概念混淆了。

### **内容编码类型**

HTTP定义了一些标准的内容编码类型，并允许用扩展的形式添加更多的编码。

Content-Encoding header 就用这些标准化的代号来说明编码时使用的算法

Content-Encoding值

gzip　　表明实体采用GNU zip编码

compress 表明实体采用Unix的文件压缩程序

deflate　　表明实体是用zlib的格式压缩的

identity　　表明没有对实体进行编码。当没有Content-Encoding header时， 就默认为这种情况

gzip, compress, 以及deflate编码都是无损压缩算法，用于减少传输报文的大小，不会导致信息损失。 其中gzip通常效率最高， 使用最为广泛。

### **压缩的好处**

 http压缩对纯文本可以压缩至原内容的40%, 从而节省了60%的数据传输。
 
 `在移动的 http 请求量和联通不相上下的前提下，移动的 http response 带来的网络流量是联通的 2.5 倍。移动大概有 3 成的请求都没有做压缩，而联通几乎都是经过压缩的。那些没有经过压缩的 http 会话都是走了 1.0 的协议，相反经过压缩的 http 会话都是走了 http1.1 协议。`
 
 不启用Nginx的http/1.0 GZip功能
 
 ![](https://imququ.com/static/uploads/2015/12/http10-without-gzip.png.webp)
 
 同时服务端响应了 Content-Length 和 Connection: keep-alive，连接并没有断开
 
 启用Nginx的http/1.1 GZip功能
 
 ![](https://imququ.com/static/uploads/2015/12/http10-with-gzip.png.webp)
 
 Nginx 能知道这个客户端可以支持 HTTP/1.1 的 Transfer-Encoding: chunked，于是通过分块传输解决了所有问题：既启用了压缩，也启用了持久连接。
 
 虽然返回的内容被压缩了，但是连接也被断开了，服务端返回了 Connection: close。原因就是之前说过的，动态压缩导致无法事先得知响应内容长度，在 HTTP/1.0 中只能依靠断开连接来让客户端知道响应结束了。
 
 启用Nginx的http/1.1 GZip功能
 
###  **nginx压缩配置**

`Syntax: gzip_http_version 1.0 | 1.1;
Default: gzip_http_version 1.1;
Context: http, server, location
Sets the minimum HTTP version of a request required to compress a response.`

参考资料

[https://imququ.com/post/why-nginx-disable-gzip-in-http10.html](https://imququ.com/post/why-nginx-disable-gzip-in-http10.html)

[http://www.cnblogs.com/TankXiao/archive/2012/11/13/2749055.html](http://www.cnblogs.com/TankXiao/archive/2012/11/13/2749055.html)