import React from 'react';
import { Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';
import Login from '../screens/Login';

import CustomRoute from './CustomRoute';

const Routes = () => (
  <Switch>
    <CustomRoute exact path="/cadastro-marca" isPrivate>
      <BrandRegistry />
    </CustomRoute>
    <CustomRoute exact path="/alteracao-marca/:id" isPrivate>
      <BrandRegistry />
    </CustomRoute>
    <CustomRoute exact path="/marcas" isPrivate>
      <BrandsList />
    </CustomRoute>
    <CustomRoute exact path="/usuarios" isPrivate>
      <div>usuários</div>
    </CustomRoute>
    <CustomRoute exact path="/dashboard" isPrivate>
      <div>dashboard</div>
    </CustomRoute>

    <CustomRoute exact path="/login">
      <Login />
    </CustomRoute>
    <CustomRoute path="/">
      <div>veículos</div>
    </CustomRoute>
  </Switch>
);

export default Routes;
