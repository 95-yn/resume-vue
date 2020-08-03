import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
// import home from './page/home/index'
// import profile from './page/profile/index'
const home = () => import(/* webpackChunkName: "group-1" */ './page/home/index.vue')
const profile = () => import(/* webpackChunkName: "group-2" */ './page/profile/index.vue')
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/', name: 'home', component: home },
    { path: '/home', name: 'home', component: home },
    { path: '/profile', name: 'profile', component: profile },
  ]
})