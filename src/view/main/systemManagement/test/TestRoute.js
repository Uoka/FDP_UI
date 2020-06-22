export default [
  {
    path: 'test',
    name: 'test',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Test')
  }
]
