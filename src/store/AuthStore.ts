import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { create } from "zustand";
import { auth, db } from "@/firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { googleAuth } from "./utils/googleAuth";
import { twitterAuth } from "./utils/twitterAuth";
import { UserData } from "@/types/user";
import { loginFunc } from "./utils/login";
import { signupUser } from "@/types/user";
import { logout } from "./utils/logout";
import { signup } from "./utils/signup";
import { checkUsernameAvailability } from "./utils/checkUNAvailability";
import { destroyUserData } from "./utils/destroyUserData";
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Define function types
type LoginFunction = (selectProvider: number) => Promise<boolean>;
type LoginWithEPFunction = (data: signupUser) => Promise<boolean>;
type LogoutFunction = () => Promise<void>;
type SignupWithEPFunction = (data: signupUser) => Promise<boolean>;
type GetCurrentUserFunction = () => Promise<void>;
type GetCurrentUserDataFunction = () => void;
type CheckUsernameAvailabilityFunction = (username: string) => Promise<boolean>;
type DestroyUserDataFunction = () => Promise<boolean>;


// Enumeration for different login providers
enum selectPro {
  Google,
  Twitter,
}

// Interface for the store state
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  userData: UserData | null;
  login: LoginFunction;
  loginEP: LoginWithEPFunction;
  logout: LogoutFunction;
  signupEP: SignupWithEPFunction;
  isLoading: boolean;
  getCurrentUser: GetCurrentUserFunction;
  getCurrentUserData: GetCurrentUserDataFunction;
  destroyUserData: DestroyUserDataFunction;
  checkUsernameAvailability: CheckUsernameAvailabilityFunction;
}


// Create the Zustand store
export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  token: null,
  isLoading: false,
  userData: null,
  login: async (selectProvider) => {

    // Check if user is already logged in
    if (get().user) { 
      return true;
    }

    switch (selectProvider) {
      case selectPro.Google:
        return googleAuth(set, googleProvider);
    
      case selectPro.Twitter:
        return twitterAuth(set, twitterProvider);
    
      default:
        return false;
    }
 },
  loginEP: async(data)=>{return await loginFunc(set, data)},
  logout: ()=>logout(set),
  signupEP: async(data)=>{return await signup(set, data)},
  getCurrentUser: async () => {
    try {
      set({ isLoading: true });

      await new Promise<void>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();

          if (user) {
            set({ user: user });

            get().getCurrentUserData();
          } else {
            set({ user: null });
          }

          resolve();
        });
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  getCurrentUserData: async () => {
    // get the current user id
    const uid = get().user?.uid;

    // fetch the current user data
    if (uid) {
      const userRef = doc(db, "Users", uid);
      const docSnap = await getDoc(userRef);

      // If the logged in user is a user, then fetch its data
      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;
        set(() => ({ userData: { ...data, role: "user" } }));
        return;
      }

      const mentorRef = doc(db, "Mentors", uid);
      const mentorSnap = await getDoc(mentorRef);

      // If the logged in user is a mentor, then fetch its data
      if (mentorSnap.exists()) {
        const data = mentorSnap.data() as UserData;
        set(() => ({ userData: { ...data, role: "mentor" } }));
        return;
      }

      set(() => ({ userData: null }));
    }
  },
  checkUsernameAvailability: async(username)=>checkUsernameAvailability(username),
  destroyUserData:()=>{
    return destroyUserData(set, get)
  }    
}));
