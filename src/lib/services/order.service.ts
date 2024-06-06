import { Order } from "@lib/types/order-types";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";

export const addOrder = async (order: Order) => {
  const id = auth.currentUser?.uid;
  if(id){
    const userRef = doc(db, "orders", id);
    const userDoc = await getDoc(userRef);
    console.log(order);
    // return;
    if(userDoc.exists()){
      await updateDoc(userRef, {
        ongoing: order
      })
    } else { 
      await setDoc(userRef, {
        ongoing: order,
        history: [],
      });
    }
    await removeCart();
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

export const getVendorIncomingOrder = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(collection(db, "orders"), (orderSnapshot) => {
      const updatedOrders: Order[] = [];
      orderSnapshot.docs.forEach((d) => {
        const data = d.data().ongoing as Order;
        if (data.vendorId === id && data.status === DELIVERY_STATUS.WAITING_CONFIRMATION) {
          updatedOrders.push(data);
        }
      });
      callback(updatedOrders);
    });

    return unsubscribe;
  } else {
    throw new Error('User ID not found');
  }
}

export const getVendorOrderHistory = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(collection(db, "history"), (orderSnapshot) => {
      orderSnapshot.docs.forEach((d) => {
        if (d.id === id) {
          const data = d.data() as Order[];
          callback(data);
        }
      });
    });

    return unsubscribe;
  } else {
    throw new Error('User ID not found');
  }
}

export const getVendorOngoingOrder = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(collection(db, "orders"), (orderSnapshot) => {
      const updatedOrders: Order[] = [];
      orderSnapshot.docs.forEach((d) => {
        const data = d.data().ongoing as Order;
        console.log(data.status, " vendor id = ", data.vendorId)
        if (data.vendorId === id && data.status !== DELIVERY_STATUS.WAITING_CONFIRMATION) {
          updatedOrders.push(data);
        }
      });
      callback(updatedOrders);
    });

    return unsubscribe;
  } else {
    throw new Error('User ID not found');
  }
}

export enum PICKUP_STATUS {
  WAITING_CONFIRMATION = 'waiting confirmation',
  PREPARING_ORDER = 'preparing order',
  READY_FOR_PICKUP = 'ready for pick up',
  FINISHED = 'finished'
}
export enum DELIVERY_STATUS {
  WAITING_CONFIRMATION = 'waiting confirmation',
  PREPARING_ORDER = 'preparing order',
  PICKING_UP_YOUR_ORDER = 'picking up your order',
  DELIVERING_YOUR_ORDER = 'delivering your order',
  FINISHED = 'finished'
}

export const PICKUP_STATUS_LIST = [
  PICKUP_STATUS.WAITING_CONFIRMATION,
  PICKUP_STATUS.PREPARING_ORDER,
  PICKUP_STATUS.READY_FOR_PICKUP,
  PICKUP_STATUS.FINISHED,
]
export const DELIVERY_STATUS_LIST = [
  DELIVERY_STATUS.WAITING_CONFIRMATION,
  DELIVERY_STATUS.PREPARING_ORDER,
  DELIVERY_STATUS.PICKING_UP_YOUR_ORDER,
  DELIVERY_STATUS.DELIVERING_YOUR_ORDER,
  DELIVERY_STATUS.FINISHED,
]