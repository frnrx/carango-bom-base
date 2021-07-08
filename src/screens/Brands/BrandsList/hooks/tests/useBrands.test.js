import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useBrands from '../useBrands';
import { getAllBrands, removeBrand } from '../../../services';
import { SnackBarContext } from '../../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../../contexts/authentication';

jest.mock('../../../services');

const mockedBrands = [
  { id: 1, nome: 'FIAT' },
  { id: 2, nome: 'FORD' },
  { id: 3, nome: 'BMW' },
];

describe('useBrands', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('getAllBrands handling', () => {
    it('should handle the getAllBrands correctly after the hook first useEffect', async () => {
      getAllBrands.mockImplementationOnce(() => Promise.resolve(mockedBrands));
  
      const { result, waitForNextUpdate } = renderHook(() => useBrands(), { wrapper });
      await waitForNextUpdate();
      expect(result.current.brands).toEqual(mockedBrands);
    });
    
    it('should update isLoading to true at the start of the getAllBrands and to false after that',
      async () => {
        getAllBrands.mockImplementationOnce(() => Promise.resolve(mockedBrands));
  
        const { result, waitForNextUpdate } = renderHook(() => useBrands(), { wrapper });
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the getAllBrands returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getAllBrands.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() => useBrands(), { wrapper });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao carregar marcas!',
        customSeverity: 'error',
      });
    });
  });

  describe('removeBrand handling', () => {
    it('should remove one remove of the state correctly', async () => {
      const mockedBrandRemoved = { id: 2 };
      getAllBrands.mockImplementationOnce(() => Promise.resolve(mockedBrands));
      removeBrand.mockImplementationOnce(() => Promise.resolve(mockedBrandRemoved));

      const { result, waitForNextUpdate } = renderHook(() => useBrands(), { wrapper });
      await waitForNextUpdate();
      result.current.deleteBrand(mockedBrandRemoved.id)();
      await waitForNextUpdate();
      const removedBrand = result.current.brands.find((brand) => brand.id === 2);
      expect(removedBrand).toBeUndefined();
    });

   it('should call the addAlert function when the removeBrand returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getAllBrands.mockImplementationOnce(() => Promise.resolve(mockedBrands));
      removeBrand.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));

     const { result, waitForNextUpdate, waitFor } = renderHook(() => useBrands(), { wrapper });
      await waitForNextUpdate();
      result.current.deleteBrand(2)();
      await waitFor(() => expect(mockedSnackbarValue.addAlert).toHaveBeenCalled());
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao excluir marca!',
        customSeverity: 'error',
      });
    });
  });
});
