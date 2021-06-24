/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Authentication from '../../contexts/authentication';

const PrivateRoute = ({ children, path }) => {
  const { isLoggedIn } = useContext(Authentication);
  const history = useHistory();

  if (!isLoggedIn) {
    history.push('/login');
  }

  return <Route path={path}>{children}</Route>;
};

export default PrivateRoute;
