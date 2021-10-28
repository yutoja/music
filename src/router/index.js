import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from '../components/home'
import Bangdan from '../components/bangdan'
import gedan from '../components/gedan'
import xiang from '../components/xiang'
import Details from '../components/details'
import Personal from '@/components/personal'
import Singer from '@/components/singer'
import SingerHome from '@/components/Singerhome'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/Bang', component: Bangdan },
    { path: '/Gedan', component: gedan },
    { path: '/Xiang', component: xiang },
    { path: '/Details', component: Details },
    { path: '/Personal', component: Personal },
    { path: '/Singer', component: Singer },
    { path: '/SingerHome', component: SingerHome },
    {
      path: '/User',
      component: resolve => {
        require(['@/components/user'], resolve)
      }
    }
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
