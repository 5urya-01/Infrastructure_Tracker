import { lazy } from 'react';

const AuthSignin = lazy(() => import("./Login/signIn"));
const InDepthView = lazy(() => import("./InDepthView/BuildingView"))
const Floor = lazy(() => import("./InDepthView/FloorView"))
const RouteList = [
      {
        path: '/Login',
        exact: true,
        name: 'Signin',
        component: AuthSignin,
        protected: false 
      },
//   { exact: true, path: "/login", name: "login-page", component: AuthSignin },

];

export default RouteList