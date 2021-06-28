import React from 'react';
import { Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';
import Login from '../screens/Login';

import AuthenticationRoute from './AuthenticationRoute';

const Routes = () => (
  <Switch>
    <AuthenticationRoute exact path="/cadastro-marca" isPrivate>
      <BrandRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/alteracao-marca/:id" isPrivate>
      <BrandRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/marcas" isPrivate>
      <BrandsList />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/usuarios" isPrivate>
      <div>usuários</div>
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/dashboard" isPrivate>
      <div>dashboard</div>
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/login">
      <Login />
    </AuthenticationRoute>
    <AuthenticationRoute path="/">
      <div>veículos</div>
    </AuthenticationRoute>
  </Switch>
);

export default Routes;
