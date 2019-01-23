import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router' // vue-router
import store from './store' // vuex

import '@/common/scss/index.scss'
import attachFastClick from 'fastclick'

attachFastClick.attach(document.body)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
    loading: require('./common/img/default.png')
})

Vue.config.productionTip = false

new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>',
    components:{App}
})