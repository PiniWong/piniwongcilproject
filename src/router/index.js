import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store  from '@/store'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
 
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(Router)
const router =new Router({
    routes,
    mode:'history'
})

// router.beforeEach((to,from,next)=>{
//     if(to.path == '/login') return next()
//     const token = sessionStorage.getItem('token');
//     console.log(to.path)

//     if(!token) return next('/login')
//     next()
// })

router.afterEach(r =>{
    store.commit('selectedKeys',[r.path])
})

export default router