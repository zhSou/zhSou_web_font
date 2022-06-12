import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  // 主页面
  {
    path: '/home',
    name: 'searchMain',
    component: SearchMain => require(['@/views/SearchMain'], SearchMain)
  },
  // 路由重定向
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login => require(['@/views/Login'], Login)
  },
  {
    path: '/register',
    name: 'register',
    component: Register => require(['@/views/Register'], Register)
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfo => require(['@/views/UserInfo'], UserInfo)
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login' || to.path === '/register' || to.path === '/home') return next()
  // 获取token
  const tokenStr = store.state.token
  if (!tokenStr) return next('/home')
  next()
})

export default router
