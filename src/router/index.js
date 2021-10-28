import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('@/components/home') },
    { path: '/Bang', component: () => import('@/components/bangdan') },
    { path: '/Gedan', component: () => import('@/components/gedan') },
    { path: '/Xiang', component: () => import('@/components/xiang') },
    { path: '/Details', component: () => import('@/components/details') },
    { path: '/Personal', component: () => import('@/components/personal') },
    { path: '/Singer', component: () => import('@/components/singer') },
    { path: '/SingerHome', component: () => import('@/components/Singerhome') },
    { path: '/User', component: () => import('@/components/user') }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
