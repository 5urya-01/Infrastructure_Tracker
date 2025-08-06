import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          
          return <Redirect to="/login" />;
        }

        if (user.role === 'admin') {
          return <Component {...props} />;
        }

        if (user.role === role) {
          return <Component {...props} />;
        }

        return <Redirect to={rest.defaultPath || '/unauthorized'} />;
      }}
    />
  );
};

export default ProtectedRoute;
