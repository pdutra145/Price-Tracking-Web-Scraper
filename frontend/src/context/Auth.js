import React, { useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: {
    id: undefined,
    picture: undefined,
    name: undefined,
    email: undefined,
    auth_provider: undefined,
  },
  setUserInfo: () => {},
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("access_token"));
  const [userInfo, setUserInfo] = useState({});

  const contextObj = {
    userInfo,
    isLoggedIn,
    setIsLoggedIn,
    setUserInfo,
  };

  return (
    <AuthContext.Provider value={contextObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
