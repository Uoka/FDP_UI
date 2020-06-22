import Vue from 'vue'
import Router from 'vue-router'
import store from '@/tools/store/index'
import EducationRoute from '@/view/main/education/EducationRoute'
import SystemManagementRoute from '@/view/main/systemManagement/SystemManagementRoute'
import HomepageRoute from '@/view/homepage/HomepageRoute'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/homePage',
      meta: {
        requiresAuth: false
      },
      component: () => import('../view/homepage/HomepageMain'),
      children: [
        ...HomepageRoute
      ]
    }, {
      path: '/account',
      name: 'login',
      component: () => import('../view/account/LoginPage'),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/register',
      name: 'register',
      component: () => import('../view/account/RegisterPage'),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/',
      meta: {
        requiresAuth: true
      },
      component: () => import('../view/main/Index'),
      children: [
        ...EducationRoute,
        ...SystemManagementRoute
      ]
    }
  ]
})

// 页面刷新时，重新赋值有没登录
let token =  window.sessionStorage.getItem('token')
if (token && token !== "[object Object]") {
  store.commit('token/setToken', JSON.parse(token))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {  // 判断该路由是否需要登录权限
    if (store.getters['token/isLogin']) {  // 通过vuex 如果当前有登录
      next()
    } else {
      next({
        name: 'homepage'
      })
    }
  } else {
    next()
  }
})

export default router
