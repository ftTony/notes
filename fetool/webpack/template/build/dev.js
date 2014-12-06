const config = require('./base')()
const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const port = 8080
const publicPath = '/common/'

config.devServer.quiet(true).hot(true).https(false).disableHostCheck(true).publicPath(publicPath).clientLogLevel('none')