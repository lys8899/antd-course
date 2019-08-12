import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: require('../Main').default,
    routes: [
      {
        path: '/',
        component: require('../Helloworld').default,
        exact: true,
      },
      {
        path: '/helloworld',
        component: require('../Helloworld').default,
        exact: true,
      },
      {
        path: '/dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            component: require('../Dashboard/Analysis').default,
            exact: true,
          },
          {
            path: '/dashboard/monitor',
            component: require('../Dashboard/Monitor').default,
            exact: true,
          },
          {
            path: '/dashboard/workplace',
            component: require('../Dashboard/Workplace').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('G:/project/antd-course/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/page', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/user',
        routes: [
          {
            path: '/user/userList',
            component: require('../user/UserList').default,
            exact: true,
          },
          {
            path: '/user/monitor',
            component: require('../Dashboard/Monitor').default,
            exact: true,
          },
          {
            path: '/user/workplace',
            component: require('../Dashboard/Workplace').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('G:/project/antd-course/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/page', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/puzzlecards',
        component: require('../Puzzlecards').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('G:/project/antd-course/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/page', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/Mypage1',
    component: require('../Mypage1').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('G:/project/antd-course/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/page', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return <Router history={history}>{renderRoutes(routes, props)}</Router>;
}
