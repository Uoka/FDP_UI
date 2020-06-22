export default [
  {
    path: 'main',
    name: 'homepage',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageList')
  }, {
    path: 'demo2',
    name: 'demo2',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageDemo')
  }, {
    path: 'demo3',
    name: 'demo3',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageDemo')
  }, {
    path: 'demo4',
    name: 'demo4',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageDemo')
  }, {
    path: 'demo5',
    name: 'demo5',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageDemo')
  }, {
    path: 'demo6',
    name: 'demo6',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageDemo')
  }, {
    path: 'demo7',
    name: 'demo7',
    meta: {
      requiresAuth: false
    },
    component: () => import('./HomepageDemo')
  }
]
