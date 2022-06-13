// 导入
import Vue from 'vue'
import Vuex from 'vuex'
import { login, register, getUserInfo } from '@/api'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: Cookies.get('jwtToken') || '',
    user: {},
    articles: []
  },
  getters: {
  },
  mutations: {
    // 修改token方法
    setToken (state, value) {
      state.token = value
      const expires = new Date(new Date() * 1 + 30 * 60 * 1000)
      Cookies.set('jwtToken', value, { expires: expires }) // 30s后消失
    },
    setUser (state, value) {
      state.user = value
    },
    setArticles (state, value) {
      state.articles = value
    }
  },
  actions: {
    async userLogin (context, userInfo) {
      try {
        const res = await login(userInfo)
        const data = res.data
        if (res.status === 200 && res.data.code === '0') {
          context.commit('setToken', data.data)
        }
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
    async userRegister (context, userInfo) {
      try {
        const res = await register(userInfo)
        const data = res.data
        if (res.status === 200 && res.data.code === '0') {
          context.commit('setToken', data.data)
        }
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
    async userInfo (context) {
      try {
        const res = await getUserInfo()
        const data = res.data
        if (res.status === 200 && res.data.code === '0') {
          context.commit('setUser', data.data)
        }
        return data
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  modules: {
  }
})
