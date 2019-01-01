export default{
  state: {
    isShowAsideMenu: false
  },
  mutations: {
    showAsideMenu (state, flag) {
      state.isShowAsideMenu = flag
    }
  }
}
