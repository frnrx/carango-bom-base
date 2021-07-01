import React, { useMemo } from 'react';

import useAuth from '../hooks/useAuth';

export const AuthenticationContext = React.createContext({});

const AuthenticationProvider = ({ children }) => {
  const authState = useAuth();
  const value = useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      isLoading: authState.isLoading,
      login: authState.login,
      logout: authState.logout,
    }),
    [authState],
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
