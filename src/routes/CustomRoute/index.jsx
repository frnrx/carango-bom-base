/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Authentication from '../../contexts/authentication';
import Layout from '../../components/Layout';

const CustomRoute = ({ children, path, isPrivate }) => {
  const { isLoggedIn } = useContext(Authentication);
  const history = useHistory();

  if (isPrivate && !isLoggedIn) {
    history.push('/login');
    return null;
  }

  return (
    <Layout>
      <Route path={path}>{children}</Route>
    </Layout>
  );
};

export default CustomRoute;
