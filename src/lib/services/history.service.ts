import { UserHistory } from "@lib/types/history-types";
import { Order } from "@lib/types/order-types";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config"
import { fetchVendorDataByVendorId } from "./vendor.service";

export const getAllUserHistory = async () => {
  const id = auth.currentUser?.uid;

  if (id) {
    const orderRef = doc(db, "orders", id);
    const orderDoc = await getDoc(orderRef);

    if (orderDoc.exists()) {
      const histories = orderDoc.data().history as Order[];
      const historiesFE: UserHistory[] = await Promise.all(histories.map(async (h: Order) => {      
        const vendor = await fetchVendorDataByVendorId(h.vendorId);
        return {
          vendor: vendor,
          order: h
        };
      }));

      console.log("Histories Found: ", historiesFE);

      return historiesFE
      
    }else{
      throw new Error("Order doesn't exists");
    }
  }
}

export const getAllVendorSenderHistory = async () => {
  const id = auth.currentUser?.uid;

  if(id){
    const orderRef = doc(db, "history", id);
    const orderDoc = await getDoc(orderRef);
    if(orderDoc.exists()){
      const histories = orderDoc.data().data as Order[];
      return histories;
      
    }else{
      throw new Error("Order doesn't exists");
    }
  }
}