import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function checkUsernameAvailability (username: string) {
    try {
      const userRef = collection(db, "Users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      return querySnapshot.empty; // If empty, username is available
    } catch (error) {
      console.error("Error checking username availability:", error);
      throw error;
    }
  }