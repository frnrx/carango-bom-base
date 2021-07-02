import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehicleRegistry from '..';

import { AuthenticationContext } from '../../../../contexts/authentication';
import useBrands from '../hooks/useBrands';
import brandsParser from '../brandsParser';
import mockedBrands from '../hooks/tests/mockedBrands';

jest.mock('../hooks/useBrands');

const mockHistoryPush = jest.fn();
let mockedLocationPathname = '/cadastro-veiculo';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    pathname: mockedLocationPathname,
  })
}));

describe('Create/update vehicle form', () => {
  let brandInput;
  let modelInput;
  let yearInput;
  let valueInput;
  let cancelLink;

  beforeEach(() => {
    useBrands.mockReturnValue({
      brands: brandsParser(mockedBrands),
    });
    const mockedState = {
      isLoggedIn: true,
    };
    render(
      <MemoryRouter>
        <AuthenticationContext.Provider value={mockedState}>
          <VehicleRegistry />
        </AuthenticationContext.Provider>
      </MemoryRouter>,
    );

    brandInput = screen.getByRole('combobox', { name: 'Marca' });
    modelInput = screen.getByRole('textbox', { name: 'Modelo' });
    yearInput = screen.getByRole('spinbutton', { name: 'Ano' });
    valueInput = screen.getByRole('spinbutton', { name: 'Preço' });
    cancelLink = screen.getByRole('link', { name: "Cancelar" });
  });

  describe('render', () => {
    it('should render the form correctly', () => {
      expect(brandInput).toBeInTheDocument();
      expect(modelInput).toBeInTheDocument();
      expect(yearInput).toBeInTheDocument();
      expect(valueInput).toBeInTheDocument();
      expect(cancelLink).toBeInTheDocument();
    });

    it('should render the registry button and heading when the registry route is used', () => {
      const registryHeading = screen.getByText('Cadastro de veículos');
      const registryButton = screen.getByRole('button', { name: "Cadastrar" })
      expect(registryButton).toBeInTheDocument();
      expect(registryHeading).toBeInTheDocument();
    });

    it('should render the update button and heading when the update route is used', () => {
      cleanup();
      mockedLocationPathname = '/alteracao-veiculo';
      render(
        <MemoryRouter>
          <VehicleRegistry />
        </MemoryRouter>
      );
      const updateHeading = screen.getByText('Alteração de veículos');
      const updateButton = screen.getByRole('button', { name: "Alterar" })
      expect(updateButton).toBeInTheDocument();
      expect(updateHeading).toBeInTheDocument();
    });

    it('should render the select options correctly based on the useBrands return', () => {
      fireEvent.click(brandInput);
      const renderedOptions = screen.getAllByRole("option");
      expect(renderedOptions).toHaveLength(mockedBrands.length);
    });
  });

  // it('should send the data correctly when a user presses submit', () => {
  //   cleanup();

  //   const mockedState = {
  //     isLoggedIn: false,
  //     login: jest.fn(),
  //   };

  //   const { getByRole, getByLabelText } = render(
  //     <AuthenticationContext.Provider value={mockedState}>
  //       <Login />
  //     </AuthenticationContext.Provider>,
  //   );

  //   const emailInputWithContext = getByRole('textbox', { name: /E-mail/i });
  //   const passwordInputWithContext = getByLabelText(/Senha/i);
  //   const submitButtonWithContext = getByRole('button', { name: /Logar/i });

  //   fireEvent.change(emailInputWithContext, {
  //     target: {
  //       value: 'johndoe@doe.com',
  //     },
  //   });

  //   fireEvent.focusOut(emailInputWithContext);

  //   fireEvent.change(passwordInputWithContext, {
  //     target: {
  //       value: '123456',
  //     },
  //   });

  //   fireEvent.focusOut(passwordInputWithContext);

  //   expect(submitButtonWithContext).not.toBeDisabled();

  //   fireEvent.click(submitButtonWithContext);

  //   expect(mockedState.login).toHaveBeenCalledWith('johndoe@doe.com', '123456');
  // });

  // it('should only enable the submit button when all fields are filled', () => {
  //   expect(submitButton).toHaveAttribute('disabled');

  //   fireEvent.change(emailInput, {
  //     target: {
  //       value: 'johndoe@joe.com',
  //     },
  //   });

  //   fireEvent.focusOut(emailInput);

  //   expect(submitButton).toHaveAttribute('disabled');

  //   fireEvent.change(passwordInput, {
  //     target: {
  //       value: '123456789',
  //     },
  //   });

  //   fireEvent.focusOut(passwordInput);

  //   expect(submitButton).not.toBeDisabled();
  // });

  // it('should keep the button disabled when the email don`t meet the requirements', () => {
  //   fireEvent.change(emailInput, {
  //     target: {
  //       value: 'joe',
  //     },
  //   });

  //   fireEvent.focusOut(emailInput);

  //   const errorText = screen.getByText('E-mail inválido.');

  //   expect(errorText).toBeInTheDocument();

  //   expect(submitButton).toHaveAttribute('disabled');
  // });

  // it('should keep the button disabled when the password don`t meet the requirements', () => {
  //   fireEvent.change(passwordInput, {
  //     target: {
  //       value: '123',
  //     },
  //   });

  //   fireEvent.focusOut(passwordInput);

  //   const errorText = screen.getByText('Senha deve ter ao menos 6 caracteres.');

  //   expect(errorText).toBeInTheDocument();

  //   expect(submitButton).toHaveAttribute('disabled');
  // });

  // it('should should go to home if the user presses Voltar', () => {
  //   fireEvent.click(goBackButton);

  //   expect(mockHistoryPush).toHaveBeenCalledWith('/');
  // });
});

describe('authorization provider usage', () => {
  it('should not redirect the user to the home if they are already logged', () => {
    useBrands.mockReturnValue({
      brands: brandsParser(mockedBrands),
    });
    const mockedState = {
      isLoggedIn: true,
    };
    render(
      <MemoryRouter>
        <AuthenticationContext.Provider value={mockedState}>
          <VehicleRegistry />
        </AuthenticationContext.Provider>
      </MemoryRouter>,
    );

    expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
  });

  it('should redirect the user to the home if they are not logged', () => {
    useBrands.mockReturnValue({
      brands: brandsParser(mockedBrands),
    });
    const mockedState = {
      isLoggedIn: false,
    };
    render(
      <MemoryRouter>
        <AuthenticationContext.Provider value={mockedState}>
          <VehicleRegistry />
        </AuthenticationContext.Provider>
      </MemoryRouter>,
    );

    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
