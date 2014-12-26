module.exports = (config, resolve) => {
    const baseRule = config.module.rule('js').test(/.js|tsx?$/)
    return () => {
        baseRule.exclude.add(filepath => {
            // 不缓存node_modules下的文件
            return /node_modules/.test(filepath)
        }).end().use('cache-loader').loader('cache-loader').options({
            // 缓存位置
            cacheDirectory: resolve('node_modules/.cache/babel')
        })
    }
}