import { User } from "@lib/types/user-types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";

export const fetchUserByID = async (userId: string): Promise<User | undefined> => {
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
};

export const updateUser = async (data : User) => {
  if(auth.currentUser){
    const docRef = doc(db, "users", auth.currentUser?.uid || '');
    console.log(auth.currentUser.uid);
    await updateDoc(docRef, 
      {
        ...data
      }
    );
  }else{
    throw new Error("No user found!");
  }
}