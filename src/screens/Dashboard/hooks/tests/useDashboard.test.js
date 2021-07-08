import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useDashboard from '../useDashboard';
import { getDashboard } from '../../services';
import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import dashboardParser from '../dashboardParser';

jest.mock('../../services');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockedDashboard = [
  {
    nomeMarca: 'Fake brand 1',
    qtdeVeiculos: 6,
    valorTotalVeiculos: 80000,
  },
  {
    nomeMarca: 'Fake brand 2',
    qtdeVeiculos: 3,
    valorTotalVeiculos: 55000,
  }
];

describe('useDashboard', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
  );

  describe('getDashboard handling', () => {
    it('should handle the getDashboard correctly after the hook first useEffect', async () => {
      getDashboard.mockImplementationOnce(() => Promise.resolve(mockedDashboard));
  
      const { result, waitForNextUpdate } = renderHook(() => useDashboard(), { wrapper });
      await waitForNextUpdate();
      expect(result.current.dashboardInfo).toEqual(dashboardParser(mockedDashboard));
    });
    
    it('should update isLoading to true at the start of getDashboard and to false after that',
      async () => {
        getDashboard.mockImplementationOnce(() => Promise.resolve(mockedDashboard));
  
        const { result, waitForNextUpdate } = renderHook(() => useDashboard(), { wrapper });
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  
    it('should call the addAlert function when the getDashboard returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getDashboard.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));
  
      const { waitForNextUpdate } = renderHook(() => useDashboard(), { wrapper });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao carregar informações do dashboard!',
        customSeverity: 'error',
      });
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
