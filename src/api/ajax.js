// axios 实例创建
import axios from 'axios'
import store from '@/store'
// 创建 axios 实例
const Require = axios.create({
  // 设置超时时间
  timeout: 3000
})
// 请求拦截
Require.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer' + store.state.token
  return config
})
// 响应拦截
Require.interceptors.response.use(res => {
  return res
}, err => {
  // 请求的地址错误 会进入这里
  return Promise.reject(err)
}
)
// 导出
export default Require
