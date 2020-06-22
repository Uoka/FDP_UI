export default [
  {
    path: 'demo1',
    name: 'teacher_demo1',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Demo')
  }, {
    path: 'demo2',
    name: 'teacher_demo2',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Demo')
  }
]
