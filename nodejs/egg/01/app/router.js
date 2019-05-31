module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    router.get('/user/:id', controller.user.info);
    router.get('/search', controller.search.index);
    router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.package.detail);
}