import PermissionRoute from '@/view/main/systemManagement/permission/PermissionRoute'
import RoleRoute from '@/view/main/systemManagement/role/RoleRoute'
import StudentRoute from '@/view/main/systemManagement/student/StudentRoute'
import TeacherRouter from '@/view/main/systemManagement/teacher/TeacherRouter'
import TestRoute from '@/view/main/systemManagement/test/TestRoute'

export default [
  {
    path: 'management',
    name: 'management',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Index'),
    children: [
      ...PermissionRoute,
      ...RoleRoute,
      ...StudentRoute,
      ...TeacherRouter,
      ...TestRoute
    ]
  }
]
