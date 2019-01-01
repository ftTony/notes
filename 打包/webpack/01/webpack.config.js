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
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ClearWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
// const AutoDllPlugin = require('autodll-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const MyPlugin = require('./myplugin.js')
const Listen4Myplugin = require('./listen4Myplugin.js')
const webpack=require('webpack');
module.exports = {
	entry: './src/main.js'	,//支持多个参数，
	output: {
		filename: ' [name].js',
		path: path.resolve(__dirname, './dist'),
		publicPath:'/'
	},
	devServer: { //DevServer相关的配置
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8888,
		inline: true,
		open: true,
		overlay: true,
		hot: true,
		publicPath: "/"
	},
	watch: true,
	module: {
		rules: [{
			// 用正则去匹配要用该 loader 转换的 CSS 文件
			test: /\.css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
			}, {
				loader: path.resolve('./loaders.js'),
				options: {
					test: 1
				}
			}, {
				loader: 'css-loader?minimize',
			}, {
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: [
						// require('autoprefixer')(),
						require('postcss-cssnext')(),
						require('cssnano')(),
						require('postcss-sprites')()
					]
				}
			}],
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			// use: [{
			// 	loader: 'url-loader',
			// 	options: {
			// 		limit: 10000,
			// 		name: '[name].[ext]'
			// 	}
			// }]
			use: ['happypack/loader?id=image']
		}, {
			test: /\.js$/,
			exclude: /(node_modules)/, // 排除文件
			// loader: 'babel-loader'
			use: ['happypack/loader?id=babel']
		}]
	},
	resolve: {
		extensions: ['*', '.js', '.json']
	},
	devtool: 'source-map',
	plugins: [
		new ClearWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: `[name]_[contenthash:8].css`,
			chunkFilename: '[name]_[contenthash:8].css'
		}),
		// 告诉webpack使用了哪些第三方库代码
		new DllReferencePlugin({
			// jquery 映射到json文件上去
			manifest: require('./dill/jquery.manifest.json')
		}),
		new ParallelUglifyPlugin({
			// 传递给 UglifyJS的参数如下：
			uglifyJS: {
				output: {
					/*
					 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
					 可以设置为false
					*/
					beautify: false,
					/*
					 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
					*/
					comments: false
				},
				compress: {
					/*
					 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
					 不大的警告
					*/
					warnings: false,

					/*
					 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
					*/
					drop_console: true,

					/*
					 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
					 转换，为了达到更好的压缩效果，可以设置为false
					*/
					collapse_vars: true,

					/*
					 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
					 var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
					*/
					reduce_vars: true
				}
			}
		}),
		//   new DllReferencePlugin({
		// 	// echarts 映射到json文件上去
		// 	manifest: require('./dist/echarts.manifest.json')
		//   }),
		new HtmlWebpackPlugin({
			filename:'index.html',
			template: './index.html'
		}),
		new HappyPack({
			id: 'image',
			loaders: [{
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: '[name].[ext]'
				}
			}]
		}),
		new HappyPack({
			// 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
			id: 'babel',
			// 如何处理.js文件，用法和Loader配置是一样的
			loaders: ['babel-loader']
		}),
		new WebpackDeepScopeAnalysisPlugin(),
		// new webpack.optimize.ModuleConcatenationPlugin(),
		new MyPlugin('Plugin is instancing'),
		new Listen4Myplugin(),
		new webpack.HotModuleReplacementPlugin()    //引入热更新插件
	]
};