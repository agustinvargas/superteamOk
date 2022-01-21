import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("AuthToken")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("AuthToken", JSON.stringify(token));
    } catch (error) {
      localStorage.removeItem("AuthToken");
      console.log(error);
    }
  }, [token]);

  const contextValue = {
    token,
    login(userToken) {
      setToken(userToken);
    },
    isLogged() {
      return !!token;
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
