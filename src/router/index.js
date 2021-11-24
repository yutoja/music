import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

function inter(obj, target, callback) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function() {
    let step = (target - obj.scrollTop) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    obj.scrollTop = step + obj.scrollTop
    if (Math.abs(obj.scrollTop - target) < 1) {
      clearInterval(obj.timer)
      if (callback) {
        callback()
      }
    }
  }, 5)
}

const router = new VueRouter({
  // mode: 'history',
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
    { path: '/User', component: () => import('@/components/user') },
    { path: '/Zhuan', component: () => import('@/components/zhuanji') },
    { path: '/Xindie', component: () => import('@/components/xindie') },
    { path: '/Vedio', component: () => import('@/components/vedio') },
    { path: '/Personage', component: () => import('@/components/personage') }
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

router.afterEach((to, from) => {
  if (document.documentElement.scrollTop === 0) return
  inter(document.documentElement, 0)
})

export default router
