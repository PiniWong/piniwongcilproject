const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer:{
    // before:require('./mock/index.js')
},
  configureWebpack: {
    // resolve: {
    //   // alias: {
    //   //   'assets': '@/assets',
    //   //   'components': '@/components',
    //   //   'views': '@/view',
    //   //   'util':'@/util'
    //   // }
    // }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },

  devServer:{
    port: 8080,
    host: 'localhost',
    open: true,
    https: false,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3000',
        changeOrigin:true,
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  }
  
}