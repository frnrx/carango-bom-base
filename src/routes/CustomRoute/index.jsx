/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import Authentication from '../../contexts/authentication';
import SideBar from '../../components/SideBar';

const CustomRoute = ({ children, path, isPrivate }) => {
  const { isLoggedIn } = useContext(Authentication);
  const history = useHistory();

  if (isPrivate && !isLoggedIn) {
    history.push('/login');
    return null;
  }

  return (
    <Grid container direction="row" item xs={12}>
      <Grid item xs={3}>
        <SideBar />
      </Grid>
      <Grid item xs={9}>
        <Route path={path}>{children}</Route>
      </Grid>
    </Grid>
  );
};

export default CustomRoute;
