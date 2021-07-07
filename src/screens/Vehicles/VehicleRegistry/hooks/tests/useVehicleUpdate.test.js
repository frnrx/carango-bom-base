import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useVehicleUpdate from '../useVehicleUpdate';
import { updateVehicle } from '../../../services';
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

describe('useVehicleUpdate', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('updateVehicle handling', () => {
    it('should redirect user to / and call addAlert after the vehicle is updated correctly',
      async () => {
        updateVehicle.mockImplementationOnce(() => Promise.resolve());

        const { result, waitForNextUpdate } = renderHook(() => useVehicleUpdate(), { wrapper });
        act(() => {
          result.current.update();
        });
        await waitForNextUpdate();
        expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
          content: 'Veículo atualizado corretamente!',
          customSeverity: 'success',
        });
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
      }
    );
    
    it('should set isLoading to true at the start of the updateVehicle and to false after that',
      async () => {
        updateVehicle.mockImplementationOnce(() => Promise.resolve());
  
        const { result, waitForNextUpdate } = renderHook(() => useVehicleUpdate(), { wrapper });
        act(() => {
          result.current.update();
        });
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the updateVehicle returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      updateVehicle.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { result, waitForNextUpdate } = renderHook(() => useVehicleUpdate(), { wrapper });
      act(() => {
        result.current.update();
      });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao atualizar veículo!',
        customSeverity: 'error',
      });
    });
  });
});
