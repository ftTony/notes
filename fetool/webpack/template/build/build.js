const rimra = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')

// 删除dist 目录
rimra.sync(path.join(process.cwd(), 'dist'))

const config = require('./base')()
const webpack = require('webpack')
const spinner = ora('开始构建项目...')
spinner.start()

webpack(config.toConfig(), function (err, stats) {

})