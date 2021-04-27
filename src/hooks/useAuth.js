import { useContext, useEffect, createContext, useState } from "react";
import httpClient from "../lib/axios";
import Loader from "../components/Loader";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (data) => {
    return httpClient.post(`/api/auth/login`, data).then((res) => {
      setUser(res.data.data.user);
      localStorage.setItem("er-t", res.data.data.token);
    });
  };
  const register = async (data) => {
    return httpClient
      .post(`/api/auth/register`, data)
      .then((res) => console.log(res));
  };
  const checkAuth = async () => {
    return httpClient
      .get(`/api/auth/checkToken`)
      .then((res) => setUser(res.data.data));
  };
  const logout = () => {
    localStorage.removeItem("er-t");
    setUser(null);
  };

  useEffect(() => {
    (async function () {
      try {
        await checkAuth();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Loader variant="large" />;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
