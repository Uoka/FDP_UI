export default [
  {
    path: 'role',
    name: 'role_list',
    meta: {
      requiresAuth: true
    },
    component: () => import('./RoleList')
  }, {
    path: 'role/add',
    name: 'role_add',
    meta: {
      requiresAuth: true
    },
    component: () => import('./RoleFrom')
  }, {
    path: 'role/edit/:uid',
    name: 'role_edit',
    meta: {
      requiresAuth: true
    },
    component: () => import('./RoleFrom')
  }
]
