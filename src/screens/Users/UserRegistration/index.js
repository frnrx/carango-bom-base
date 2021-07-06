import React, { useState } from 'react';
import { TextField, Grid, CircularProgress, Typography } from '@material-ui/core';

import useErrors from '../../../hooks/useErrors';
import FormButton from '../../../components/FormButton';

import validations from './validations';
import useUserRegistration from './hooks/useUserRegistration';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, register } = useUserRegistration();

  const [errors, validateFields, isFormValid] = useErrors(validations);

  const onSubmit = (event) => {
    event.preventDefault();

    register(name, email, password);
  };

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value);
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
              id="name"
              label="Nome"
              type="name"
              name="name"
              role="textbox"
              onChange={handleUpdateName}
              variant="outlined"
              onBlur={validateFields}
              helperText={errors.name.text}
              error={errors.name.showError}
            />
          </Grid>
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
            <FormButton to="/usuarios" isLink>
              Cancelar
            </FormButton>
            <FormButton color="primary" type="submit" disabled={!isFormValid()}>
              {isLoading ? <CircularProgress /> : 'Cadastrar'}
            </FormButton>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default UserRegistration;
