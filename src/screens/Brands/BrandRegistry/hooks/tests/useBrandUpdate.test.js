import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useBrandUpdate from '../useBrandUpdate';
import { updateBrand, getBrand } from '../../../services';
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

describe('useBrandUpdate', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('updateBrand handling', () => {
    it('should redirect user to /marcas and call addAlert after the brand is updated correctly',
      async () => {
        updateBrand.mockImplementationOnce(() => Promise.resolve());

        const { result, waitForNextUpdate } = renderHook(() => useBrandUpdate(), { wrapper });
        act(() => {
          result.current.update();
        });
        await waitForNextUpdate();
        expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
          content: 'Marca atualizada corretamente!',
          customSeverity: 'success',
        });
        expect(mockHistoryPush).toHaveBeenCalledWith('/marcas');
      }
    );
    
    it('should set isUpdateLoading to true at start of the updateBrand and to false after that',
      async () => {
        updateBrand.mockImplementationOnce(() => Promise.resolve());
  
        const { result, waitForNextUpdate } = renderHook(() => useBrandUpdate(), { wrapper });
        act(() => {
          result.current.update();
        });
        expect(result.current.isUpdateLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isUpdateLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the updateBrand returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      updateBrand.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { result, waitForNextUpdate } = renderHook(() => useBrandUpdate(), { wrapper });
      act(() => {
        result.current.update();
      });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao atualizar marca!',
        customSeverity: 'error',
      });
    });
  });

  describe('getBrand handling', () => {
    it('should not call the getBrand service when the brandId is undefined', () => {
      getBrand.mockImplementationOnce(() => jest.fn());
  
      renderHook(() => useBrandUpdate(), { wrapper });
      expect(getBrand).not.toHaveBeenCalled();
    });

    it('should redirect to /marcas & call addAlert when getBrand returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getBrand.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() => useBrandUpdate(2), { wrapper });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao carregar informações da marca!',
        customSeverity: 'error',
      });
      expect(mockHistoryPush).toHaveBeenCalledWith('/marcas');
    });

    it('should set isGetLoading to true at start of the getBrand and to false after that',
      async () => {
        const mockedServiceReturn = { error: 'error' };
        getBrand.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
        const { result, waitForNextUpdate } = renderHook(() => useBrandUpdate(2), { wrapper });
        expect(result.current.isGetLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isGetLoading).toBeFalsy();
      }
    );

    it('should call setBrand correctly after the return of getBrand', async () => {
      const mockedBrandId = 3;
      const mockedServiceReturn = { 
        id: mockedBrandId,
        nome: 'Fake brand',
      };
      const mockedSetBrand = jest.fn();
      getBrand.mockImplementationOnce(() => Promise.resolve(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() =>
        useBrandUpdate(mockedBrandId, mockedSetBrand), { wrapper }
      );
      await waitForNextUpdate();
      expect(mockedSetBrand).toHaveBeenCalledWith(mockedServiceReturn.nome);
    });
  });
});