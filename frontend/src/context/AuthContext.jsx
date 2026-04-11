import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = (userData, tokenData) => {
    setUser(userData); // save user object
    setToken(tokenData); // save JWT token
    localStorage.setItem("token", tokenData);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null); // clear user
    setToken(null); // clear token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
