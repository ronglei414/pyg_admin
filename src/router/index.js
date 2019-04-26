import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home/Home'
import Welcome from '@/components/Home/Welcome'
import Users from '@/components/Users/Users'
import Rights from '@/components/Auth/Rights'
import Roles from '@/components/Auth/Role'
import Categories from '@/components/Commodity/categories'
import Params from '@/components/Commodity/Params'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    // 如果是/ 返回首页
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/rights',
      name: 'rights',
      component: Rights
    },
    {
      path: '/roles',
      name: 'roles',
      component: Roles
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/params',
      name: 'params',
      component: Params
    }

    ]

  }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 1. 如果是跳转放
  if (to.path === '/login') return next()
  // 2. 如果现在 未登录（sessionStorage是否有token）  拦截到登录
  if (!sessionStorage.getItem('token')) return next('/login')
  // 3. 其他情况
  next()
})
export default router
