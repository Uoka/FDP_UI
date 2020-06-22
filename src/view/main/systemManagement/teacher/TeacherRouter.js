export default [
  {
    path: 'teacher',
    name: 'teacher_list',
    meta: {
      requiresAuth: true
    },
    component: () => import('./TeacherList')
  }, {
    path: 'teacher/add',
    name: 'teacher_add',
    meta: {
      requiresAuth: true
    },
    component: () => import('./TeacherFrom')
  }, {
    path: 'teacher/edit/:uid',
    name: 'teacher_edit',
    meta: {
      requiresAuth: true
    },
    component: () => import('./TeacherFrom')
  }
]
