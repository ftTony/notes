react介绍：
  
   React 起源于 Facebook 的内部项目，因为 FB 对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。

   由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。

和 Backbone、Angular 等 MV* 框架不一样，它只处理 View 逻辑 ，它只处理 View 逻辑，它只处理 View 逻辑。所以如果你喜欢它，你可以很容易的将它接入到现有工程中，然后用 React 重写 HTML 部分即可，不用修改逻辑。
   参考资料：http://www.cnblogs.com/bugly/p/4988842.html<br/>

react关健几个内容：<br/>
    1.render()用于将模板转为HTML语言，并插入指定的DOM节点.<br/>
    2.jsx语法具体可参考（http://facebook.github.io/react/docs/displaying-data.html#jsx-syntax）<br/>
    3.组件<br/>
    4.this.props.children<br/>
    5.propTypes<br/>
    6.获取真实的DOM节点<br/>
    7.this.state<br/>
    8.表单<br/>
    9.组件的生命周期(Mounting Updating Unmounting)<br/>

示例代码：
###
     <!DOCTYPE html>
      <html>
        <head>
          <script src="../js/react.js"></script>
          <script src="../js/JSXTransformer.js"></script>
        </head>
        <body>
          <div id="example"></div>
          <script type="text/jsx">
            var names = ['Alice', 'Emily', 'Kate'];
              ReactDOM.render(
                <div>
                {
                  names.map(function (name) {
                    return <div>Hello, {name}!</div>
                  })
                }
                </div>,
                document.getElementById('example')
              );
          </script>
        </body>
      </html>
###
参考资料：<br/>
   http://www.cnblogs.com/vajoy/category/703259.html<br/>
   http://www.ruanyifeng.com/blog/2015/03/react.html<br/>
   http://www.cnblogs.com/skylar/p/React-Webpack-ES6.html<br/>
   http://www.cnblogs.com/tugenhua0707/p/4756339.html<br/>
