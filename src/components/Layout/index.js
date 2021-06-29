import React from 'react';
import { Grid } from '@material-ui/core';

import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => (
  <Grid container>
    <Header />
    <Grid container direction="row" item xs={12} justify="space-between">
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
    </Grid>
  </Grid>
);

export default Layout;
