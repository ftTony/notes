module.exports = function (options) {
    const path = require('path')
    const dllPath = path.join(process.cwd(), 'dll')
    const Config = require('webpack-chain')
    const config = new Config()
    const webpack = require('webpack')
    const rimraf = require('rimraf')
}