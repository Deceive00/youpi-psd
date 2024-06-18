import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

export const OrderRepository = {
  getOrderDoc: async (id: string) => {
    const orderRef = doc(db, "orders", id);
    return await getDoc(orderRef);
  },

  setOrderDoc: async (id: string, data: any) => {
    const orderRef = doc(db, "orders", id);
    return await setDoc(orderRef, data);
  },

  updateOrderDoc: async (id: string, data: any) => {
    const orderRef = doc(db, "orders", id);
    return await updateDoc(orderRef, data);
  }
};
