import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 按需引入elemenet-ui
import './plugins/element.js'
// 引入全局样式
import '@/assets/gloable.css'
// 引入字体图标样式
import '@/assets/font/iconfont.css'

// 引入动态背景vue-particles
import VueParticles from 'vue-particles'
import store from '@/store'

Vue.use(VueParticles)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
