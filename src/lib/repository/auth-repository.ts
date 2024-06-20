import { User, UserRegis, UserType } from "@lib/types/user-types";
import { VendorRegis } from "@lib/types/vendor-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";
export const AuthRepository = {
  registerUser: async (data: any, uid: string) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      ...data,
      isSender: false,
    });
  },

  getCampusById: async (id: string) => {
    const campusDocRef = doc(db, "campus", id);
    const campusDoc = await getDoc(campusDocRef);
    return campusDoc;
  },

  registerVendor: async (data: any, campusDocRef: any) => {
    await updateDoc(campusDocRef, {
      vendors: arrayUnion(data),
    });
  },

  login: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async (): Promise<void> => {
    return await new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          console.log("Sign out successful");
          resolve();
          window.location.reload();
        })
        .catch((logoutError) => {
          console.log("Error logging out : ", logoutError);
          reject(logoutError);
        });
    });
  },
  fetchUserByID: async (userId: string): Promise<User | undefined> => {
    if (!userId) return;

    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as User;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
