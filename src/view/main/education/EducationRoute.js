import StudentRoute from '@/view/main/education/student/StudentRoute'
import TeacherRoute from '@/view/main/education/teacher/TeacherRoute'

export default [
  {
    path: 'education',
    name: 'education',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Index'),
    children: [
      ...StudentRoute,
      ...TeacherRoute
    ]
  }
]
