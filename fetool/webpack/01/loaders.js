const loaderUtils = require('loader-utils');

module.exports = async function (content) {
    // 获取用户配置的options 同步
    const options=loaderUtils.getOptions(this);
    console.log('***options***',options);
    this.callback(null,'{}'+content);
    return '{};'+content;

    // 异步

    // function timeout(delay) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('{};' + content);
    //         }, delay);
    //     });
    // }
    // const data = await timeout(1000);
    // return data;
}