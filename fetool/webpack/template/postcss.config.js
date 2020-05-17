module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                '>1%',
                'last 3 versions',
                'iOS>=8',
                'Android>=4',
                'Chrome>=40'
            ]
        },
        'postcss-px-to-viewport': {

        }
    }
}