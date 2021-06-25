import { useState } from 'react';

import { loginService, logoutService } from '../screens/Login/services';

// this hook should only be used once on the Authentication context creation
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);

  const login = (username, password) => {
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);

    loginService(username, password);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);

    logoutService();
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
