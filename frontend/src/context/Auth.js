import React, { useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    document.cookie.includes("google_token")
  );

  const contextObj = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
