import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import UserRegistration from '..';
import { userRegistrationService } from '../services';

const mockHistoryPush = jest.fn();

jest.mock('../services');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('UserRegistration component', () => {
  let header;
  let emailInput;
  let passwordInput;
  let passwordConfirmationInput;
  let submitButton;
  let cancelButton;
  beforeEach(() => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <UserRegistration />
      </Router>,
    );

    header = screen.getByRole('heading', { name: /Cadastro de usuário/i });
    emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    passwordInput = screen.getByLabelText('Senha');
    passwordConfirmationInput = screen.getByLabelText('Confirmação da senha');
    submitButton = screen.getByRole('button', { name: /Cadastrar/i });
    cancelButton = screen.getByRole('button', { name: /Cancelar/i });
  });

  it('should render all the components correctly', () => {
    expect(header).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmationInput).toBeInTheDocument();
    expect(passwordConfirmationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('should send the data correctly when a user presses submit', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'johndoe@doe.com',
      },
    });

    fireEvent.focusOut(emailInput);

    fireEvent.change(passwordInput, {
      target: {
        value: '123456',
      },
    });

    fireEvent.focusOut(passwordInput);

    fireEvent.change(passwordConfirmationInput, {
      target: {
        value: '123456',
      },
    });

    fireEvent.focusOut(passwordConfirmationInput);

    expect(submitButton).not.toBeDisabled();

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() =>
      expect(userRegistrationService).toHaveBeenCalledWith('johndoe@doe.com', '123456'),
    );
  });

  it('should only enable the submit button when all fields are filled', () => {
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(emailInput, {
      target: {
        value: 'johndoe@joe.com',
      },
    });

    fireEvent.focusOut(emailInput);

    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(passwordInput, {
      target: {
        value: '123456789',
      },
    });

    fireEvent.focusOut(passwordInput);

    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(passwordConfirmationInput, {
      target: {
        value: '123456789',
      },
    });

    fireEvent.focusOut(passwordConfirmationInput);

    expect(submitButton).not.toBeDisabled();
  });

  it('should keep the button disabled when the email don`t meet the requirements', () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'joe',
      },
    });

    fireEvent.focusOut(emailInput);

    const errorText = screen.getByText('E-mail inválido.');

    expect(errorText).toBeInTheDocument();

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should keep the button disabled when the password don`t meet the requirements', () => {
    fireEvent.change(passwordInput, {
      target: {
        value: '123',
      },
    });

    fireEvent.focusOut(passwordInput);

    fireEvent.change(passwordConfirmationInput, {
      target: {
        value: '123',
      },
    });

    fireEvent.focusOut(passwordInput);

    const errorText = screen.getByText('Senha deve ter ao menos 6 caracteres.');

    expect(errorText).toBeInTheDocument();

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should keep the button disabled when the passwords are not the same', () => {
    fireEvent.change(passwordInput, {
      target: {
        value: '123456',
      },
    });

    fireEvent.focusOut(passwordInput);

    fireEvent.change(passwordConfirmationInput, {
      target: {
        value: '123999',
      },
    });

    fireEvent.focusOut(passwordConfirmationInput);

    const errorText = screen.getByText('As duas senhas devem ser iguais.');

    expect(errorText).toBeInTheDocument();

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should should go to home if the user presses Voltar', () => {
    fireEvent.click(cancelButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/usuarios');
  });
});
