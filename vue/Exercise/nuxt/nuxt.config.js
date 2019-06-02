module.exports = {
    css: [
        '~/assets/main.css'
    ],
    meta: [{
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }
    ],
    link: [{
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
    }],
    router: {
        middleware: 'stats'
    },
    plugins: [
        '~/plugins/vue-inject.js',
        '~/plugins/combined-inject.js'
    ]
}