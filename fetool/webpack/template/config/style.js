module.exports = (config, resolve) => {
    return (lang, test) => {
        const baseRule = config.module.rule(lang).test(test);
        const normalRule = baseRule.oneOf('normal');

        normalRule.use('extract-css-loader').loader(require('mini-css-extract-plugin').loader).options({
            hmr: process.env.NODE_ENV === 'development',
            publicPath: '/'
        })
        normalRule.use('css-loader').loader(require.resolve('css-loader')).options({})

        normalRule.use('postcss-loader').loader('')
    }
}