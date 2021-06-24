import React from 'react';
import { Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';
import Login from '../screens/Login';

import CustomRoute from './CustomRoute';

const Routes = () => (
  <Switch>
    <CustomRoute path="/cadastro-marca" isPrivate>
      <BrandRegistry />
    </CustomRoute>
    <CustomRoute path="/alteracao-marca/:id" isPrivate>
      <BrandRegistry />
    </CustomRoute>
    <CustomRoute path="/login">
      <Login />
    </CustomRoute>
    <CustomRoute path="/">
      <BrandsList />
    </CustomRoute>
  </Switch>
);

export default Routes;
