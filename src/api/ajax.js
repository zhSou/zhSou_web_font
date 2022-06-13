// axios 实例创建
import axios from 'axios'

// 创建 axios 实例
const Require = axios.create({
  // 设置超时时间
  timeout: 3000
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
