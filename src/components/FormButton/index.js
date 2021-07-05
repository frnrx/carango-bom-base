import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

const FormButton = ({ type, to, disabled, color, isLink, onClick, children }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.buttonContainer}>
      <Button
        fullWidth
        variant="contained"
        type={type}
        color={color}
        disabled={disabled}
        onClick={onClick}
        component={isLink ? Link : undefined}
        to={isLink ? to : null}
        role={isLink ? 'link' : 'button'}
        className={classes.button}
      >
        {children}
      </Button>
    </Grid>
  );
};

export default FormButton;
