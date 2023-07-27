import React, { useState } from "react";

export const LoadingContext = React.createContext({
  loading: false,
  setLoading: () => {},
});

const LoadingProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const contextObj = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={contextObj}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
