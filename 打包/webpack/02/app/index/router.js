import Vue from 'vue';
import VueRouter from 'vue-router';

import home from './views/home';
import xxx from './views/xxx';

Vue.use(VueRouter);

const routes = [{
        path: '/home',
        component: home
    },
    {
        path: '/xxx',
        component: xxx
    },
    {
        path: '*', // 其他没有的页面都重定向到 home页面去
        redirect: '/home'
    }
];

var router =new VueRouter({
    routes:routes
});
export default router;