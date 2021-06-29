import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { useStyles } from './styles';

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} justify="center" alignItems="center" className={classes.header}>
      <Typography variant="h4" component="h1">
        Carango Bom
      </Typography>
    </Grid>
  );
};

export default Header;
