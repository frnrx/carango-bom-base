import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import MuiLink from '@material-ui/core/Link';

import Authentication from '../../../../contexts/authentication';

import { useStyles } from './styles';

const ListItemComponent = ({ path, text, action, shouldBeLoggedIn, shouldBeLoggedOut }) => {
  const location = useLocation();
  const classes = useStyles();
  const { isLoggedIn } = useContext(Authentication);
  const shouldRender = (shouldBeLoggedIn && !isLoggedIn) || (shouldBeLoggedOut && isLoggedIn);

  const isActive = location.pathname === path;

  if (shouldRender) {
    return null;
  }

  return (
    <ListItem
      className={classes.listItems}
      style={isActive ? { backgroundColor: '#333333', color: 'white' } : {}}
    >
      {path &&
        <MuiLink to={path} component={Link} className={classes.linkWidth}>
          <ListItemText>
            {text}
          </ListItemText>
        </MuiLink>
      }
      {action &&
        <ButtonBase onClick={action} className={classes.buttonWidth}>
          <ListItemText>
            {text}
          </ListItemText>
        </ButtonBase>
      }
    </ListItem>
  );
};

export default ListItemComponent;
