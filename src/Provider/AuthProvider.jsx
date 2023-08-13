import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  // ===========> CREATE USER
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // =============> UPDATE USER
  const updateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  // ================> SIGN IN USER
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // =============== > LOG OUT
  function logOut() {
    setLoading(true);
    return signOut(auth);
  }

  // ==================> UPDATE USER STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post("https://site-server-nahid-dev.vercel.app/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("accessToken", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("accessToken");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [user]);

  // ================> SEND ALL FUNCTION
  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
    signInUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
