import Vue from 'vue'
import Vuex from 'vuex'
import header from './module/header'
import home from './module/home'
import asideMenu from './module/asideMenu'
import play from './module/play'
import musicList from './module/musicList'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    home,
    asideMenu,
    play,
    musicList
  }
})
