import { auth, db } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {  getName } from "../../utils/utils";
import { doc, setDoc } from "firebase/firestore";

export async function googleAuth(set: any, googleProvider: GoogleAuthProvider) {
  try {
    set(() => ({ isLoading: true }));

    // Google login using Firebase Auth
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    const { displayName, email, photoURL, phoneNumber } = user;
    const [firstName, lastName] = getName(displayName as string);
    const userData = {
      age: "",
      firstName: firstName || "",
      lastName: lastName || "",
      gender: "",
      email: email || "",
      languages: [],
      mentorId: "",
      mobile: phoneNumber || "",
      organization: "",
      profileImgUrl: photoURL || "",
      role: "user",
      shortHeading: "",
      socials: [],
      username: "",
    };

    const userRef = doc(db, "Users", user.uid);
    set(() => ({ userData: userData }));
    await setDoc(userRef, {...userData});
    

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
  }
}
