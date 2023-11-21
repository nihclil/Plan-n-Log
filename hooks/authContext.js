"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const googleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initialLoad && currentUser) {
        if (router.pathname === "/") {
          router.push("/trips");
        }
        setInitialLoad(false);
      }
    });
    return () => unsubscribe();
  }, [initialLoad, router]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, googleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
