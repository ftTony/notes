const path = require('path') // 路径处理模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 引入CleanWebpackPlugin插件

module.exports = {
  entry: {
    index: path.join(__dirname, './main.js'),
  },
  devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true, //压缩
      port: 8081, //端口号
      open: true, //第一次打开浏览器
      hot: true, //是否监听
      publicPath: "/", //访问的目录
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/index.html'),
    }),
    new CleanWebpackPlugin(), // 所要清理的文件夹名称
  ],
}