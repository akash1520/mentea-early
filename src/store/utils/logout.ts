import { auth } from "@/firebase";
import { signOut } from "firebase/auth";


export async function logout(set:any) {
    // Logout using Firebase Auth
    try {
      set(() => ({ isLoading: true }));

      await signOut(auth);

      set(() => ({ user: null }));
      set(() => ({ token: null }));
      set(() => ({ userData: null }));
    } catch (error) {
      console.error(error);
    } finally {
      set(() => ({ isLoading: false }));
    }
  }