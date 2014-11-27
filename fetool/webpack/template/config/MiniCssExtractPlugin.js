const MiniCssExtractPlugin = require("");

module.exports = (config, resolve) => {
    return () => {
        config.oneOf('normal').plugin('mini-css-extract').use(MiniCssExtractPlugin)
    }
};