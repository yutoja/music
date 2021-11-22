import axios from 'axios'
import https from './https'

axios.defaults.baseURL = https
axios.defaults.method = 'GET'
// axios.defaults.timeout = 3000
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么

    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// axios.interceptors.request.use(
//   function(config) {
//     // 在发送请求之前做些什么
//     return config
//   },
//   function(error) {
//     // 对请求错误做些什么
//     return Promise.reject(error)
//   }
// )
export default axios
