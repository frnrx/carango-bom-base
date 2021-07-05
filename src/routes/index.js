import React from 'react';
import { Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';
import Login from '../screens/Login';
import VehiclesList from '../screens/Vehicles/VehiclesList';
import UserRegistration from '../screens/UserRegistration';
import VehicleRegistry from '../screens/Vehicles/VehicleRegistry';

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
    <AuthenticationRoute exact path="/alteracao-marca/:id" isPrivate>
      <BrandRegistry />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/marcas" isPrivate>
      <BrandsList />
    </AuthenticationRoute>
    <AuthenticationRoute exact path="/cadastro-usuario" isPrivate>
      <UserRegistration />
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
    <AuthenticationRoute exact path="/">
      <VehiclesList />
    </AuthenticationRoute>
  </Switch>
);

export default Routes;
