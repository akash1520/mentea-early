import { auth } from "@/firebase";
import { signupUser } from "@/types/user";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginFunc(set:any,data: signupUser) {
    try {
        set(() => ({ isLoading: true }));

        const { email, password } = data;
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const token = await user.getIdToken();
        set(() => ({ user: user, token: token }));
        return true;
    } catch (err) {
        if (err instanceof FirebaseError) {
            const errorCode = err.code;
            if (errorCode === "auth/user-not-found") {
                alert("No user found with this email");
            } else if (errorCode === "auth/wrong-password") {
                alert("Wrong password");
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