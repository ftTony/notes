/*
	webpack它的优点
	支持commonJS和AMD模块。
	支持很多模块加载器的调用，可以使模块加载器灵活定制，比如babel-loader加载器，该加载器能使我们使用ES6的语法来编写代码。
	可以通过配置打包成多个文件，有效的利用浏览器的缓存功能提升性能。
	使用模块加载器，可以支持sass，less等处理器进行打包且支持静态资源样式及图片进行打包。
	更多等等。。。带着这些问题我们慢慢来学习webpack。

	配置参数说明
	entry 是页面中的入口文件，比如我这边的入口文件时main.js

    output: 是指页面通过webpack打包后生成的目标文件放在什么地方去，我这边是在根目录下生成build文件夹，该文件夹内有一个build.js文件；

    resolve: 定义了解析模块路径时的配置，常用的就是extensions; 可以用来指定模块的后缀，这样在引入模块时就不需要写后缀，会自动补全。

    plugins: 定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取公用的部分，生成common.js;

    module.loaders：是文件的加载器，比如我们之前react需要在页面中引入jsx的js源码到页面上来，然后使用该语法，但是通过webpack打包后就不需要再引入JSXTransformer.js；看到上面的加载器；比如jsx-loader加载器就是代表JSXTransformer.js的，还有style-loader和css-loader加载器；

    webpack相关命令
    webpack 执行一次开发时的编译
	webpack -p 执行一次生成环境的编译（压缩）
	webpack --watch 在开发时持续监控增量编译（很快）
	webpack -d 让他生成SourceMaps
	webpack --progress 显示编译进度
	webpack --colors 显示静态资源的颜色
	webpack --sort-modules-by, --sort-chunks-by, --sort-assets-by 将modules/chunks/assets进行列表排序
	webpack --display-chunks 展示编译后的分块
	webpack --display-reasons 显示更多引用模块原因
	webapck --display-error-details 显示更多报错信息

*/

module.exports={
	entry:'./src/main.js',
	output:{
		filename:'build/build.js'
	},
	module:{
		loaders:[
			//.css  文件使用 style-loader和css-loader来处理
			{
				test:/\.css$/,loader:'style!css'
			},
			//.js文件使用 jsx-loader来编译处理
			{	
				test:/\.js$/,loader:'jsx-loader'
			}
		]
	},
	resolve:{
		extensions:['','.js','jsx']
	},
	plugins:[]
};