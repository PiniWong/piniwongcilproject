const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
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
  //配置别名
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },

  devServer:{
    port: 8080,
    host: 'localhost',
    open: true,
    https: false,
    //node接口地址
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