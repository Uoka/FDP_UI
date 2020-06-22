export default [
  {
    path: 'permission',
    name: 'permission_list',
    meta: {
      requiresAuth: true
    },
    component: () => import('./PermissionList')
  }, {
    path: 'permission/add',
    name: 'permission_add',
    meta: {
      requiresAuth: true
    },
    component: () => import('./PermissionFrom')
  }, {
    path: 'permission/edit/:uid',
    name: 'permission_edit',
    meta: {
      requiresAuth: true
    },
    component: () => import('./PermissionFrom')
  }
]
