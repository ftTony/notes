exports.keys = 'my-cookie-secret-key'

// 添加view 配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks'
    }
}

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
}

exports.logger = {
    level: 'DEBUG',
};