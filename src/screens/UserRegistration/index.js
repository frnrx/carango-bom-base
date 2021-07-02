import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid, CircularProgress, Typography } from '@material-ui/core';

import useErrors from '../../hooks/useErrors';
import { SnackBarContext } from '../../contexts/snackbar';

import { userRegistrationService } from './services';
import { useStyles } from './styles';
import validations from './validations';

const UserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const { addAlert } = useContext(SnackBarContext);

  const [errors, validateFields, isFormValid] = useErrors(validations);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await userRegistrationService(email, password)
      .catch(() => {
        addAlert({ content: 'Não foi possível criar o usuário', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleValidatePasswordConfirmation = (event) =>
    validateFields({
      target: { name: 'passwordConfirmation', value: event.target.value === password },
    });

  return (
    <Grid container align="center" direction="column">
      <Typography align="center" variant="h5" gutterBottom component="h2">
        Cadastro de usuário
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2} alignContent="center">
          <Grid container item xs={8}>
            <TextField
              fullWidth
              id="newEmail"
              label="E-mail"
              type="email"
              name="newEmail"
              role="textbox"
              onChange={handleUpdateEmail}
              variant="outlined"
              onBlur={validateFields}
              helperText={errors.newEmail.text}
              error={errors.newEmail.showError}
            />
          </Grid>
          <Grid container item xs={8}>
            <TextField
              fullWidth
              id="newPassword"
              label="Senha"
              type="password"
              name="newPassword"
              role="textbox"
              onChange={handleUpdatePassword}
              variant="outlined"
              onBlur={validateFields}
              helperText={errors.newPassword.text}
              error={errors.newPassword.showError}
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
              variant="outlined"
              onBlur={handleValidatePasswordConfirmation}
              helperText={errors.passwordConfirmation.text}
              error={errors.passwordConfirmation.showError}
            />
          </Grid>
          <Grid item container justify="space-between" xs={8}>
            <Grid item className={classes.buttonContainer}>
              <Button
                to="/usuarios"
                component={Link}
                fullWidth
                variant="contained"
                className={classes.button}
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
