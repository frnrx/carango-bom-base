import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehiclesList from '..';
import mockedVehicles from './mockedVehicles';
import { AuthenticationContext } from '../../../../contexts/authentication';
import useVehicles from '../hooks/useVehicles';
import vehicleParser from '../vehicleParser';

jest.mock('../hooks/useVehicles');

describe('<VehiclesList />', () => {
  afterEach(cleanup);
  beforeEach(() => {
    const mockedState = { isLoggedIn: true };
    const mockedDeleteVehicle = jest.fn();
    useVehicles.mockReturnValue({
      vehicles: vehicleParser(mockedVehicles),
      isLoading: false,
      deleteVehicle: mockedDeleteVehicle
    });
    render(
      <AuthenticationContext.Provider value={mockedState}>
        <MemoryRouter>
          <VehiclesList />
        </MemoryRouter>
      </AuthenticationContext.Provider>,
    );
  });

  describe('rendering', () => {
    it('should render the VehiclesList component correctly', () => {
      expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Alterar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Incluir' })).toBeInTheDocument();
      expect(screen.getByText('Lista de veículos')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(6);
    });

    it('should not render the buttons if the user is not logged in', async () => {
      cleanup();
      const mockedState = { isLoggedIn: false };
      const mockedDeleteVehicle = jest.fn();
      useVehicles.mockReturnValue({
        vehicles: vehicleParser(mockedVehicles),
        isLoading: false,
        deleteVehicle: mockedDeleteVehicle
      });
      render(
        <AuthenticationContext.Provider value={mockedState}>
          <MemoryRouter>
            <VehiclesList />
          </MemoryRouter>
        </AuthenticationContext.Provider>,
      );

      expect(screen.queryAllByText('Excluir')).toHaveLength(0);
      expect(screen.queryAllByText('Alterar')).toHaveLength(0);
      expect(screen.queryAllByText('Incluir')).toHaveLength(0);
    });
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
