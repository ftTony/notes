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
        rules:[
            {
                test:/bootstrap\.js$/,
                loader:"bundle-loader",
                options:{
                    lazy:true
                }
            }
        ]
    },
    plugins:[
        new ModuleFederationPlugin({
            name:"app1",
            remotes:{
                app2:``
            },
            shared:{
                react:{
                    singleton:true
                },
                "react-dom":{
                    singleton:true
                }
            }
        })
    ]
}