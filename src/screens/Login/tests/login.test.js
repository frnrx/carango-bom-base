import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import Login from '..';

import Authentication from '../../../contexts/authentication';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Login screen', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Login />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Login form', () => {
  let emailInput;
  let passwordInput;
  let submitButton;
  let goBackButton;

  beforeEach(() => {
    render(<Login />);

    emailInput = screen.getByRole('textbox', { name: /E-mail/i });
    passwordInput = screen.getByLabelText(/Senha/i);
    submitButton = screen.getByRole('button', { name: /Logar/i });
    goBackButton = screen.getByRole('button', { name: /Voltar/i });
  });

  it('should render the login form', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should send the data correctly when a user presses submit', () => {
    cleanup();

    const mockedState = {
      isLoggedIn: false,
      login: jest.fn(),
    };

    const { getByRole, getByLabelText } = render(
      <Authentication.Provider value={mockedState}>
        <Login />
      </Authentication.Provider>,
    );

    const emailInputWithContext = getByRole('textbox', { name: /E-mail/i });
    const passwordInputWithContext = getByLabelText(/Senha/i);
    const submitButtonWithContext = getByRole('button', { name: /Logar/i });

    fireEvent.change(emailInputWithContext, {
      target: {
        value: 'johndoe@doe.com',
      },
    });

    fireEvent.focusOut(emailInputWithContext);

    fireEvent.change(passwordInputWithContext, {
      target: {
        value: '123456',
      },
    });

    fireEvent.focusOut(passwordInputWithContext);

    expect(submitButtonWithContext).not.toBeDisabled();

    fireEvent.click(submitButtonWithContext);

    expect(mockedState.login).toHaveBeenCalledWith('johndoe@doe.com', '123456');
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

    const errorText = screen.getByText('Senha deve ter ao menos 6 caracteres.');

    expect(errorText).toBeInTheDocument();

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should should go to home if the user presses Voltar', () => {
    fireEvent.click(goBackButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});

describe('login authorization provider usage', () => {
  it('should redirect the user to the home if they are already logged', () => {
    const mockedState = {
      isLoggedIn: true,
    };
    render(
      <Authentication.Provider value={mockedState}>
        <Login />
      </Authentication.Provider>,
    );

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  it('should not redirect the user to the home if they are not logged', () => {
    const mockedState = {
      isLoggedIn: false,
    };
    render(
      <Authentication.Provider value={mockedState}>
        <Login />
      </Authentication.Provider>,
    );

    expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
  });

  it('should find the loading component if the login is still loading', () => {
    const mockedState = {
      isLoggedIn: false,
      isLoading: true,
    };
    render(
      <Authentication.Provider value={mockedState}>
        <Login />
      </Authentication.Provider>,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
