import { BaseRouter } from './base';
export class HashRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    // 监听hashchange事件
    window.addEventListener('hashchange', e => {
      this.handler();
    });
  }
  // hash 改变时，重新渲染页面
  handler() {
    this.render(this.getState());
  }
  // 获取hash值
  getState() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }
  // push新的页面
  push(path) {
    window.location.hash = path;
  }
  //   获取默认页url
  getUrl(path) {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return base + '#' + path;
  }
}
