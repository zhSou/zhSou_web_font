// 接口统一管理
// 引入二次封装的 axios
import Require from './ajax'

// 登录请求
export const login = (params) => Require({
  url: '/api/login',
  method: 'post',
  data: params
})

// 登出请求
export const logout = () => Require({
  url: '/api/logout',
  method: 'post'
})

// 注册请求
export const register = (params) => Require({
  url: '/api/register',
  method: 'post',
  data: params
})

// 获取个人收藏夹请求
export const getFolders = (params) => Require({
  url: '/api/getFolderByUser',
  method: 'post'
})

// 获取个人收藏夹请求
export const addFolders = (params) => Require({
  url: '/api/addFolder',
  method: 'post',
  data: params
})

// 添加收藏请求
export const addFavorite = (params) => Require({
  url: '/api/addFavorite',
  method: 'post',
  data: params
})

// 删除收藏夹请求
export const delFolder = (params) => Require({
  url: '/api/delFolder',
  method: 'post',
  data: params
})

// 重命名收藏夹请求
export const reNameFolder = (params) => Require({
  url: '/api/reNameFolder',
  method: 'post',
  data: params
})
