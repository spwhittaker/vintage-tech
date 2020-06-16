// user context
import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext();

function getUserFromLocalStorage() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
}

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const [height, setHeight] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHeight(window.pageYOffset);
    });
    return () => window.removeEventListener("scroll", () => {});
  });
  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem("user");
  };

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "success",
  });
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  const showAlert = ({ msg, type = "success", timeout = true }) => {
    setAlert({ show: true, msg, type });
    if (timeout) {
      setTimeout(() => hideAlert(), 6000);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        alert,
        showAlert,
        hideAlert,
        height,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export { UserProvider, UserContext };
