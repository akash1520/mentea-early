import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import create from "zustand"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthStore } from "../AuthStore";



export async function googleAuth(set:any, googleProvider:GoogleAuthProvider) {
    try {
    set(() => ({ isLoading: true }));

    // Google login using Firebase Auth
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    set(() => ({ user: user, token: token }));
    return true; // Indicate successful login
  } catch (error) {
    // Handle Google login errors
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Google Login Error: ", errorCode, errorMessage);
    } else {
      console.error(error);
    }
    return false;
  } finally {
    set(() => ({ isLoading: false }));
  }}