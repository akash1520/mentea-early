import { FirestoreError, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { MentorsData } from "@/types/mentor";
import { db } from "@/firebase";
import { Dispatch, SetStateAction } from "react";
import { UserData } from "@/types/user";

export const fetchMentors = async (setMentors:Dispatch<SetStateAction<MentorsData[]>>, setError:Dispatch<SetStateAction<FirestoreError>>, setIsLoading:Dispatch<SetStateAction<boolean>>) => {
    try {
      const mentorsCollectionRef = collection(db, 'Mentors');
      const querySnapshot = await getDocs(mentorsCollectionRef);

      const mentorsData = querySnapshot.docs.map((doc) => {
        const data = doc.data(); // Get the data of the document
        const uid = doc.id; // Get the UID of the document
        return { ...data, uid }; // Combine data and uid in the result object
      });

      setMentors(mentorsData as MentorsData[]);
      
    } catch (err) {
      setError(err as FirestoreError);
    } finally {
      setIsLoading(false);
    }
  };

  export const fetchMentor = async (uid: string):Promise<UserData|null> => {
    const mentorsCollectionRef = collection(db, 'Mentors');
    const mentorDocRef = doc(mentorsCollectionRef, uid);

    try {
        const mentorSnapshot = await getDoc(mentorDocRef);
    
        if (mentorSnapshot.exists()) {
          // Mentor found, you can now access the data
          const mentor = mentorSnapshot.data();
          console.log('Mentor Data:', mentor);
          return mentor as UserData;
        } else {
          console.log('Mentor not found');
          return null; // or handle accordingly
        }
      } catch (error) {
        console.error('Error fetching mentor:', error);
        // Handle error
        throw error;
      }
  };
  