export default [
  {
    path: 'student',
    name: 'student_homepage',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Index')
  }
]
