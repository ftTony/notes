const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ClearWebpackPlugin = require('clean-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
module.exports = {
    entry: './app/index/app.js', //支持多个参数，string|array|object
    output: {
        filename: ' [name].js', //输出文件名称
        path: path.resolve(__dirname, './dist'), //输出文件的目标路径
        publicPath: '/' //构建文件的输出目录
    },
    devServer: { //DevServer相关的配置
        contentBase: path.join(__dirname, 'dist'),
        compress: true, //压缩
        port: 8888, //端口号
        open: true, //第一次打开浏览器
        hot: true, //是否监听
        publicPath: "/" //访问的目录
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [' babel-loader'],
                parser: {
                    amd: true, //禁用AMD
                    commonjs: true, //禁用 CommonJS
                    system: false, //禁用 SystemJS
                    harmony: true, //禁用 ES6 import/export
                    requireinclude: false, //禁用require.include
                    requireEnsure: false, //禁用require.ensure
                    requireContext: false, //禁用require.context
                    browserify: false, //禁用 browserify requireJs : false, //禁用 requirejs:false
                    requireJs: false, //禁用 requirejs
                }
            },
            {
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
                            require('postcss-cssnext')(),
                            require('cssnano')(),
                            require('postcss-sprites')()
                        ]
                    }
                }],
            }, {
                //图片处理
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [
            // 模块的查找目录
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        extensions: ['.js', '.json', '.vue', '.css'],
        alias: { //模块别名列表
            'module': 'new-module'
        }
    },
    devtool: 'source-map', //sourcemap
    plugins: [ //插件部分
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
        //将js自动插入到html里
        new HtmlWebpackPlugin({
            template: './views/index.html',
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin() //引入热更新插件
    ]
};