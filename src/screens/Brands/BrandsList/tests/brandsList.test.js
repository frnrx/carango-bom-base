import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthenticationContext } from '../../../../contexts/authentication';
import useBrands from '../hooks/useBrands';

import BrandsList from '..';

jest.mock('../hooks/useBrands');

const mockedBrands = [
  { id: 1, nome: 'FIAT' },
  { id: 2, nome: 'FORD' },
  { id: 3, nome: 'BMW' },
];

describe('BrandsList component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    const mockedState = { isLoggedIn: true };
    const mockedDeleteBrand = jest.fn();
    useBrands.mockReturnValue({
      brands: mockedBrands,
      isLoading: false,
      deleteBrand: mockedDeleteBrand
    });
    render(
      <AuthenticationContext.Provider value={mockedState}>
        <MemoryRouter>
          <BrandsList />
        </MemoryRouter>
      </AuthenticationContext.Provider>,
    );
  });

  it('should render the BrandsList component correctly', () => {
    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Alterar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Incluir' })).toBeInTheDocument();
    expect(screen.getByText('Lista de marcas')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4);
  });

  it('should not render the buttons if the user is not logged in', async () => {
    cleanup();
    const mockedState = { isLoggedIn: false };
    const mockedDeleteBrand = jest.fn();
    useBrands.mockReturnValue({
      brands: mockedBrands,
      isLoading: false,
      deleteBrand: mockedDeleteBrand
    });
    render(
      <AuthenticationContext.Provider value={mockedState}>
        <MemoryRouter>
          <BrandsList />
        </MemoryRouter>
      </AuthenticationContext.Provider>,
    );

    expect(screen.queryAllByText('Excluir')).toHaveLength(0);
    expect(screen.queryAllByText('Alterar')).toHaveLength(0);
    expect(screen.queryAllByText('Incluir')).toHaveLength(0);
  });

  describe('button enabling', () => {
    it('should enable the buttons after a row is clicked', () => {
      expect(screen.getByRole('button', { name: 'Excluir' })).toBeDisabled();
      expect(
        screen.getByRole('button', { name: 'Alterar' }).attributes.getNamedItem('aria-disabled'),
      ).toBeTruthy();
      
      const firstVehicleRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstVehicleRow);

      expect(screen.getByRole('button', { name: 'Excluir' })).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Alterar' }))
        .toHaveAttribute('aria-disabled', 'false');
    });
  });
});
