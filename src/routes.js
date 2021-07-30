// import React from 'react';
import Layout from './components/layout/Layout'
// import Register from './pages/register/Register';
import NotFound from './pages/error/Error'
import Login from './pages/login/Login'
import Categories from './pages/categories/Categories'
import Users from './pages/users/Users'
import Courses from './pages/courses/Courses'
import NewTeacher from './pages/new-teacher/NewTeacher'
const routes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  // {
  //   path: '/register',
  //   exact: true,
  //   component: Register
  // },
  {
    path: '/dashboard/admin',
    component: Layout,
    routes: [
      {
        path: '/dashboard/admin/courses',
        exact: true,
        auth: true,
        component: Courses
      },
      {
        path: '/dashboard/admin/users',
        exact: true,
        auth: true,
        component: Users
      },
      {
        path: '/dashboard/admin/categories',
        exact: true,
        auth: true,
        component: Categories
      },
      {
        path: '/dashboard/admin/new-teacher',
        exact: true,
        auth: true,
        component: NewTeacher
      }
    ]
  },
  {
    path: '/dashboard/teacher',
    component: Layout,
    routes: [
      {
        path: '/dashboard/teacher/courses',
        exact: true,
        auth: true,
        component: Courses
      }
    ]
  },
  {
    component: NotFound
  }
]

export default routes
