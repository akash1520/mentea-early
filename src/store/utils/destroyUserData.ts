import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function destroyUserData(set:any,get:any) {
    try {
      const uid = get().user?.uid;
      if (uid) {
        const userRef = doc(db, "Users", uid);
        await deleteDoc(userRef); // This will delete the document from Firestore

        set(() => ({ userData: null })); // This will clear the local userData
        return true;
      }
      return false; // Return false if uid does not exist
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      return false;
    }
  }