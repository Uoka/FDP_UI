export default [
  {
    path: 'class',
    name: 'teacher_class',
    meta: {
      requiresAuth: true
    },
    component: () => import('./LeaningClass')
  }
]
