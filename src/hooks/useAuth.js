import { useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);

  const updateAuth = (value) => {
    localStorage.setItem('isLoggedIn', value);
    setIsLoggedIn(value);
  };

  return {isLoggedIn, updateAuth};
};

export default useAuth;
