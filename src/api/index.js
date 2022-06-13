// 接口统一管理
// 引入二次封装的 axios
import Require from './ajax'
import store from '@/store'

// 登录请求
export const login = (params) => Require({
  url: '/api/login',
  method: 'post',
  data: params,
  headers: { 'Content-Type': 'multipart/form-data' }
})

// 登出请求
export const logout = () => Require({
  url: '/api/logout',
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 注册请求
export const register = (params) => Require({
  url: '/api/register',
  method: 'post',
  params: params
})

// 获取个人信息请求
export const getUserInfo = () => Require({
  url: '/api/getUserInfo',
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 用户注销请求
export const delUser = () => Require({
  url: '/api/delUser',
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 获取个人收藏夹请求
export const getFolders = () => Require({
  url: '/api/getFolderByUser',
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 获取个人收藏夹所有内容请求
export const getFavoritesByUser = () => Require({
  url: '/api/getFavoritesByUser',
  method: 'post',
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 获取个人收藏夹请求
export const getFavoriteByFolder = (params) => Require({
  url: '/api/getFavoriteByFolder',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 删除收藏请求
export const delFavorite = (params) => Require({
  url: '/api/delFavorite',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 将收藏内容移动到新的收藏夹请求
export const updateFavorite = (params) => Require({
  url: '/api/updateFavorite',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 新增个人收藏夹请求
export const addFolders = (params) => Require({
  url: '/api/addFolder',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 添加收藏请求
export const addFavorite = (params) => Require({
  url: '/api/addFavorite',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 删除收藏夹请求
export const delFolder = (params) => Require({
  url: '/api/delFolder',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 重命名收藏夹请求
export const reNameFolder = (params) => Require({
  url: '/api/reNameFolder',
  method: 'post',
  params: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})

// 搜索文章请求
export const getArticle = (params) => Require({
  url: '/api/getArticle',
  method: 'post',
  data: params,
  headers: {
    Authorization: 'Bearer ' + store.state.token
  }
})
