const {
    findSync
} = require("../lib");
const Config = require("webpack-chain");
const config = new Config()
const files = findSync('config')
const path = require('path')
const resolve = p => {
    return path.join(process.cwd(), p)
}

module.exports = () => {

}