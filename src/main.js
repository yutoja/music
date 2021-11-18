import Vue from 'vue'

import App from './App.vue'

import axios from './api/api'

import router from './router/index'

import store from './store'

import mix from '@/api/mix'

import Little from '@/views/Little'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.mixin(mix)

Vue.component('Little', Little)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
