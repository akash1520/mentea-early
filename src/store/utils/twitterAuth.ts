import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";

export async function twitterAuth(set:any, twitterProvider:TwitterAuthProvider)
{
    try {
    set(() => ({ isLoading: true }));

    // Twitter login using Firebase Auth
    const result = await signInWithPopup(auth, twitterProvider);
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    set(() => ({ user: user, token: token }));
    // Indicate successful login
    return true;
  } catch (error) {
    // Handle Twitter login errors
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Twitter Login Error: ", errorCode, errorMessage);
    } else {
      console.error(error);
    }
    return false;
  } finally {
    set(() => ({ isLoading: false }));
  }}