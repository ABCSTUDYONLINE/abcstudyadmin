import Categories from '../../pages/categories/Categories'
import Sourses from '../../pages/sourses/Sourses'
import Users from '../../pages/users/Users'

import {
    Category as CategoryIcon,
    LibraryBooks as LibraryBooksIcon,
    Group as GroupIcon,
}from '@material-ui/icons'

const listMenu = [
  {
    name: "Categories",
    path: "/",
    exact: true,
    icon: <CategoryIcon />,
    component: Categories,
  },
  {
    name: "Sourses",
    path: "/sourses",
    icon: <LibraryBooksIcon />,
    component: Sourses,
  },
  {
    name: "Users",
    path: "/users",
    icon: <GroupIcon />,
    component: Users,
  }
];
export default listMenu