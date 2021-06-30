import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';

import { AuthenticationContext } from '../../../contexts/authentication';

import ListItem from './ListItem';
import { useStyles } from './styles';

const Sidebar = () => {
  const classes = useStyles();

  const { logout } = useContext(AuthenticationContext);

  const menuItems = [
    {
      id: '1',
      path: '/login',
      text: 'Entrar',
      shouldBeLoggedOut: true,
    },
    {
      id: '2',
      path: '/',
      text: 'Veículos',
      shouldBeLoggedIn: false,
    },
    {
      id: '3',
      path: '/marcas',
      text: 'Marcas',
      shouldBeLoggedIn: true,
    },
    {
      id: '4',
      path: '/usuarios',
      text: 'Usuários',
      shouldBeLoggedIn: true,
    },
    {
      id: '5',
      path: '/dashboard',
      text: 'Dashboard',
      shouldBeLoggedIn: true,
    },
    {
      id: '6',
      text: 'Sair',
      shouldBeLoggedIn: true,
      action: logout,
    },
  ];

  return (
    <Grid container className={classes.container} component="nav" direction="column">
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={`${item.id}`}
            action={item.action}
            path={item.path}
            text={item.text}
            shouldBeLoggedIn={item.shouldBeLoggedIn}
            shouldBeLoggedOut={item.shouldBeLoggedOut}
          />
        ))}
      </List>
    </Grid>
  );
};

export default Sidebar;
