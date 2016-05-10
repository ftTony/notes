### **Ngnix介绍**

   Nginx是一款轻量级的网页服务器、反向代理器以及电子邮件代理服务器。其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名。类似的web服务器有Apache、IIS

### **Nginx基本配置与参数说明**

  nginx配置文件主要分为六个区域：main(全局设置)、events(nginx工作模式)、http(http设置)、server(主机设置)、location(URL匹配)、upstream(负载均衡器设置)。
  
#####   main模块如下：
  
   user nobody nobody;
  
   worker_processes 2;
   error_log  /usr/local/var/log/nginx/error.log  notice;
   pid        /usr/local/var/run/nginx/nginx.pid;
   worker_rlimit_nofile 1024;`
   
   user 来指定Nginx Worker进程运行用户以及用户组，默认同nobody账号运行。
   
   worker_processes来指定了Nginx要开启的子进程数。每个Nginx进程平均耗费10M~12M内存。根据经验，一般指定1个进程就足够了，如果是多核CPU，建议指定和CPU的数量一样的进程数即可。我这里写2，那么就会开启2个子进程，总共3个进程。

   error_log用来定义全局错误日志文件。日志输出级别有debug、info、notice、warn、error、crit可供选择，其中，debug输出日志最为最详细，而crit输出日志最少。
   
   pid用来指定进程id的存储文件位置。
   
   worker_rlimit_nofile用于指定一个nginx进程可以打开的最多文件描述符数目，这里是65535，需要使用命令“ulimit -n 65535”来设置。

#####   events 模块

   events模块来用指定nginx的工作模式和工作模式及连接数上限，一般是这样：
   
   `events {
    use kqueue; #mac平台
    worker_connections  1024;
}`

   use用来指定Nginx的工作模式。Nginx支持的工作模式有select、poll、kqueue、epoll、rtsig和/dev/poll。其中select和poll都是标准的工作模式，kqueue和epoll是高效的工作模式，不同的是epoll用在Linux平台上，而kqueue用在BSD系统中，因为Mac基于BSD,所以Mac也得用这个模式，对于Linux系统，epoll工作模式是首选。

   worker_connections用于定义Nginx每个进程的最大连接数，即接收前端的最大请求数，默认是1024。最大客户端连接数由worker_processes和worker_connections决定，即Max_clients=worker_processes*worker_connections，在作为反向代理时，Max_clients变为：Max_clients = worker_processes * worker_connections/4。 
进程的最大连接数受Linux系统进程的最大打开文件数限制，在执行操作系统命令“ulimit -n 65536”后worker_connections的设置才能生效。

##### http 模块

http模块可以说是最核心的模块了，它负责HTTP服务器相关属性的配置，它里面的server和upstream子模块，至关重要。

   `http{
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /usr/local/var/log/nginx/access.log  main;
    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout  10;
    #gzip  on;
    upstream myproject {
        .....
    }
    server {
        ....
    }
}
`
下面详细介绍下这段代码中每个配置选项的含义。 

include 来用设定文件的mime类型,类型在配置文件目录下的mime.type文件定义，来告诉nginx来识别文件类型。

default_type设定了默认的类型为二进制流，也就是当文件类型未定义时使用这种方式，例如在没有配置asp 的locate 环境时，Nginx是不予解析的，此时，用浏览器访问asp文件就会出现下载了。

log_format用于设置日志的格式，和记录哪些参数，这里设置为main，刚好用于access_log来纪录这种类型。

access_log 用来纪录每次的访问日志的文件地址，后面的main是日志的格式样式，对应于log_format的main。

sendfile参数用于开启高效文件传输模式。将tcp_nopush和tcp_nodelay两个指令设置为on用于防止网络阻塞。

keepalive_timeout设置客户端连接保持活动的超时时间。在超过这个时间之后，服务器会关闭该连接。

##### server 模块

sever 模块是http的子模块，它用来定一个虚拟主机，我们先讲最基本的配置，这些在后面再讲。

`server {
        listen       8080;
        server_name  localhost 192.168.12.10 www.yangyi.com;
        # 全局定义，如果都是这一个目录，这样定义最简单。
        root   /Users/yangyi/www;
        index  index.php index.html index.htm; 
        charset utf-8;
        access_log  usr/local/var/log/host.access.log  main;
        aerror_log  usr/local/var/log/host.error.log  error;
        ....
}`

server标志定义虚拟主机开始。 

listen用于指定虚拟主机的服务端口。 

server_name用来指定IP地址或者域名，多个域名之间用空格分开。 

root 表示在这整个server虚拟主机内，全部的root web根目录。注意要和locate {}下面定义的区分开来。 

index 全局定义访问的默认首页地址。注意要和locate {}下面定义的区分开来。 

charset用于设置网页的默认编码格式。 

access_log用来指定此虚拟主机的访问日志存放路径，最后的main用于指定访问日志的输出格式。

### **Nginx集群配置**

##### location 模块

location模块是nginx中用的最多的，也是最重要的模块了，什么负载均衡啊、反向代理啊、虚拟域名啊都与它相关：

location 根据它字面意思就知道是来定位的，定位URL，解析URL，所以，它也提供了强大的正则匹配功能，也支持条件判断匹配，用户可以通过location指令实现Nginx对动、静态网页进行过滤处理。像我们的php环境搭建就是用到了它。

`location / {
            root   /Users/yangyi/www;
            index  index.php index.html index.htm;
        }
`

location /表示匹配访问根目录。

root指令用于指定访问根目录时，虚拟主机的web目录，这个目录可以是相对路径（相对路径是相对于nginx的安装目录）。也可以是绝对路径。

index用于设定我们只输入域名后访问的默认首页地址，有个先后顺序：index.php index.html index.htm，如果没有开启目录浏览权限，又找不到这些默认首页，就会报403错误。

location 还有一种方式就是正则匹配，开启正则匹配这样：location ~。后面加个~。

下面这个例子是运用正则匹配来链接php。我们之前搭建环境也是这样做：

`location ~ \.php$ {
            root           /Users/yangyi/www;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            include        fastcgi.conf;
        }
`


\.php$ 熟悉正则的我们直到，这是匹配.php结尾的URL，用来解析php文件。里面的root也是一样，用来表示虚拟主机的根目录。 
fast_pass链接的是php-fpm 的地址，之前我们也搭建过。

### **Nginx反向代理**
	
#####   什么是反向代理
  
  反向代理是指以代理服务器来接受internet上的连接请求，然后奖请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就是表现为一个服务器.
  
  代理情况： 
client —(send request)—> clinet proxy –(send request)—> server

##### 反射代理的作用

  1.保护网站安全：任何来自internet的请求都必须先经过代理器；
  
  2.通过配置缓存功能加速web请求：可以缓存真实web服务器上的某些静态资源，减轻真实web服务器的负载压力；
  
  3.实现负载均衡：充当负载均衡服务器均衡分发请求，平衡集群中各个服务器的负载压力。
  
	

### **参考资料：**

[https://www.zybuluo.com/phper/note/89391](https://www.zybuluo.com/phper/note/89391)

[http://www.nginx.cn/76.html](http://www.nginx.cn/76.html)

[http://manual.51yip.com/nginx/StandardHTTPModules/index.html](http://manual.51yip.com/nginx/StandardHTTPModules/index.html)