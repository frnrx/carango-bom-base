import React from 'react';
import { ListItemText } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import { useStyles } from './styles';

const ListItem = ({ path, text, action, shouldBeLoggedIn, shouldBeLoggedOut, isLoggedIn }) => {
  const location = useLocation();
  const classes = useStyles();

  const handleAction = () => {
    if (action) {
      action();
    }
  };

  const isActive = location.pathname === path;

  if ((shouldBeLoggedIn && !isLoggedIn) || (shouldBeLoggedOut && isLoggedIn)) {
    return null;
  }

  return (
    <ListItemText
      className={classes.listItems}
      style={isActive ? { backgroundColor: '#333333', color: 'white' } : {}}
      onClick={handleAction}
      onKeyDown={handleAction}
    >
      {text}
    </ListItemText>
  );
};

export default ListItem;
