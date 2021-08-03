/* eslint-disable no-unused-vars */
// import Categories from '../../pages/categories/Categories'
import Courses from '../../pages/courses/Courses'
import Promotions from '../../pages/promotions/Promotions'
// import Users from '../../pages/users/Users'

import {
  // Category as CategoryIcon,
  LibraryBooks as LibraryBooksIcon
  // Group as GroupIcon,
} from '@material-ui/icons'

const listMenuTeacher = [
  {
    name: 'Courses',
    path: '/dashboard/teacher/courses',
    icon: <LibraryBooksIcon />,
    exact: true,
    component: Courses
  },
  {
    name: 'Promotions',
    path: '/dashboard/teacher/promotions',
    icon: <LibraryBooksIcon />,
    component: Promotions
  }
]
export default listMenuTeacher
