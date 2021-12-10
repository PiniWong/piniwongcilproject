
const login = () => import('@/view/login/login');
const home = () => import('@/view/home/home')
const productList = () => import('@/view/home/chil/productList')
const roleList = () => import('@/view/home/chil/role')
const userList = () => import('@/view/home/chil/userList')
const statement = () => import('@/view/home/chil/statement')
const limlist = () => import('@/view/home/chil/limlist')

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
    path: '/home',
    meta: {
        title: "首页"
    },
    component: home,
    children: [{
        path: '/home',
        redirect: '/userList',
    }, {
        path: '/userList',
        name: 'userList',
        meta: {
            title: '用户列表'
        },
        component: userList
    }, {
        path: '/roleList',
        name: 'roleList',
        meta: {
            title: '角色分配'
        },
        component: roleList
    }, {
        path: '/productList',
        name: 'productList',
        meta: {
            title: '商品列表'
        },
        component: productList
    }, {
        path: '/limlist',
        name: 'limlist',
        meta: {
            title: '商品权限'
        },
        component: limlist
    }, {
        path: '/statement',
        name: 'statement',
        meta: {
            title: '数据报表'
        },
        component: statement
    },
    ]
}
]