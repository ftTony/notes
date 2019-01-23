import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const MyRecommend = resolve => require.ensure([], () => resolve(require('@/components/MyRecommend')), 'recommend');

const MySongListDetail = resolve => require.ensure([], () => resolve(require('@/components/MySongListDetail')), 'songlistdetail');

const MyUser = resolve => require.ensure([], () => resolve(require('@/components/MyUser')), 'myuser');
const MySinger = resolve => require.ensure([], () => resolve(require('@/components/MySinger')), 'mysinger');
const MySingerDetail = resolve => require.ensure([], () => resolve(require('@/components/MySingerDetail')), 'mysingerdetail');
const MyRank = resolve => require.ensure([], () => resolve(require('@/components/MyRank')), 'myrank');
const MyRankDetail = resolve => require.ensure([], () => resolve(require('@/components/MyRankDetail')), 'myrankdetail');
const MySearch = resolve => require.ensure([], () => resolve(require('@/components/MySearch')), 'mysearch');



// const MySongListDetail=(resolve)=>{
//     import('@/components/MySongListDetail').then((module)=>{
//         resolve(module)
//     });
// }

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/user',
            name: 'user',
            component: MyUser
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: MyRecommend,
            children: [{
                path: 'id',
                name: 'songlistdetail',
                component: MySongListDetail
            }]
        },
        {
            path: '/singer',
            name: 'singer',
            component: MySinger,
            children: [{
                path: ':id',
                name: 'singerdetail',
                component: MySingerDetail
            }]
        },
        {
            path: '/rank',
            name: 'rank',
            component: MyRank,
            children: [{
                path: ':id',
                name: 'rankdetail',
                component: MyRankDetail
            }]
        },
        {
            path: '/search',
            name: 'search',
            component: MySearch,
            children: [{
                path: ':id',
                component: MySingerDetail
            }]
        }
    ]
});