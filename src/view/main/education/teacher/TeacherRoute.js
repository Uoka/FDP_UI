import LeaningClassRoute from '@/view/main/education/teacher/leaningClass/LeaningClassRoute'
import TeacherDemoRoute from '@/view/main/education/teacher/demo/TeacherDemoRoute'

export default [
  {
    path: 'teacher',
    meta: {
      requiresAuth: true
    },
    component: () => import('./Index'),
    children: [
      ...LeaningClassRoute,
      ...TeacherDemoRoute
    ]
  }
]
