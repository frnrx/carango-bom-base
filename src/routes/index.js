import React from 'react'
import { Route, Switch } from 'react-router-dom';

import CadastroMarca from '../screens/Brands/BrandRegistry/CadastroMarca';
import ListagemMarcas from '../screens/Brands/BrandsList/ListagemMarcas';

const Routes = () => (
    <Switch>
      <Route path="/cadastro-marca">
        <CadastroMarca />
      </Route>
      <Route path='/alteracao-marca/:id'>
        <CadastroMarca />
      </Route>
      <Route path="/">
        <ListagemMarcas />
      </Route>
    </Switch>
)

export default Routes