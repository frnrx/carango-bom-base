import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';
import Login from '../screens/Login';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <PrivateRoute path="/cadastro-marca">
      <BrandRegistry />
    </PrivateRoute>
    <PrivateRoute path="/alteracao-marca/:id">
      <BrandRegistry />
    </PrivateRoute>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      <BrandsList />
    </Route>
  </Switch>
);

export default Routes;
