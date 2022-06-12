// 导入
import Vue from 'vue'
import Vuex from 'vuex'
import { login, register, getUserInfo } from '@/api'
// import { setTokenStr, getTokenStr } from '@/utils/storage.js'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: Cookies.get('jwtToken') || '',
    user: {}
  },
  getters: {
  },
  mutations: {
    // 修改token方法
    setToken (state, value) {
      state.token = value
      const expires = new Date(new Date() * 1 + 0.5 * 60 * 1000)
      Cookies.set('jwtToken', value, { expires: expires }) // 30s后消失
      console.log(Cookies.get('jwtToken'))
    },
    setUser (state, value) {
      state.user = value
    }
  },
  actions: {
    async userLogin (context, userInfo) {
      try {
        const res = await login(userInfo)
        const data = res.data
        if (res.status === 200 && 'token' in data) {
          context.commit('setToken', data.token)
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
        if (res.status === 200 && 'token' in data) {
          context.commit('setToken', data.token)
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
        if (res.status === 200) {
          context.commit('setUser', data)
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
