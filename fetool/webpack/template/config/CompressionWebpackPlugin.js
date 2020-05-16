const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = (config, resolve) => {
    return () => {
        config
            .plugin("CompressionWebpackPlugin")
            .use(CompressionWebpackPlugin, [{
                algorithm: 'gzip',
                test: /\.js(\?.*)/i,
                minRatio: 0.8
            }]);
    };
};