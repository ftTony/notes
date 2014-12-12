module.exports = (config, resolve) => {
    return (lang, test) => {
        const baseRule = config.module.rule(lang).test(test)
        const normalRule = baseRule.oneOf('normal')
        applyLoaders
    }
}