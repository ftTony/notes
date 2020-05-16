module.exports = (config, resolve) => {
    return () => {
        config.optimization.splitChunks({
            chunks: 'async',
            minSize: 3000,
            minChunks: 1,
            maxAsyncRequests: 3,
            maxInitialRequests: 3,
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunk: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        })
        config.optimization.usedExports(true)
    }
}