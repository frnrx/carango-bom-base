import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useUsers from '../useUsers';
import { SnackBarContext } from '../../../../../contexts/snackbar';
import { getAllUsers } from '../../services';

import mockedUsers from '../../tests/mockedUsers';

jest.mock('../../services');

describe('useUsers', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>{children}</SnackBarContext.Provider>
  );
  describe('getAllUsers handling', () => {
    it('should handle the getAllUsers correctly after the hook first useEffect', async () => {
      getAllUsers.mockImplementationOnce(() => Promise.resolve(mockedUsers));

      const { result, waitForNextUpdate } = renderHook(() => useUsers(), { wrapper });
      await waitForNextUpdate();
      expect(result.current.users).toEqual(mockedUsers);
    });

    it('should update isLoading properly', async () => {
      getAllUsers.mockImplementationOnce(() => Promise.resolve(mockedUsers));

      const { result, waitForNextUpdate } = renderHook(() => useUsers(), { wrapper });
      expect(result.current.isLoading).toBeTruthy();
      await waitForNextUpdate();
      expect(result.current.isLoading).toBeFalsy();
    });

    it('should call the addAlert function when the getAllUsers returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getAllUsers.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));

      const { waitForNextUpdate } = renderHook(() => useUsers(), { wrapper });
      await waitForNextUpdate();
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao carregar usuários!',
        customSeverity: 'error',
      });
    });
  });
});
