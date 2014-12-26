module.exports = (config, resolve) => {
    const baseRule = config.module.rule('js').test(/.js|.tsx?$/)
    return () => {
        const useThreads = true
    }
}