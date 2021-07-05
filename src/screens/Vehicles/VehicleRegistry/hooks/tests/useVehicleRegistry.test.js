import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useVehicleRegistry from '../useVehicleRegistry';
import { registerVehicle } from '../../../services';
import { SnackBarContext } from '../../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../../contexts/authentication';

jest.mock('../../../services');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('useVehicleRegistry', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('registerVehicle handling', () => {
    it('should redirect user to / and call addAlert after the vehicle is registered correctly',
      async () => {
        registerVehicle.mockImplementationOnce(() => Promise.resolve());

        const { result, waitForNextUpdate } = renderHook(() => useVehicleRegistry(), { wrapper });
        act(() => {
          result.current.register();
        });
        await waitForNextUpdate();
        expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
          content: 'Veículo cadastrado corretamente!',
          customSeverity: 'success',
        });
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
      }
    );
    
    it('should set isLoading to true at the start of the registerVehicle and to false after that',
      async () => {
        registerVehicle.mockImplementationOnce(() => Promise.resolve());
  
        const { result, waitForNextUpdate } = renderHook(() => useVehicleRegistry(), { wrapper });
        act(() => {
          result.current.register();
        });
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the registerVehicle returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      registerVehicle.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { result, waitForNextUpdate } = renderHook(() => useVehicleRegistry(), { wrapper });
      act(() => {
        result.current.register();
      });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao registrar veículo!',
        customSeverity: 'error',
      });
    });
  });
});
