export default [
  {
    path: 'student',
    name: 'student_list',
    meta: {
      requiresAuth: true
    },
    component: () => import('./StudentList')
  }, {
    path: 'student/add',
    name: 'student_add',
    meta: {
      requiresAuth: true
    },
    component: () => import('./StudentFrom')
  }, {
    path: 'student/edit/:uid',
    name: 'student_edit',
    meta: {
      requiresAuth: true
    },
    component: () => import('./StudentFrom')
  }
]
