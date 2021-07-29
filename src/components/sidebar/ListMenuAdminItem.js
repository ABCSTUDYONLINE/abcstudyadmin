import Categories from '../../pages/categories/Categories'
import Courses from '../../pages/courses/Courses'
import Users from '../../pages/users/Users'

import {
    Category as CategoryIcon,
    LibraryBooks as LibraryBooksIcon,
    Group as GroupIcon,
}from '@material-ui/icons'

const listMenuAdmin = [
  {
    name: "Categories",
    path: "/dashboard/admin/categories",
    exact: true,
    icon: <CategoryIcon />,
    component: Categories,
  },
  {
    name: "Courses",
    path: "/dashboard/admin/courses",
    icon: <LibraryBooksIcon />,
    component: Courses,
  },
  {
    name: "Users",
    path: "/dashboard/admin/users",
    icon: <GroupIcon />,
    component: Users,
  },
  {
    name: "New teacher",
    path: "/dashboard/admin/new-teacher",
    icon: <GroupIcon />,
    component: Users,
  }
];
export default listMenuAdmin