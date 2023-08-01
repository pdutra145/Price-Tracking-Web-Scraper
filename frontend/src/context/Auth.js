import React, { useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  userInfo: {
    id: undefined,
    picture: undefined,
    name: undefined,
    email: undefined,
    searchOption: {
      provider: "Amazon",
      url: "amazon.com.br",
      currency: "R$"
    }
  },
  setUserInfo: () => { }
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    document.cookie.includes("google_token")
  );
  const [userInfo, setUserInfo] = useState({})

  const contextObj = {
    userInfo,
    isLoggedIn,
    setIsLoggedIn,
    setUserInfo
  };

  return (
    <AuthContext.Provider value={contextObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
