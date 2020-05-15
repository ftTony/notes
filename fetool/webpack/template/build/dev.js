const config = require('./base')()
const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const port = 8080
const publicPath = '/common/'

config.devServer.quiet(true).hot(true).https(false).disableHostCheck(true).publicPath(publicPath).clientLogLevel('none')

const compilper = webpack(config.toConfig())
// 拿到devServer参数
const chainDevServer = compiler.options.devServer
const server = new WebpackDevServer(compiler, Object.assign(chainDevServer, {}))

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
        server.close(() => {
            process.exit(0)
        })
    })
})

// 监听端口
server.listen(port)