import { BaseRouter } from './base';
export class HistoryRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    //   监听popstate事件
    window.addEventListener('popstate', e => {
      console.log('触发 popstate');
      this.handler();
    });
  }
  // 渲染页面
  handler() {
    this.render(this.getState());
  }
  // 获取url
  getState() {
    const path = window.location.pathname;
    return path ? path : '/';
  }
  // push页面
  push(path) {
    history.pushState(null, null, path);
    this.handler();
  }
  // replace页面
  replace(path) {
    history.replaceState(null, null, path);
  }
  // 前进or后退浏览历史
  go(n) {
    window.history.go(n);
  }
}
