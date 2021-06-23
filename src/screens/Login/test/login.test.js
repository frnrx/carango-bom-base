import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';

import Login from '..';
import { login } from '../services';

jest.mock('../services');

describe('Login screen', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Login />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Login form', () => {
  let usernameInput;
  let passwordInput;
  let submitButton;

  beforeEach(() => {
    render(<Login />);

    usernameInput = screen.getByRole('textbox', { name: /Usuário/i });
    passwordInput = screen.getByLabelText(/Senha/i);
    submitButton = screen.getByRole('button', { name: /Logar/i });
  });

  it('should render the login form', () => {
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should send the data correctly when a user presses submit', () => {
    fireEvent.change(usernameInput, {
      target: {
        value: 'johndoe',
      },
    });

    fireEvent.focusOut(usernameInput);

    fireEvent.change(passwordInput, {
      target: {
        value: '123456',
      },
    });

    fireEvent.focusOut(passwordInput);

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(login).toHaveBeenCalledWith('johndoe', '123456');
  });

  it('should only enable the submit button when all fields are filled', () => {
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(usernameInput, {
      target: {
        value: 'johndoe',
      },
    });

    fireEvent.focusOut(usernameInput);

    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(passwordInput, {
      target: {
        value: '123456789',
      },
    });

    fireEvent.focusOut(passwordInput);

    expect(submitButton).not.toBeDisabled();
  });

  it('should keep the button disabled when the username don`t meet the requirements', () => {
    fireEvent.change(usernameInput, {
      target: {
        value: 'joe',
      },
    });

    fireEvent.focusOut(usernameInput);

    const errorText = screen.getByText('Usuário deve ter ao menos 4 caracteres.');

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
});
