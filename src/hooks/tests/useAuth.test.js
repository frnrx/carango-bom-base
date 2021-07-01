import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from '../useAuth';
import { loginService } from '../../screens/Login/services';
import { SnackBarContext } from '../../contexts/snackbar';

jest.mock('../../screens/Login/services');

describe('authentication update', () => {
  const mockedValue = {
    addAlert: jest.fn(),
  };
  const wrapper = ({ children }) => (
    <SnackBarContext.Provider value={mockedValue}>
      {children}
    </SnackBarContext.Provider>
  );

  it('should handle the loginService correctly when the login function is called', async () => {
    const mockedServiceReturn = { token: 'fake auth token' };
    loginService.mockImplementationOnce(() => Promise.resolve(mockedServiceReturn));

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login();
    });
    await waitForNextUpdate();
    expect(result.current.isLoggedIn).toBeTruthy();
    expect(localStorage.getItem('isLoggedIn')).toBeTruthy();
    expect(result.current.userJWT).toBe(mockedServiceReturn.token);
    expect(localStorage.getItem('userJWT')).toBe(mockedServiceReturn.token);
  });

  it('should erase isLoggedIn and userJWT values when the logout function is called', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.logout();
    });
    expect(result.current.isLoggedIn).toBeFalsy();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(result.current.userJWT).toBeUndefined();
    expect(localStorage.getItem('userJWT')).toBeNull();
  });

  it('should update isLoading to true at the start of the login and to false after that',
    async () => {
      const mockedServiceReturn = { token: 'fake auth token' };
      loginService.mockImplementationOnce(() => Promise.resolve(mockedServiceReturn));

      const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
      act(() => {
        result.current.login();
      });
      expect(result.current.isLoading).toBeTruthy();
      await waitForNextUpdate();
      expect(result.current.isLoading).toBeFalsy();
    }
  );

  it('should call the addAlert function when the login service returns an error', async () => {
    const mockedServiceReturn = { error: 'error' };
    loginService.mockImplementationOnce(() => Promise.reject(mockedServiceReturn));

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login();
    });
    await waitForNextUpdate();
    expect(mockedValue.addAlert).toHaveBeenCalledWith({
      content: 'E-mail ou senha incorretos',
      customSeverity: 'error',
    });
  });
});
