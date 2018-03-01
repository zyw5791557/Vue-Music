import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Recommend     = resolve => require(['@/views/recommend/Recommend.vue'], resolve);
const Disc          = resolve => require(['@/components/disc/Disc.vue'], resolve);
const Singer        = resolve => require(['@/views/singer/Singer.vue'], resolve);
const SingerDetail  = resolve => require(['@/components/singer-detail/SingerDetail.vue'], resolve);
const Rank          = resolve => require(['@/views/rank/Rank.vue'], resolve);
const TopList       = resolve => require(['@/components/top-list/TopList.vue'], resolve);
const Search        = resolve => require(['@/views/search/Search.vue'], resolve);
const UserCenter    = resolve => require(['@/components/user-center/UserCenter.vue'], resolve);
const NotFound      = resolve => require(['@/views/404.vue'], resolve);

let routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: Recommend,
        name: 'Recommend',
        children: [
            {
                path: ':id',
                component: Disc,
                name: 'Disc'
            }
        ]
    },
    {
        path: '/singer',
        component: Singer,
        name: 'Singer',
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
        path: '/rank',
        component: Rank,
        name: 'Rank',
        children: [
            {
                path: ':id',
                component: TopList,
                name: 'TopList'
            }
        ]
    },
    {
        path: '/search',
        component: Search,
        name: 'Search',
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
        path: '/user',
        component: UserCenter,
        name: 'User'
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '*',
        component: NotFound,
    }
];

const router = new VueRouter({
	mode: 'history',       // 需要后台配置支持
	routes
})

router.beforeEach((to, from, next) => {
	next();
})


export default router;