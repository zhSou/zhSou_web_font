import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchMain from '@/views/SearchMain'
import Login from '@/views/Login'
import Register from '@/views/Register'
import UserInfo from '@/views/UserInfo'

Vue.use(VueRouter)

const routes = [
  // 主页面
  {
    path: '/home',
    name: 'searchMain',
    component: SearchMain
  },
  // 路由重定向
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfo
  }
]

const router = new VueRouter({
  routes
})

export default router
