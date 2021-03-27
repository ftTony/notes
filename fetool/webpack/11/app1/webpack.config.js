const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const path = require('path');

module.exports = {
    entry:"./src/index",
    mode:"development",
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        port:3001,
    },
    output:{
        publicPach:"auto"
    },
    module:{
        
    }
}