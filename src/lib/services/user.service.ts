import { User } from "@lib/types/user-types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

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
