import { auth, db } from "@/firebase";
import { signupUser } from "@/types/user";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function signup (set:any, data:signupUser) {
    try {
      set(() => ({ isLoading: true }));

      const { email, password, firstName, lastName, username, age, gender } =
        data;

      // Create user using Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);

      // Login user using Firebase Auth
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const token = await user.getIdToken();

      set(() => ({ user: user, token: token }));

      // Store additional user data in Firestore
      const userRef = doc(db, "Users", user.uid);

      const userData = {
        firstName,
        lastName,
        username,
        // Only add age and gender if it exists
        ...(age !== null && { age }),
        ...(gender !== null && { gender }),
      };

      await setDoc(userRef, userData);

      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorCode = err.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use");
        } else if (errorCode === "auth/invalid-email") {
          alert("Invalid email");
        } else {
          console.error(err);
        }
      } else {
        console.error(err);
      }
      return false;
    } finally {
      set(() => ({ isLoading: false }));
    }
  }