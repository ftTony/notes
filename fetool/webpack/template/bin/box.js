#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const packageConfig = require('../package.json')
const {
    cleanArgs
} = require('../lib')
const path = require('path')
const __name__ = `build,dev,dll,ssr,build:ssr,ssr:server`
process.env.NODE_ENV = 'none'

let boxConf = {}
let lock = false

try {
    boxConf = require(path.join(process.cwd(), 'box.config.js'))()
} catch (error) {

}

program.usage('<command> [options]').version(packageConfig.version).command('build [app-age]').description(`构建开发环境`).option('-r,--report', '打包分析报告').option('-d,--dll', '合并差分包').action(async (name, cmd) => {
    const options = cleanArgs(cmd)
    const args = Object.assign(options, {
        name
    }, boxConf)
    if (lock) return
})