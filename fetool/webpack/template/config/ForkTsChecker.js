const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

module.exports = (config, resolve) => {
    return () => {
        config.plugin('ts-fork').use(ForkTsCheckerWebpackPlugin, [{
            // 将async设为false
            async: false
        }])

        // 将TypeScript类型
        config.plugin('ts-notifier').use(ForkTsCheckerNotifierWebpackPlugin, [{
            title: 'TypeScript',
            excludeWarnings: true,
            skipSuccessful: true,
        }])
    }
}