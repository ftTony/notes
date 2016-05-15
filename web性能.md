性能优化原则及分类

 请求数量：合并脚本和样式表、CSS Sprites，拆分初始化负载，划分主域
 
 请求带宽：开启GZip，精简JavaScript，移除重复脚本，图像优化
  
 缓存利用：使用CDN，使用外部Javascript和CSS，添加Expires头，减少DNS查找，配置ETag
 
 页面结构：将样式表放在顶部，将脚本放在底部，尽早刷新文档的输出
 
 代码校验：避免CSS表达式，避免重定向
 
性能优化工具

	yslow、DynaTrace Ajax Edition
	
参考资料：

[http://www.cnblogs.com/developersupport/p/webpage-performance-best-practices.html](http://www.cnblogs.com/developersupport/p/webpage-performance-best-practices.html)

[http://www.cnblogs.com/sprying/p/4251682.html](http://www.cnblogs.com/sprying/p/4251682.html)

[http://www.cnblogs.com/sprying/p/4251682.html](http://www.cnblogs.com/sprying/p/4251682.html)

[http://www.cnblogs.com/nonsuch/archive/2010/06/23/1763363.html](http://www.cnblogs.com/nonsuch/archive/2010/06/23/1763363.html)



