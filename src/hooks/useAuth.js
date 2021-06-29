import { useState } from 'react';

import { loginService } from '../screens/Login/services';

// this hook should only be used once on the Authentication context creation
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [userJWT, setUserJWT] = useState(localStorage.getItem('userJWT') || undefined);

  const login = (email, password) => {
    loginService(email, password)
      .then((data) => {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userJWT', data.token);
        setIsLoggedIn(true);
        setUserJWT(data.token);
      });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userJWT');
    setIsLoggedIn(false);
    setUserJWT(undefined);
  };

  return { isLoggedIn, userJWT, login, logout };
};

export default useAuth;
