
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

export const HistoryRepository = {
  async getOrderHistoryDoc(orderId: string) {
    const historyRef = doc(db, "orders", orderId);
    return await getDoc(historyRef);
  },

  async updateOrderHistoryDoc(orderId: string, updatedOrder: any) {
    const historyRef = doc(db, "orders", orderId);
    return await updateDoc(historyRef, {
      history: arrayUnion(updatedOrder),
    });
  },

  
};