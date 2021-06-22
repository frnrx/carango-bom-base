import { render, screen, fireEvent } from '@testing-library/react';

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

    fireEvent.change(passwordInput, {
      target: {
        value: '1234',
      },
    });

    fireEvent.click(submitButton);

    expect(login).toHaveBeenCalledWith('johndoe', '1234');
  });

  it('should only enable the submit button when all fields are filled', () => {
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(usernameInput, {
      target: {
        value: 'johndoe',
      },
    });

    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.change(passwordInput, {
      target: {
        value: '1234',
      },
    });

    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
