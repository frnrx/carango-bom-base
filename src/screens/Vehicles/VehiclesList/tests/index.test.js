import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehiclesList from '..';
import VehicleService from '../../services';
import mockedVehicles from './mockedVehicles';
import Authentication from '../../../../contexts/authentication';

jest.mock('../../services');

describe('<VehiclesList />', () => {
  describe('rendering', () => {
    it('should render the VehiclesList component correctly', async () => {
      const mockedState = {
        isLoggedIn: true,
      };
      VehicleService.getAll.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
      render(
        <Authentication.Provider value={mockedState}>
          <MemoryRouter>
            <VehiclesList />
          </MemoryRouter>
        </Authentication.Provider>,
      );
      await waitFor(() =>
        expect(screen.getAllByRole('row')).toHaveLength(6),
        expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument(),
        expect(screen.getByRole('button', { name: 'Alterar' })).toBeInTheDocument(),
        expect(screen.getByRole('button', { name: 'Incluir' })).toBeInTheDocument(),
        expect(screen.getByText('Lista de veículos')).toBeInTheDocument(),
      );
    });

    it('should not render the buttons if the user is not logged in', async () => {
      const mockedState = {
        isLoggedIn: false,
      };
      VehicleService.getAll.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
      render(
        <Authentication.Provider value={mockedState}>
          <MemoryRouter>
            <VehiclesList />
          </MemoryRouter>
        </Authentication.Provider>,
      );

      await waitFor(
        () => expect(screen.queryAllByText('Excluir')).toHaveLength(0),
        expect(screen.queryAllByText('Alterar')).toHaveLength(0),
        expect(screen.queryAllByText('Incluir')).toHaveLength(0),
      );
    });
  });

  describe('button enabling', () => {
    it('should enable the buttons after a row is clicked', async () => {
      const mockedState = {
        isLoggedIn: true,
      };
      VehicleService.getAll.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
      render(
        <Authentication.Provider value={mockedState}>
          <MemoryRouter>
            <VehiclesList />
          </MemoryRouter>
        </Authentication.Provider>,
      );

      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Excluir' })).toBeDisabled(),
        expect(
          screen.getByRole('button', { name: 'Alterar' }).attributes.getNamedItem('aria-disabled'),
        ).toBeTruthy(),
      );

      const firstVehicleRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstVehicleRow);

      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Excluir' })).toBeEnabled(),
        expect(
          screen.getByRole('button', { name: 'Alterar' })
        ).toHaveAttribute('aria-disabled', 'false'),
      );
    });
  });

  describe('button functioning', () => {
    it('should enable the buttons after a row is clicked', async () => {
      const mockedState = {
        isLoggedIn: true,
      };
      VehicleService.getAll.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
      VehicleService.delete.mockImplementation(() => {});
      render(
        <Authentication.Provider value={mockedState}>
          <MemoryRouter>
            <VehiclesList />
          </MemoryRouter>
        </Authentication.Provider>,
      );

      await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(6));

      const firstVehicleRow = screen.getAllByRole('row')[1];
      const deleteButton = screen.getByRole('button', { name: 'Excluir' });
      fireEvent.click(firstVehicleRow);
      fireEvent.click(deleteButton);

      await waitFor(() => expect(VehicleService.delete).toHaveBeenCalled());
    });
  });
});
