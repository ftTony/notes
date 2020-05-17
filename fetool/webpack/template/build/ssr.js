module.exports = function (options) {
    const path = require("path");
    const Config = require("webpack-chain");
    const config = new Config();
    const webpack = require("webpack");
    const rimraf = require("rimraf");
    const ora = require("ora");
    const chalk = require("chalk");
    const PATHS = {
        build: path.join(process.cwd(), "static"),
        ssrDemo: path.join(process.cwd(), 'src', 'ssr.jsx')
    };

    require('../config/babelLoader')({
        config,
        tsx: true
    })()
    require('../config/HtmlWebpackPlugin')({
        config,
        options: {
            publicPath: '/',
            filename: 'client.ssr.html'
        }
    })()

    config.entry('ssr')
};