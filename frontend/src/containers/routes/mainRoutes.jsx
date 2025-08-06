import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import routes from '../../routse';
import Spinner from '../../components/spinner/Spinner';
import ProtectedRoute from '../../Login/ProtectedRoute';

const Routes = ({ defaultPath }) => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      {
        routes.map((obj, i) => {
          return obj.component ? (
            <ProtectedRoute
              key={i}
              exact={obj.exact}
              path={obj.path}
              component={obj.component}
              role={obj.role}
              defaultPath={defaultPath}
            />
          ) : null;
        })
      }
      <Redirect from="/" to={defaultPath} />
    </Switch>
  </Suspense>
);

export default Routes;
