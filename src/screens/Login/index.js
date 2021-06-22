import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

import useErrors from '../../hooks/useErrors';

import { login } from './services';
import { useStyles } from './styles';
import validations from './validations';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const [errors, validateFields, isFormValid] = useErrors(validations);

  const onSubmit = (event) => {
    event.preventDefault();

    login(username, password);
  };

  const handleUpdateUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2} alignContent="center">
        <Grid container item xs={6}>
          <TextField
            fullWidth
            id="username"
            label="Usuário"
            type="text"
            name="username"
            role="textbox"
            onChange={handleUpdateUsername}
            variant="outlined"
            onBlur={validateFields}
            helperText={errors.username.text}
            error={errors.username.showError}
          />
        </Grid>
        <Grid container item xs={6}>
          <TextField
            fullWidth
            id="password"
            label="Senha"
            type="password"
            name="password"
            role="textbox"
            onChange={handleUpdatePassword}
            variant="outlined"
            onBlur={validateFields}
            helperText={errors.password.text}
            error={errors.password.showError}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={classes.sumbitButton}
            disabled={!isFormValid()}
          >
            Logar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
