import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect
} from 'firebase/auth';
import { auth } from '../firebase';

// create user context
const UserContext = createContext({});

// custom hook
export const useUserContext = () => useContext(UserContext);

// define a provider of user context
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const unsubscriber = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null);
      setIsError("");
      setIsLoading(false);
    });

    return unsubscriber;

  }, []);

  const registerUser = async (email, name, password) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoading(false);

      return await updateProfile(auth.currentUser, {
        displayName: `${name.firstName} ${name.lastName}`
      });
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }

    // setIsLoading(true);
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(() => {
    //     return updateProfile(auth.currentUser, {
    //       displayName: `${name.firstName} ${name.lastName}`
    //     });
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => setIsError(err.message))
    //   .finally(() => setIsLoading(false));
  };

  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((res) => console.log(res))
    //   .catch((err) => setIsError(err.message))
    //   .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
      setIsLoading(false);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, new GithubAuthProvider());
      setIsLoading(false);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setIsLoading(true);
      await signInWithRedirect(auth, new FacebookAuthProvider());
      setIsLoading(false);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithTwitter = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, new TwitterAuthProvider());
      setIsLoading(false);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    isLoading,
    isError,
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter
  };
  return <UserContext.Provider value={contextValue}>
    {children}
  </UserContext.Provider>;
};