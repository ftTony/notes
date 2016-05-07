### **Ngnix介绍**



### **Nginx基本配置与参数说明**

  nginx配置文件主要分为六个区域：main(全局设置)、events(nginx工作模式)、http(http设置)、server(主机设置)、location(URL匹配)、upstream(负载均衡器设置)。
  
  main模块如下：
  
  `user nobody nobody;
   worker_processes 2;
   error_log  /usr/local/var/log/nginx/error.log  notice;
   pid        /usr/local/var/run/nginx/nginx.pid;
   worker_rlimit_nofile 1024;`
   
   user 来指定Nginx Worker进程运行用户以及用户组，默认同nobody账号运行。
   
   worker_processes来指定了Nginx要开启的子进程数。每个Nginx进程平均耗费10M~12M内存。根据经验，一般指定1个进程就足够了，如果是多核CPU，建议指定和CPU的数量一样的进程数即可。我这里写2，那么就会开启2个子进程，总共3个进程。

### **Nginx集群配置**

### **Nginx反向代理**


### **参考资料：**

[https://www.zybuluo.com/phper/note/89391](https://www.zybuluo.com/phper/note/89391)

[http://www.nginx.cn/76.html](http://www.nginx.cn/76.html)