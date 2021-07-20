import Categories from '../../pages/categories/Categories'
import Courses from '../../pages/courses/Courses'
import Users from '../../pages/users/Users'

import {
    Category as CategoryIcon,
    LibraryBooks as LibraryBooksIcon,
    Group as GroupIcon,
}from '@material-ui/icons'

const listMenu = [
  {
    name: "Categories",
    path: "/dashboard/categories",
    exact: true,
    icon: <CategoryIcon />,
    component: Categories,
  },
  {
    name: "Courses",
    path: "/dashboard/courses",
    icon: <LibraryBooksIcon />,
    component: Courses,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: <GroupIcon />,
    component: Users,
  }
];
export default listMenu