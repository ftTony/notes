const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: "./main",
    devtool: '#source-map', //sourcemap
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true, //压缩
        port: 8080, //端口号
        open: true, //第一次打开浏览器
        hot: true, //是否监听
        publicPath: "/" //访问的目录
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/template/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};