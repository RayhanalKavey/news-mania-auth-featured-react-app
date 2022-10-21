import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
//----------------
const AuthProvider = ({ children }) => {
  // const user = { displayName: "kavey" };
  const [user, setUser] = useState(null);
  //---------------notE Google sign in
  const providerLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };
  //---------Observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Inside auth state change", currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  ///-----------------notE create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //-------notE signin
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //------------Sign out
  const logout = () => {
    return signOut(auth);
  };
  //---------------
  const authInfo = { user, providerLogin, logout, createUser, signIn };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
