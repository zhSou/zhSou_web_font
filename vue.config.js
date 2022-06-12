const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'mock/1076974'
        }
      },
      'searchApi': {
        target: 'http://server.zhangzqs.cn:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/searchApi': ''
        }
      }
    }
  }
})
