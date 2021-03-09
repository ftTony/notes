const actions = {
  setCurIndex({
    commit
  }, index) {
    commit('setCurIndex', index)
  },
  hasLogin({
    commit
  }) {
    if (window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
      commit('hasLogin');
    } else {
      console.log('没有登录')
    }
  },
  //用户名
  setUsername({
    commit
  }, username) {
    commit('setUsername', username);
  },
  // 用户信息
  setUserinfo({
    commit
  }, userinfo) {
    commit('setUserinfo', userinfo);
  },
  // 被赞数
  setStarnum({
    commit
  }) {
    commit('setStarnum');
  }
}

export default actions;
