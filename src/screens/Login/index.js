import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core';

import useErrors from '../../hooks/useErrors';
import Authentication from '../../contexts/authentication';

import { useStyles } from './styles';
import validations from './validations';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login, isLoading } = useContext(Authentication);
  const classes = useStyles();

  const [errors, validateFields, isFormValid] = useErrors(validations);

  const onSubmit = (event) => {
    event.preventDefault();

    login(email, password);
    history.push('/');
  };

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2} alignContent="center">
        <Grid container item xs={8}>
          <TextField
            fullWidth
            id="email"
            label="E-mail"
            type="email"
            name="email"
            role="textbox"
            onChange={handleUpdateEmail}
            variant="outlined"
            onBlur={validateFields}
            helperText={errors.email.text}
            error={errors.email.showError}
          />
        </Grid>
        <Grid container item xs={8}>
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
        <Grid item container justify="space-between" xs={8}>
          <Grid item className={classes.buttonContainer}>
            <Button
              fullWidth
              variant="contained"
              className={classes.button}
              onClick={() => history.push('/')}
            >
              Voltar
            </Button>
          </Grid>
          <Grid item className={classes.buttonContainer}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid()}
              className={classes.button}
            >
              {isLoading ? <CircularProgress /> : 'Logar'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
