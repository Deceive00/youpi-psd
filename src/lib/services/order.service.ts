import { Order } from "@lib/types/order-types";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";

export const addOrder = async (order: Order) => {
  const id = auth.currentUser?.uid;
  if(id){
    const userRef = doc(db, "orders", id);
    const userDoc = await getDoc(userRef);
    if(userDoc.exists()){
      await updateDoc(userRef, {
        ongoing: order
      })
      await removeCart();
    } else { 
      await setDoc(userRef, {
        ongoing: order,
        history: [],
      });
    }
  }else{
    throw new Error('User ID not found')
  }
}

export const removeCart = async () => {
  const id = auth.currentUser?.uid;
  if(id){
    const userRef = doc(db, "carts", id);
    const userDoc = await getDoc(userRef);
    if(userDoc.exists()){
      await deleteDoc(userRef);
    } else { 
      throw new Error('Cart Not Found');
    }
  }else{
    throw new Error('User ID not found')
  }
}