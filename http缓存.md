### **什么是web缓存**

Web缓存是指一个Web资源（如html页面，图片，js，数据等）存在于Web服务器和客户端（浏览器）之间的副本。缓存会根据进来的请求保存输出内容的副本；当下一个请求来到的时候，如果是相同的URL，缓存会根据缓存机制决定是直接使用副本响应访问请求，还是向源服务器再次发送请求。比较常见的就是浏览器会缓存访问过网站的网页，当再次访问这个URL地址的时候，如果网页没有更新，就不会再次下载网页，而是直接使用本地缓存的网页。只有当网站明确标识资源已经更新，浏览器才会再次下载网页。

### **web缓存的作用**

1.减少网络带宽消耗

2.降低服务器压力

3.减少服务器压力

4.减少网络延迟，加快页面打开速度


### **web缓存的类型**

1.数据库缓存

   Web应用，特别是SNS类型的应用，往往关系比较复杂，数据库表繁多，如果频繁进行数据库查询，很容易导致数据库不堪重荷。为了提供查询的性能，会将查询后的数据放到内存中进行缓存，下次查询时，直接从内存缓存直接返回，提供响应效率。比如常用的缓存方案有memcached redist等。 

2.CDN缓存

  CDN缓存，也叫网关缓存、反向代理缓存。CDN缓存一般是由网站管理员自己部署，为了让他们的网站更容易扩展并获得更好的性能。浏览器先向CDN网关发起web请求，网关服务器后面对应着一台或多台负载均衡源服务器，会根据它们的负载请求，动态将请求转发到合适的源服务器上。虽然这种架构负载均衡源服务器之间的缓存没法共享，但却拥有更好的处扩展性。
  
3.代理服务器缓存

  代理服务器缓存是浏览器和源服务器之间的中间服务器，浏览器先向这个中间服务器发起web请求，经过处理后（比如权限验证，缓存匹配等）,再将请求转发到源服务器。代理服务器缓存的运作原理跟浏览器的运作原理差不多，只是规模更大。

4.浏览器缓存

  每个浏览器都实现了HTTP缓存，我们通过浏览器使用HTTP协议与服务器交互的时候，浏览器就会根据一套与服务器约定的规则进行缓存工作

5.应用层缓存

  应用层缓存是指我们在代码层面上做的缓存。通过代码逻辑，把曾经请求过的数据或资源等，缓存起来，再次需要数据时通过逻辑上的处理选择可用的缓存的数据。

浏览器中的缓存机制，其实相当于HTTP协议定义的缓存机制，因为浏览器为我们实现了它。

web服务器通过2种方式来判断浏览器缓存是否是最新的。

第一种，浏览器把缓存文件的最后修改时间通过header“if-Modified-Since”来告诉web服务器

第二种，浏览器把缓存文件的ETag，通过header “if-None-Match”，来告诉web服务器

一般情况下我们会看到http响应头的Expires、Cache-Control、Last-Modified、if-Modified-Since、Etag

与缓存有关的Header

#### Request

Cache-Control: max-age=0以秒为单位

If-Modified-Since: Mon, 19 Nov 2012 08:38:01 GMT缓存文件的最后个性时间

If-None-Match: "0693f67a67cc1:0"缓存文件的Etag值

Cache-Control: no-cache不使用缓存

Pragma: no-cache不使用缓存(http1.0使用)

#### Response

Cache-Control: public	响应被缓存，并且在多用户间共享

Cache-Control: private	响应只能作为私有缓存，不能在用户之间共享

Cache-Control:no-cache	提醒浏览器要从服务器提取文档进行验证

Cache-Control:no-store	绝对禁止缓存（用于机密，敏感文件）

Cache-Control: max-age=60	60秒之后缓存过期（相对时间）

Date: Mon, 19 Nov 2012 08:39:00 GMT	当前response发送的时间

Expires: Mon, 19 Nov 2012 08:40:01 GMT	缓存过期的时间（绝对时间）

Last-Modified: Mon, 19 Nov 2012 08:38:01 GMT	服务器端文件的最后修改时间

ETag: "20b1add7ec1cd1:0"	服务器端文件的Etag值

Cache-Control与Expires的作用一致，Last-Modified与ETag的作用也相近。

![](http://images0.cnblogs.com/blog2015/546321/201505/181713440417853.png)

现在默认浏览器均默认使用HTTP 1.1，所以Expires和Last-Modified的作用基本可以忽略，具备Cache-Control和Etag即可。

#### ETag

为什么使用ETag呢？ 主要是为了解决Last-Modified 无法解决的一些问题。

1.某些服务器不能精确得到文件的最后修改时间，这样无法通过最后个性时间来判断文件是否更新了

2.某些文件的修改非常频繁，在秒以下的时间内进行修改Last-Modified只能精确到秒。

3.一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了。

ETag根据实体内容生成的一段hash字符串（类似于MD5或者SHA1之后的结果），可以标识资源的状态。 当资源发送改变时，ETag也随之发生变化。

当然用户的行为也会影响浏览器的缓存

![](http://images0.cnblogs.com/blog2015/546321/201505/181722532916918.png)

### **总结**

浏览器第一次请求

![](http://images.cnblogs.com/cnblogs_com/skynet/201211/201211281402437389.png)

浏览器再次请求时

![](http://images.cnblogs.com/cnblogs_com/skynet/201211/201211281402442505.png)

参考资料：

[http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html](http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html)

[http://www.cnblogs.com/skylar/p/browser-http-caching.html](http://www.cnblogs.com/skylar/p/browser-http-caching.html)

[http://www.cnblogs.com/yjf512/p/3244882.html](http://www.cnblogs.com/yjf512/p/3244882.html)

[http://www.cnblogs.com/vajoy/p/5341664.html](http://www.cnblogs.com/vajoy/p/5341664.html)

[http://www.cnblogs.com/lovesong/p/5352973.html](http://www.cnblogs.com/lovesong/p/5352973.html)