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


