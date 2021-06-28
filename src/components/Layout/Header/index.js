import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './styles';

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} justify="center" alignItems="center" className={classes.header}>
      <span>Carango Bom</span>
    </Grid>
  );
};

export default Header;
