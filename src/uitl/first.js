import Little from '@/views/Little'

export default {
  install(Vue) {
    // 将http转换为https
    Vue.filter('https', value => {
      if (value.indexOf('https') !== -1) return value
      return `https${value.slice(4)}`
    })
    // 北极熊加载动画组件
    Vue.component('Little', Little)
  }
}
