import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mv from '@/components/Mv'
import Radio from '@/components/Radio'
import Find from '@/components/Find'
import musicList from '@/components/MusicList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/mv',
      name: 'mv',
      component: Mv
    },
    {
      path: '/radio',
      name: 'radio',
      component: Radio
    },
    {
      path: '/find',
      name: 'find',
      component: Find
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/music-list/:id',
      name: 'musicList',
      component: musicList
    }
  ]
})
