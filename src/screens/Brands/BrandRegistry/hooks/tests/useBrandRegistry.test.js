import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useBrandRegistry from '../useBrandRegistry';
import { registerBrand } from '../../../services';
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

describe('useBrandRegistry', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('registerBrand handling', () => {
    it('should redirect user to /usuarios and call addAlert after the brand is registered',
      async () => {
        registerBrand.mockImplementationOnce(() => Promise.resolve());

        const { result, waitForNextUpdate } = renderHook(() => useBrandRegistry(), { wrapper });
        act(() => {
          result.current.register();
        });
        await waitForNextUpdate();
        expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
          content: 'Marca cadastrada corretamente!',
          customSeverity: 'success',
        });
        expect(mockHistoryPush).toHaveBeenCalledWith('/usuarios');
      }
    );
    
    it('should set isLoading to true at the start of the registerBrand and to false after that',
      async () => {
        registerBrand.mockImplementationOnce(() => Promise.resolve());
  
        const { result, waitForNextUpdate } = renderHook(() => useBrandRegistry(), { wrapper });
        act(() => {
          result.current.register();
        });
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the registerBrand returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      registerBrand.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { result, waitForNextUpdate } = renderHook(() => useBrandRegistry(), { wrapper });
      act(() => {
        result.current.register();
      });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao cadastrar marca!',
        customSeverity: 'error',
      });
    });
  });
});
