import React, { useState, useMemo } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

import { login } from './services';
import { useStyles } from './styles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

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

  const validateFields = useMemo(() => username && password, [username, password]);

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
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={classes.sumbitButton}
            disabled={!validateFields}
          >
            Logar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
