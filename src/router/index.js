import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,//首页
    meta: {
      isHome: true
    }
  }, {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')//关于我们页
  }, {
    path: '/server',
    name: 'server',
    component: () => import('../views/ServerTheWorld.vue')//服务全球页
  }, {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue')//新闻资讯页
  }, {
    path: '/newDetail',
    name: 'newDetail',
    component: () => import('../views/NewsDetail.vue')//新闻详情页
  }, {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactUs.vue')//联系我们页
  }, {
    path: '/center',
    name: 'center',
    component: () => import('../views/Center.vue')//中间辅助跳转页
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
