import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticationRoute(route) {
  const { path, exact, routes, auth } = route
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        let token = localStorage.getItem('token');
        if (auth && !token) {
          return <Redirect to="/login" push={true} />;
        }
        return <route.component parentPath={path} {...props} routes={routes} />;
      }}
    />
  );
}