import { useState } from 'react';

import { loginService } from '../screens/Login/services';

// this hook should only be used once on the Authentication context creation
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [userJWT, setUserJWT] = useState(localStorage.getItem('userJWT') || undefined);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    loginService(email, password)
      .then((data) => {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userJWT', data.token);
        setIsLoggedIn(true);
        setUserJWT(data.token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userJWT');
    setIsLoggedIn(false);
    setUserJWT(undefined);
  };

  return { isLoggedIn, userJWT, login, logout, isLoading };
};

export default useAuth;
