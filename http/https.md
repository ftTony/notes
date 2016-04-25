### **什么是HTTPS**

   HTTPS并非是应用层的一种新协议。只是HTTP通信接口部分用SSL(Secure Socket Layer)和TLS协议代替而已。

   简单理解就是https=http+加密+认证+完整性保护

### **为什么需要https**

HTTP是明文传输的，也就意味着，介于发送端、接收端中间的任意节点都可以知道你们传输的内容是什么。这些节点可能是路由器、代理等。

举个最常见的例子，用户登陆。用户输入账号，密码，采用HTTP的话，只要在代理服务器上做点手脚就可以拿到你的密码了。

`用户登陆 --> 代理服务器（做手脚）--> 实际授权服务器`

### **HTTPS过程**

![](http://images2015.cnblogs.com/blog/517641/201510/517641-20151004202254433-181254043.png)

1.客户端发送HTTPS请求给服务器端；

2.服务器端发送CA证书和公钥PublicKey给客户端，注意这个公钥用的是非对称加密钥，只有服务器端才有PublicKey对应的PrivateKey;

3.客户端生成一个会话的密钥SessionKey,注意这个SessionKey是对称密钥，加密解密都是同一个秘钥；

4.客户端用公钥PublicKey来对会话秘钥SessionKey进行加密生成EncryptKey传递给服务器；

4.1服务器端收到这个加密后的EncryptKey后用PrivateKey解密就可以得到这个SessionKey了；

4.2服务器端收到这个加密后的EncryptKey需要回复一个确认消息给客户端

5.客户端用这个SessionKey来对后续需要发送的Message来进行加密，就是EncryptMessage，然后发送给服务器端；

5.1服务器端收到这个EnctyptMessage后就需要拿刚才解密的SessionKey来进解密；就可以得到Message了；

5.2服务器端根据客户端的请求来进行返回一系列的Response响应；

### **HTTPS如何加密数据的**

#### 对称加密

对称加密的意思就是，加密数据用的密钥，跟解密数据用的密钥是一样的。

对称加密的优点在于加密、解密效率通常比较高。缺点在于，数据发送方、数据接收方需要协商、共享同一把密钥，并确保密钥不泄露给其他人。此外，对于多个有数据交换需求的个体，两两之间需要分配并维护一把密钥，这个带来的成本基本是不可接受的。

#### 非对称加密

非对称加密的意思就是，加密数据用的密钥（公钥），跟解密数据用的密钥（私钥）是不一样的。

什么叫做公钥呢？其实就是字面上的意思——公开的密钥，谁都可以查到。因此非对称加密也叫做公开密钥加密。

相对应的，私钥就是非公开的密钥，一般是由网站的管理员持有。

公钥、私钥两个有什么联系呢？

简单的说就是，通过公钥加密的数据，只能通过私钥解开。通过私钥加密的数据，只能通过公钥解开。

### 参考资料

[http://www.cnblogs.com/Jote/articles/4854958.html](http://www.cnblogs.com/Jote/articles/4854958.html)

[http://www.cnblogs.com/chyingp/p/https-introduction.html](http://www.cnblogs.com/chyingp/p/https-introduction.html)

《图解HTTP》