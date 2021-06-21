import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BrandRegistry from '../screens/Brands/BrandRegistry';
import BrandsList from '../screens/Brands/BrandsList';

const Routes = () => (
  <Switch>
    <Route path="/cadastro-marca">
      <BrandRegistry />
    </Route>
    <Route path="/alteracao-marca/:id">
      <BrandRegistry />
    </Route>
    <Route path="/">
      <BrandsList />
    </Route>
  </Switch>
);

export default Routes;
