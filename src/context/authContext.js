import fire from "../fire";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const authContext = React.createContext();
const API = " http://localhost:8000/users";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState("");
  function handleLogin(email, password, navigate) {
    setError("");
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  }
  function handleSignUp(email, password, navigate) {
    setError("");
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => handleLogin(email, password, navigate))
      .catch((err) => setError(err.message));
  }
  function handleLogOut() {
    fire.auth().signOut();
  }
  function authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser("");
      }
    });
  }

  async function addUser(newUser) {
    await axios.post(API, newUser);
  }

  useEffect(() => {
    authListener();
  }, []);
  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        setError,
        handleLogin,
        handleSignUp,
        handleLogOut,
        addUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
