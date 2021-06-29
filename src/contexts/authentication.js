import React from 'react';

const Authentication = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default Authentication;
