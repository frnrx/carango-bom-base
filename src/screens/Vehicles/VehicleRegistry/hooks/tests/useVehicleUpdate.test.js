import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useVehicleUpdate from '../useVehicleUpdate';
import { updateVehicle, getVehicle } from '../../../services';
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
    
    it('should set isUpdateLoading to true at start of the updateVehicle and to false after that',
      async () => {
        updateVehicle.mockImplementationOnce(() => Promise.resolve());
  
        const { result, waitForNextUpdate } = renderHook(() => useVehicleUpdate(), { wrapper });
        act(() => {
          result.current.update();
        });
        expect(result.current.isUpdateLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isUpdateLoading).toBeFalsy();
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

  describe('getVehicle handling', () => {
    it('should not call the getVehicle service when the vehicleId is undefined', () => {
      getVehicle.mockImplementationOnce(() => jest.fn());
  
      renderHook(() => useVehicleUpdate(), { wrapper });
      expect(getVehicle).not.toHaveBeenCalled();
    });

    it('should call the addAlert function when the getAllVehicles returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getVehicle.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() => useVehicleUpdate(2), { wrapper });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao carregar informações do veículo!',
        customSeverity: 'error',
      });
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });

    it('should set isGetLoading to true at start of the getVehicle and to false after that',
      async () => {
        const mockedServiceReturn = { error: 'error' };
        getVehicle.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
        const { result, waitForNextUpdate } = renderHook(() => useVehicleUpdate(2), { wrapper });
        expect(result.current.isGetLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isGetLoading).toBeFalsy();
      }
    );

    it('should call all the setters correctly after the return of the endpoint', async () => {
      const mockedVehicleId = 3;
      const mockedServiceReturn = { 
        id: mockedVehicleId,
        modelo: 'fake model',
        ano: 2010,
        preco: 7000,
        marca: {
          id: 3,
          nome: 'Fiat'
        },
      };
      const mockedSetters = {
        setBrand: jest.fn(),
        setModel: jest.fn(),
        setYear: jest.fn(),
        setValue: jest.fn(),
      };
      getVehicle.mockImplementationOnce(() => Promise.resolve(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() =>
        useVehicleUpdate(mockedVehicleId, mockedSetters), { wrapper }
      );
      await waitForNextUpdate();
      expect(mockedSetters.setBrand).toHaveBeenCalledWith(mockedServiceReturn.marca);
      expect(mockedSetters.setModel).toHaveBeenCalledWith(mockedServiceReturn.modelo);
      expect(mockedSetters.setYear).toHaveBeenCalledWith(mockedServiceReturn.ano);
      expect(mockedSetters.setValue).toHaveBeenCalledWith(mockedServiceReturn.preco);
    });
  });
});
