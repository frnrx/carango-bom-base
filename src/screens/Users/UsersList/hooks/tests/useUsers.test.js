import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { SnackBarContext } from '../../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../../contexts/authentication';
import { getAllUsers, removeUser } from '../../services';
import useUsers from '../useUsers';

import mockedUsers from '../../tests/mockedUsers';

jest.mock('../../services');

describe('useUsers', () => {
  const mockedSnackbarValue = { addAlert: jest.fn() };
  const mockedAuthValue = { userJWT: 'fakeuserjwt' };

  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedSnackbarValue}>
      {' '}
      <AuthenticationContext.Provider value={mockedAuthValue}>
        {children}
      </AuthenticationContext.Provider>
    </SnackBarContext.Provider>
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

  describe('removeUser handling', () => {
    it('should remove one remove of the state correctly', async () => {
      const mockedUserRemoved = { id: 3 };
      getAllUsers.mockImplementationOnce(() => Promise.resolve(mockedUsers));
      removeUser.mockImplementationOnce(() => Promise.resolve(mockedUserRemoved));

      const { result, waitForNextUpdate } = renderHook(() => useUsers(), { wrapper });
      await waitForNextUpdate();
      result.current.deleteUser(mockedUserRemoved.id)();
      await waitForNextUpdate();
      const removedUser = result.current.users.find((user) => user.id === 3);
      expect(removedUser).toBeUndefined();
    });

    it('should call the addAlert function when the removeUser returns an error', async () => {
      const mockedServiceReturn = { error: 'error' };
      getAllUsers.mockImplementationOnce(() => Promise.resolve(mockedUsers));
      removeUser.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));

      const { result, waitForNextUpdate, waitFor } = renderHook(() => useUsers(), { wrapper });
      await waitForNextUpdate();
      result.current.deleteUser(2)();
      await waitFor(() => expect(mockedSnackbarValue.addAlert).toHaveBeenCalled());
      expect(mockedSnackbarValue.addAlert).toHaveBeenCalledWith({
        content: 'Erro inesperado ao excluir usuário!',
        customSeverity: 'error',
      });
    });
  });
});
