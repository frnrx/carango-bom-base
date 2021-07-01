import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useVehicles from '../useVehicles';
import { getAllVehicles } from '../../../services';
import { SnackBarContext } from '../../../../../contexts/snackbar';
import mockedVehicles from '../../tests/mockedVehicles';
import vehicleParser from '../../vehicleParser';

jest.mock('../../../services');

describe('useVehicles', () => {
  const mockedValue = {
    addAlert: jest.fn(),
  };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedValue}>
      {children}
    </SnackBarContext.Provider>
  );

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
    expect(mockedValue.addAlert).toHaveBeenCalledWith({
      content: 'Erro inesperado ao carregar veículos!',
      customSeverity: 'error',
    });
  });
});
