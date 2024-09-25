import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { userLogin } from "../services/services";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("@user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const resp = await userLogin(userData);
      const userInfo = {
        email: userData.email,
        token: resp.token,
      };
      setUser(userInfo);
      localStorage.setItem("@token", JSON.stringify(resp.token));
      localStorage.setItem("@user", JSON.stringify(userInfo));
      navigate("/products");
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@token");
    localStorage.removeItem("@user");
    navigate("/login");
  };

  const getUserInfo = () => {
    if (user) {
      const { email, token } = user;
      return { email, token };
    }
    return { email: "", password: "" };
  };

  const updateUserInfo = (userData) => {
    setUser(userData);
    localStorage.setItem("@user", JSON.stringify(userData));
    fetch("https://dummyjson.com/users/2", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData,
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((e) => toast.error("Erro ao atualizar os dados do usuário."));
  };

  const value = {
    user,
    login,
    logout,
    isLogged: !!user,
    getUserInfo,
    updateUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
