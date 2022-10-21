import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
//----------------
const AuthProvider = ({ children }) => {
  // const user = { displayName: "kavey" };
  const [user, setUser] = useState(null);
  ///leading state to prevent the reload log out issue
  const [loading, setLoading] = useState(true);
  //---------------notE Google sign in
  const providerLogin = (provider) => {
    ///leading state to prevent the reload log out issue
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  //---------notE Observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Inside auth state change", currentUser);
      // notE for logout after email verification error solv
      if (currentUser === null || currentUser.emailVerified) {
        setUser(currentUser);
      }
      ///leading state to prevent the reload log out issue
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  ///-----------------notE create user with email and password
  const createUser = (email, password) => {
    ///leading state to prevent the reload log out issue
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //-------notE sign-in
  const signIn = (email, password) => {
    ///loading state to prevent the reload log out issue
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //-----------notE update user profile (updateProfile)
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  //------------notE verify email null
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };
  //------------notE Sign-out
  const logout = () => {
    ///loading state to prevent the reload log out issue
    setLoading(true);
    return signOut(auth);
  };
  //---------------
  const authInfo = {
    user,
    setLoading,
    providerLogin,
    logout,
    createUser,
    signIn,
    loading,
    updateUserProfile,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
