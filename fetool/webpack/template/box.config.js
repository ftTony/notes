module.exports = function (config) {
    /**
     * @param {object} dll 开启差分包
     * @param {object} pages 多页面配置 通过box run/build index 来使用
     * @param {function} chainWebpack
     * @param {string} entry 入口
     * @params {string} output 出口
     * @parmas {string} publicPath
     * @params {stirng} port
     */
    return {
        entry: 'src/main.js',
        output: 'dist',
        publicPath: '/common/',
        port: 8888,
        dll: {
            venders: ['react']
        },
        pages: {
            index: {
                entry: 'src/main.js',
                template: 'public/index.html',
                filename: 'index.html'
            },
            index2: {
                entry: 'src/main.js',
                template: 'public/index2.html',
                filename: 'index2.html'
            }
        },
        chainWebpack(config) {}
    }
}