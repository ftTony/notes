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
                MiniCssExtractPlugin.loader, 'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')({
                                'browsers':['>1%','last 2 versions']
                            }),
                            require('postcss-cssnext')(),
                            require('cssnano')()
                        ]
                    }
                }, 'sass-loader'
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
                    beautify: false,
                    comments: false
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
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
            id: 'babel',
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