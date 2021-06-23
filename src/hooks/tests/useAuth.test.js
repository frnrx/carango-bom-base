import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from "../useAuth";

describe('updateAuth', () => {
  it('should update the isLoggedIn state value correctly', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBeFalsy();

    act(() => {
      result.current.updateAuth(true);
    });
    expect(result.current.isLoggedIn).toBeTruthy();
  });
});
