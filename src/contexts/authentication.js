import React from "react";

const Authentication = React.createContext({
  isLoggedIn: false,
  updateAuth: () => {},
});

export default Authentication;
