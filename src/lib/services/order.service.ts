import { Order } from "@lib/types/order-types";
import { UserType } from "@lib/types/user-types";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";

export const addOrder = async (order: Order) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const userRef = doc(db, "orders", id);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data().ongoing as Order;
      console.log(data);
      if(data && Object.keys(data).length === 0 && data.constructor === Object){
        await updateDoc(userRef, {
          ongoing: order,
        });
      }else{
        throw new Error("You have another ongoing order!")
      }

    } else {
      await setDoc(userRef, {
        ongoing: order,
        history: [],
      });
    }
    await removeCart();
  } else {
    throw new Error("User ID not found");
  }
};

export const removeCart = async () => {
  const id = auth.currentUser?.uid;
  if (id) {
    const userRef = doc(db, "carts", id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      await deleteDoc(userRef);
    } else {
      throw new Error("Cart Not Found");
    }
  } else {
    throw new Error("User ID not found");
  }
};

export const getVendorIncomingOrder = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (orderSnapshot) => {
        const updatedOrders: Order[] = [];
        orderSnapshot.docs.forEach((d) => {
          const data = d.data().ongoing as Order;
          if (
            data &&
            data.vendorId === id &&
            data.status === DELIVERY_STATUS.WAITING_CONFIRMATION
          ) {
            data.orderId = d.id;
            updatedOrders.push(data);
          }
        });
        callback(updatedOrders);
      }
    );

    return unsubscribe;
  } else {
    throw new Error("User ID not found");
  }
};
export const getVendorOrderHistory = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(
      collection(db, "history"),
      (orderSnapshot) => {
        const updatedOrders: Order[] = [];
        orderSnapshot.docs.forEach((d) => {
          const data = d.data().ongoing as Order;
          if (data) {
            data.orderId = d.id;
            updatedOrders.push(data);
          }
        });
        callback(updatedOrders);
      }
    );

    return unsubscribe;
  } else {
    throw new Error("User ID not found");
  }
};

export const getSenderIncomingOrder = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      async (orderSnapshot) => {
        const updatedOrders: Order[] = [];

        for (const d of orderSnapshot.docs) {
          const data = d.data().ongoing as Order;
          if (
            data &&
            data.type === ORDER_TYPE.DELIVERY &&
            data.status !== DELIVERY_STATUS.FINISHED &&
            (data.status === DELIVERY_STATUS.READY_FOR_PICKUP ||
              data.status === DELIVERY_STATUS.PREPARING_ORDER) &&
            data.senderId === ""
          ) {
            const vendorDoc = await getDoc(doc(db, "campus", data.campusName));
            if (vendorDoc.exists()) {
              const vendors = vendorDoc.data().vendors;
              const vendor = vendors.find((v: any) => v.id === data.vendorId);
              if (vendor) {
                data.vendorName = vendor.name;
              }
            }
            data.orderId = d.id;
            updatedOrders.push(data);
          }
        }

        callback(updatedOrders);
      }
    );

    return unsubscribe;
  } else {
    throw new Error("User ID not found");
  }
};

export const getSenderOngoingOrder = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      async (orderSnapshot) => {
        const updatedOrders: Order[] = [];
        for (const d of orderSnapshot.docs) {
          const data = d.data().ongoing as Order;

          if (
            data &&
            data.type === ORDER_TYPE.DELIVERY &&
            data.senderId === id &&
            data.status !== DELIVERY_STATUS.FINISHED
          ) {
            const vendorDoc = await getDoc(doc(db, "campus", data.campusName));
            if (vendorDoc.exists()) {
              const vendors = vendorDoc.data().vendors;
              const vendor = vendors.find((v: any) => v.id === data.vendorId);
              if (vendor) {
                data.vendorName = vendor.name;
              }
            }
            updatedOrders.push(data);
          }
        }
        callback(updatedOrders);
      }
    );

    return unsubscribe;
  } else {
    throw new Error("User ID not found");
  }
};

// export const getUserOngoingOrder = async () => {
//   const id = auth.currentUser?.uid;
//   console.log("idnya = ", id);
//   if (id) {
//     const orderRef = doc(db, "orders", id);
//     const orderDoc = await getDoc(orderRef);
//     if (orderDoc.exists()) {
//       const data = orderDoc.data().ongoing;

//       const vendorDoc = await getDoc(doc(db, "campus", data.campusName));
//       if (vendorDoc.exists()) {
//         const vendors = vendorDoc.data().vendors;
//         const vendor = vendors.find((v: any) => v.id === data.vendorId);
//         if (vendor) {
//           data.vendorName = vendor.name;
//         }
//       }

//       return data;
//     } else {
//       throw new Error("Order Not Found");
//     }
//   } else {
//     throw new Error("User ID not found");
//   }
// };

export const onUserOngoingOrder = (callback: (order: Order | null) => void) => {
  const id = auth.currentUser?.uid;
  console.log("idnya = ", id);

  if (id) {
    const orderRef = doc(db, "orders", id);
    
    const unsubscribe = onSnapshot(orderRef, async (orderDoc) => {
      if (orderDoc && orderDoc.exists()) {
        const data = orderDoc.data().ongoing as Order;

        if (data) {
          const vendorDoc = await getDoc(doc(db, "campus", data.campusName));
          if (vendorDoc.exists()) {
            const vendors = vendorDoc.data().vendors;
            const vendor = vendors.find((v: any) => v.id === data.vendorId);
            if (vendor) {
              data.vendorName = vendor.name;
            }
          }

          callback(data);
        } else {
          console.log("Gaada data");
          callback(null);
        }
      } else {
        console.log("Order Not Found");
        callback(null);
      }
    });

    return unsubscribe;
  } else {
    throw new Error("User ID not found");
  }
};

export const addHistory = async (updatedOrder: Order, id: string) => {
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
};

const addUserOrderHistory = async (updatedOrder: Order) => {
  const historyRef = doc(db, "orders", updatedOrder.orderId);
  const historyDoc = await getDoc(historyRef);
  if (historyDoc.exists()) {
    await updateDoc(historyRef, {
      history: arrayUnion(updatedOrder),
    });
  } else {
    throw new Error("User Not Found!");
  }
};

export const updateOrderStatus = async (order: Order, userType: UserType) => {
  let statusIdx;
  if (order.type === ORDER_TYPE.DELIVERY) {
    statusIdx = DELIVERY_STATUS_LIST.findIndex(
      (status: string) => status === order.status
    );
  } else {
    statusIdx = PICKUP_STATUS_LIST.findIndex(
      (status: string) => status === order.status
    );
  }
  const id = auth.currentUser?.uid;
  if (order.orderId && id) {
    if (order.type === ORDER_TYPE.DELIVERY && id === order.orderId) {
      // Validasi sender gabisa ngambil orderannya sendiri
      throw new Error("You cannot take your own order!");
    }
    const orderRef = doc(db, "orders", order.orderId);
    const orderDoc = await getDoc(orderRef);
    let updatedOrder;
    if (userType === UserType.USER) {
      updatedOrder = validateSenderOrderStatus(order, statusIdx, id);
    } else {
      updatedOrder = validateVendorOrderStatus(order, statusIdx);
    }
    if (updatedOrder.status === DELIVERY_STATUS.FINISHED) {
      await updateDoc(orderRef, {
        ongoing: {},
      });
      await addHistory(updatedOrder, order.vendorId);
      if (updatedOrder.senderId !== "") {
        await addHistory(updatedOrder, order.senderId);
      }
      await addUserOrderHistory(updatedOrder);
    } else if (orderDoc.exists()) {
      await updateDoc(orderRef, {
        ongoing: updatedOrder,
      });
    }
  }
};

export const updateUserPickupStatus = async (order: Order) => {
  const statusIdx = PICKUP_STATUS_LIST.findIndex(
    (status: string) => status === order.status
  );

  const id = auth.currentUser?.uid;
  if (order.orderId && id) {
    const orderRef = doc(db, "orders", order.orderId);
    const updatedOrder = validateUserPickupStatus(order, statusIdx);

    if (updatedOrder.status === PICKUP_STATUS.FINISHED) {
      await addHistory(updatedOrder, order.vendorId);
      await addUserOrderHistory(updatedOrder);
      await updateDoc(orderRef, {
        ongoing: {},
      });
    }
  }
};

const validateSenderOrderStatus = (
  order: Order,
  statusIdx: number,
  senderId: string
) => {
  const updatedOrder = order;
  if (
    updatedOrder.status === DELIVERY_STATUS.READY_FOR_PICKUP ||
    updatedOrder.status === DELIVERY_STATUS.PREPARING_ORDER
  ) {
    updatedOrder.senderId = senderId;
  }
  if (
    updatedOrder.status === DELIVERY_STATUS.READY_FOR_PICKUP ||
    updatedOrder.status === DELIVERY_STATUS.PICKING_UP_YOUR_ORDER ||
    updatedOrder.status === DELIVERY_STATUS.DELIVERING_YOUR_ORDER
  ) {
    updatedOrder.status = DELIVERY_STATUS_LIST[statusIdx + 1];
  }
  return updatedOrder;
};
const validateVendorOrderStatus = (order: Order, statusIdx: number) => {
  const updatedOrder = order;
  const status = order.status;
  if (
    status === DELIVERY_STATUS.WAITING_CONFIRMATION ||
    status === DELIVERY_STATUS.PREPARING_ORDER ||
    status === PICKUP_STATUS.WAITING_CONFIRMATION ||
    status === PICKUP_STATUS.PREPARING_ORDER ||
    (status === PICKUP_STATUS.READY_FOR_PICKUP &&
      order.type === ORDER_TYPE.PICK_UP)
  ) {
    if (order.type === ORDER_TYPE.DELIVERY) {
      updatedOrder.status = DELIVERY_STATUS_LIST[statusIdx + 1];
    } else {
      updatedOrder.status = PICKUP_STATUS_LIST[statusIdx + 1];
    }
  }

  return updatedOrder;
};

const validateUserPickupStatus = (order: Order, statusIdx: number) => {
  const updatedOrder = order;
  const status = order.status;
  if (status === PICKUP_STATUS.READY_FOR_PICKUP) {
    updatedOrder.status = PICKUP_STATUS_LIST[statusIdx + 1];
  }

  return updatedOrder;
};

export const getVendorOngoingOrder = (callback: (orders: Order[]) => void) => {
  const id = auth.currentUser?.uid;
  if (id) {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (orderSnapshot) => {
        const updatedOrders: Order[] = [];
        orderSnapshot.docs.forEach((d) => {
          const data = d.data().ongoing as Order;
          if (
            data &&
            data.vendorId === id &&
            data.status !== DELIVERY_STATUS.WAITING_CONFIRMATION &&
            data.status !== DELIVERY_STATUS.FINISHED
          ) {
            updatedOrders.push(data);
          }
        });
        console.log(updatedOrders);
        callback(updatedOrders);
      }
    );

    return unsubscribe;
  } else {
    throw new Error("User ID not found");
  }
};

export const getNewStatus = (type: string, currentStatus: string) => {
  return type === ORDER_TYPE.DELIVERY
    ? DELIVERY_STATUS_LIST[
        DELIVERY_STATUS_LIST.findIndex(
          (status: string) => status === currentStatus
        )
      ]
    : PICKUP_STATUS_LIST[
        PICKUP_STATUS_LIST.findIndex(
          (status: string) => status === currentStatus
        )
      ];
};
export const getStatusPopup = (type: string, currentStatus: string) => {
  return type === ORDER_TYPE.DELIVERY
    ? DELIVERY_STATUS_LIST[
        DELIVERY_STATUS_LIST.findIndex(
          (status: string) => status === currentStatus
        ) + 1
      ]
    : PICKUP_STATUS_LIST[
        PICKUP_STATUS_LIST.findIndex(
          (status: string) => status === currentStatus
        ) + 1
      ];
};
export const isAcceptOrder = (
  type: string,
  status: string,
  userType: UserType,
  senderId?: string
) => {
  if (userType === UserType.VENDOR) {
    if (type === "delivery") {
      return status === DELIVERY_STATUS.WAITING_CONFIRMATION;
    } else {
      return status === PICKUP_STATUS.WAITING_CONFIRMATION;
    }
  } else {
    return (
      (status === DELIVERY_STATUS.PREPARING_ORDER && senderId === "") ||
      (status === DELIVERY_STATUS.READY_FOR_PICKUP && senderId === "")
    );
  }
};

export const getEstimatedDeliveryTime = (
  timestamp: any,
  isDelivery: boolean
) => {
  const date = new Date(timestamp.seconds * 1000);

  let deliveryTime;
  if (isDelivery) {
    deliveryTime = new Date(date.getTime() + 25 * 60000);
  } else {
    deliveryTime = new Date(date.getTime() + 15 * 60000);
  }

  const formattedTime =
    (deliveryTime.getHours() < 10 ? "0" : "") +
    deliveryTime.getHours() +
    ":" +
    (deliveryTime.getMinutes() < 10 ? "0" : "") +
    deliveryTime.getMinutes();

  return formattedTime;
};

export const hideUpdateButton = (status: string) => {
  return (
    status === DELIVERY_STATUS.READY_FOR_PICKUP ||
    status === DELIVERY_STATUS.PICKING_UP_YOUR_ORDER ||
    status === DELIVERY_STATUS.DELIVERING_YOUR_ORDER ||
    status === DELIVERY_STATUS.FINISHED
  );
};
export enum PICKUP_STATUS {
  WAITING_CONFIRMATION = "waiting confirmation",
  PREPARING_ORDER = "preparing order",
  READY_FOR_PICKUP = "ready for pick up",
  FINISHED = "finished",
}
export enum DELIVERY_STATUS {
  WAITING_CONFIRMATION = "waiting confirmation",
  PREPARING_ORDER = "preparing order",
  READY_FOR_PICKUP = "ready for pick up",
  PICKING_UP_YOUR_ORDER = "picking up your order",
  DELIVERING_YOUR_ORDER = "delivering your order",
  FINISHED = "finished",
}

export const PICKUP_STATUS_LIST = [
  PICKUP_STATUS.WAITING_CONFIRMATION,
  PICKUP_STATUS.PREPARING_ORDER,
  PICKUP_STATUS.READY_FOR_PICKUP,
  PICKUP_STATUS.FINISHED,
];
export const DELIVERY_STATUS_LIST = [
  DELIVERY_STATUS.WAITING_CONFIRMATION,
  DELIVERY_STATUS.PREPARING_ORDER,
  DELIVERY_STATUS.READY_FOR_PICKUP,
  DELIVERY_STATUS.PICKING_UP_YOUR_ORDER,
  DELIVERY_STATUS.DELIVERING_YOUR_ORDER,
  DELIVERY_STATUS.FINISHED,
];

export enum ORDER_TYPE {
  DELIVERY = "delivery",
  PICK_UP = "pick up",
}
