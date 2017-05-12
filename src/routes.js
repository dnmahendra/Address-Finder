import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from './components/Main';
import Home from './components/Home';

const routes = (
  <Route path="/" component={Main} >
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
