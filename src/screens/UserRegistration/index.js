import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Grid, CircularProgress, Typography } from '@material-ui/core';

import useErrors from '../../hooks/useErrors';

import { userRegistrationService } from './services';
import { useStyles } from './styles';
import validations from './validations';

const UserRegistration = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const [errors, validateFields, isFormValid] = useErrors(validations);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await userRegistrationService(email, password);

    setIsLoading(false);
  };

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdatePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value === password);
  };

  return (
    <Grid container align="center" direction="column">
      <Typography align="center" variant="h5" gutterBottom>
        Cadastro de usuário
      </Typography>
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
          <Grid container item xs={8}>
            <TextField
              fullWidth
              id="passwordConfirmation"
              label="Confirmação da senha"
              type="password"
              name="passwordConfirmation"
              role="textbox"
              onChange={handleUpdatePasswordConfirmation}
              variant="outlined"
              onBlur={() =>
                validateFields({
                  target: { name: 'passwordConfirmation', value: passwordConfirmation },
                })
              }
              helperText={errors.passwordConfirmation.text}
              error={errors.passwordConfirmation.showError}
            />
          </Grid>
          <Grid item container justify="space-between" xs={8}>
            <Grid item className={classes.buttonContainer}>
              <Button
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={() => history.push('/usuarios')}
              >
                Cancelar
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
                {isLoading ? <CircularProgress /> : 'Cadastrar'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default UserRegistration;
