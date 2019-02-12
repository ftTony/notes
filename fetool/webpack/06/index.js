let btn = document.createElement('button');
btn.innerHTML = 'click me';
document.body.appendChild(btn);

// 异步加载代码
async function getAsyncComponent () {
    var element = document.createElement('div');
    // 在 import 的括号里 加注释 /* webpackChunkName: "lodash" */ ，为引入的文件取别名
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

    return element;
}

// 点击button时，懒加载lodash,在网页上显示Hello! dynamic imports async
btn.addEventListener('click', () => {
    getAsyncComponent().then(component => {
        document.body.appendChild(component);
    })
})