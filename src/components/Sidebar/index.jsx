import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Authentication from '../../contexts/authentication';

import ListItem from './ListItem';
import { useStyles } from './styles';

const Sidebar = () => {
  const classes = useStyles();

  const { logout } = useContext(Authentication);

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
  ];

  return (
    <Grid container className={classes.container} component="nav" direction="column">
      {menuItems.map((props) => (
        <Link to={props.path} key={`${props.id}`} className={classes.link}>
          <ListItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        </Link>
      ))}
      <ListItem action={logout} shouldBeLoggedIn text="Sair" />
    </Grid>
  );
};

export default Sidebar;
