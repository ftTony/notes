const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ClearWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        filename: ' [name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'src')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8888,
        inline: true,
        open: true,
        overlay: true,
        hot: true,
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            }]
        }, {
            test: /\.js$/,
            include: [path.join(__dirname,'src'), path.join(__dirname,'test')],
            exclude: /(node_modules)/, // 排除文件
            // loader: 'babel-loader'
            use: ['happypack/loader?id=babel']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            // use: ['happypack/loader?id=image']
            use:[
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[hash:7].[ext]'
                    }
                }
            ]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader:'url-loader',
            options:{
                limit:1000,
                name: '[name].[hash:7].[ext]'
            }
        },{
            test: /\.s[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                {
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
                }
            ]
        }]
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new ClearWebpackPlugin(['dist']),
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
        new MiniCssExtractPlugin({
            filename: `[name]_[contenthash:8].css`,
            chunkFilename: '[name]_[contenthash:8].css'
        }),
        new HappyPack({
            id: 'image',
            loaders: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }]
        }),
        new HappyPack({
            // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
            id: 'babel',
            // 如何处理.js文件，用法和Loader配置是一样的
            loaders: ['babel-loader']
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin() //引入热更新插件
    ]
}