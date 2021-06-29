/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Authentication from '../../contexts/authentication';

const AuthenticationRoute = ({ children, path, isPrivate }) => {
  const { isLoggedIn } = useContext(Authentication);
  const history = useHistory();

  if (isPrivate && !isLoggedIn) {
    history.push('/login');
    return null;
  }

  return <Route path={path}>{children}</Route>;
};

export default AuthenticationRoute;
