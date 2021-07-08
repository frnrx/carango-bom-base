import React from 'react';
import { Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';
import Login from '../screens/Login';
import VehiclesList from '../screens/Vehicles/VehiclesList';
import VehicleRegistry from '../screens/Vehicles/VehicleRegistry';
import UserRegistration from '../screens/Users/UserRegistration';
import UsersList from '../screens/Users/UsersList';
import Dashboard from '../screens/Dashboard';

import AuthenticationRoute from './AuthenticationRoute';

const Routes = () => (
  <Switch>
    <AuthenticationRoute exact path="/alteracao-veiculo/:vehicleId" isPrivate>
      <VehicleRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/cadastro-veiculo" isPrivate>
      <VehicleRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/cadastro-marca" isPrivate>
      <BrandRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/alteracao-marca/:brandId" isPrivate>
      <BrandRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/marcas" isPrivate>
      <BrandsList />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/cadastro-usuario" isPrivate>
      <UserRegistration />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/usuarios" isPrivate>
      <UsersList />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/dashboard" isPrivate>
      <Dashboard />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/login">
      <Login />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/">
      <VehiclesList />
    </AuthenticationRoute>
  </Switch>
);

export default Routes;
