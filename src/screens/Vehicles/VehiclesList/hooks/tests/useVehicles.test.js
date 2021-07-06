import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useVehicles from '../useVehicles';
import { getAllVehicles, removeVehicle } from '../../../services';
import { SnackBarContext } from '../../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../../contexts/authentication';
import mockedVehicles from '../../tests/mockedVehicles';
import vehicleParser from '../../vehicleParser';

jest.mock('../../../services');

describe('useVehicles', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('getAllVehicles handling', () => {
    it('should handle the getAllVehicles correctly after the hook first useEffect', async () => {
      getAllVehicles.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
  
      const { result, waitForNextUpdate } = renderHook(() => useVehicles(), { wrapper });
      await waitForNextUpdate();
      expect(result.current.vehicles).toEqual(vehicleParser(mockedVehicles));
    });
    
    it('should update isLoading to true at the start of the getAllVehicles and to false after that',
      async () => {
        getAllVehicles.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
  
        const { result, waitForNextUpdate } = renderHook(() => useVehicles(), { wrapper });
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the getAllVehicles returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getAllVehicles.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() => useVehicles(), { wrapper });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao carregar veículos!',
        customSeverity: 'error',
      });
    });
  });

  describe('removeVehicle handling', () => {
    it('should remove one remove of the state correctly', async () => {
      const mockedVehicleRemoved = { id: 3 };
      getAllVehicles.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
      removeVehicle.mockImplementationOnce(() => Promise.resolve(mockedVehicleRemoved));

      const { result, waitForNextUpdate } = renderHook(() => useVehicles(), { wrapper });
      await waitForNextUpdate();
      result.current.deleteVehicle(mockedVehicleRemoved.id)();
      await waitForNextUpdate();
      const removedVehicle = result.current.vehicles.find((vehicle) => vehicle.id === 3);
      expect(removedVehicle).toBeUndefined();
    });

    it('should call the addAlert function when the removeVehicle returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getAllVehicles.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
      removeVehicle.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));

      const { result, waitForNextUpdate, waitFor } = renderHook(() => useVehicles(), { wrapper });
      await waitForNextUpdate();
      result.current.deleteVehicle(2)();
      await waitFor(() => expect(mockedSnackbarValue.addAlert).toHaveBeenCalled());
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao excluir veículo!',
        customSeverity: 'error',
      });
    });
  });
});
