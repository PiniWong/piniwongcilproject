module.exports = {
  devServer:{
    before:require('./mock/index.js')
},
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/view',
      }
    }
  },
  
}