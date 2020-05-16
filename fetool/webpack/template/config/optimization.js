module.exports = (config, resolve) => {
    return () => {
        config.optimization.splitChunks({
            chunks: 'async',
            minSize: 3000
        })
    }
}