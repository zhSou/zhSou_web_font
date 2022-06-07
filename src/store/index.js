// 导入
import Vue from 'vue'
import Vuex from 'vuex'
import { login, register } from '@/api'
import { setTokenStr, getTokenStr } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getTokenStr() || ''
  },
  getters: {
  },
  mutations: {
    // 修改token方法
    setToken (state, value) {
      state.token = value
      setTokenStr(value)
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
    }
  },
  modules: {
  }
})
