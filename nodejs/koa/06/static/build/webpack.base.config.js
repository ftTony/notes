const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babel.config');

const srcResolve = function (file) {
    return path.join(__dirname, '..', 'src', file);
};

const distResolve = function (file) {
    return path.join(__dirname, '..', 'output', 'dist', file);
}

module.exports = {
    entry: {
        'index': srcResolve('js/index')
    },
    output: {
        path: distResolve(''),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'label-loader',
                    options: babelConfig
                }
            }
        ]
    }
}
