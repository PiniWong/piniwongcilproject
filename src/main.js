import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import Vue2OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css'
import store from '@/store'

import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

// import axios from 'axios'

// Vue.prototype.$http = axios
Vue.use(router)
Vue.use(Vue2OrgTree)
Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

