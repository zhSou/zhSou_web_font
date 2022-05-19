import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchMain from '@/views/SearchMain'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'searchMain',
    component: SearchMain
  },
  // 路由重定向
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
