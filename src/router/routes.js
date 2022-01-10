const pay = () => import('@/views/pay/pay.vue')

import main from '@/layout/main'

const login = () => import('@/views/login/login');
const home = () => import('@/views/home/home');

export default [{
    path: '/',
    redirect: '/login'
},
{
    path: "/login",
    meta: {
        title: '登录'
    },
    component: login
},
{
    path: '/',
    meta: {
        title: "首页"
    },
    name:'main',
    component: main,
    children: [
          {
            path: '/pay',
            name: 'pay',
            component: pay,
            meta: {
              title: '支付列表'
            },
            children: [
            ]
          },
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        meta: {
            title: '主页'
        },
            component: home
        },
      
    ]
}
]