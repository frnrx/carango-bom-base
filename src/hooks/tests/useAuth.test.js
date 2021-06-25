import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from '../useAuth';

describe('authentication update', () => {
  it('should update the isLoggedIn state value correctly', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBeFalsy();

    act(() => {
      result.current.login();
    });
    expect(result.current.isLoggedIn).toBeTruthy();

    act(() => {
      result.current.logout();
    });
    expect(result.current.isLoggedIn).toBeFalsy();
  });
});
