// import B from './B';
// var b = new B();
// b.say();

// 创建一个input，可以在里面输入一些东西，方便我们观察热更新的效果

let inputEl = document.createElement('input')
document.body.appendChild(inputEl)

let divEl = document.createElement('div')
document.body.appendChild(divEl)

let render = () => {
    let content = require("./content").default;
    divEl.innerText = content;
}
render();

// 要实现热更新，这段代码并不可少，描述当模块被更新后做什么
// 为什么vue-cli中.vue不用写额外的逻辑，也可以实现热更新呢？那是因为有vue-loader帮我们做了，很多loader都实现了热更新
if (module.hot) {
    module.hot.accept(["./content.js"], render);
}