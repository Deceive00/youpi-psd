import { HistoryRepository } from "@lib/repository/history-repository";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

// orderHistoryHandler.ts
interface Order {
  type: string;
  status: string;
  orderId: string;
  vendorId: string;
  senderId?: string;
  [key: string]: any;
}

export const HistoryHandler = {
  async addUserOrderHistory(updatedOrder: Order) {
    const historyDoc = await HistoryRepository.getOrderHistoryDoc(updatedOrder.orderId);
    if (historyDoc.exists()) {
      await HistoryRepository.updateOrderHistoryDoc(updatedOrder.orderId, updatedOrder);
    } else {
      throw new Error("User Not Found!");
    }
  },
  addHistory: async (updatedOrder: Order, id: string) => {
    const historyRef = doc(db, "history", id);
    const historyDoc = await getDoc(historyRef);
    if (historyDoc.exists()) {
      await updateDoc(historyRef, {
        data: arrayUnion(updatedOrder),
      });
    } else {
      await setDoc(historyRef, {
        data: [updatedOrder],
      });
    }
  }
};
