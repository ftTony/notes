
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        index: './index.js',
        utils: './utils.js'
    },
    output: {
        filename: '[name].bundle.js',   // 输出index.js和utils.js
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // 用 MiniCssExtractPlugin 抽离出css文件，以link标签的形式引入样式文件
        new MiniCssExtractPlugin({
            filename: 'index.bundle.css'        // 输出的css文件名为index.css
        })
    ]
}