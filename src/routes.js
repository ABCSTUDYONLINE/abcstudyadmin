// import React from 'react';
import Layout from './components/layout/Layout';
// import Register from './pages/register/Register';
import NotFound from './pages/error/Error';
import Login from './pages/login/Login';
import Categories from './pages/categories/Categories';
import Users from './pages/users/Users'; 
import Courses from './pages/courses/Courses'; 
import NewTeacher from './pages/new-teacher/NewTeacher'; 
const routes = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  // {
  //   path: '/register',
  //   exact: true,
  //   component: Register
  // },
  {
    path: '/dashboard',
    component: Layout,
    routes: [
      {
        path: '/dashboard/courses',
        exact: true,
        auth: true,
        component: Courses
      },
      {
        path: '/dashboard/users',
        exact: true,
        auth: true,
        component: Users
      },
      {
        path: '/dashboard/categories',
        exact: true,
        auth: true,
        component: Categories
      },
      {
        path: '/dashboard/new-teacher',
        exact: true,
        auth: true,
        component: NewTeacher
      },
    ]
  },
  {
    component: NotFound
  }
];

export default routes;