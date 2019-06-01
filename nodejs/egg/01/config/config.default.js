module.exports = {
    middleware: ['gzip'],
    gzip: {
        threshold: 1024, // 小于 1k 的响应体不压缩
    },
    logger: {
        level: 'DEBUG'
    },
    news: {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    },
    view: {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks'
        }
    },
    bodyParser: {
        jsonLimit: '10mb',
    },
    middleware: ['compress'],
    compress: {
        threshold: 2048,
    },
    mysql: {
        enable: true,
        package: 'egg-mysql'
    },
    keys: 'my-cookie-secret-key'
}