// orderHandler.ts
import { OrderRepository } from "@lib/repository/ordering-repository";
import { removeCart, ORDER_TYPE, DELIVERY_STATUS_LIST, PICKUP_STATUS_LIST, DELIVERY_STATUS, addHistory, PICKUP_STATUS } from "@lib/services/order.service";
import { Order } from "@lib/types/order-types";
import { UserType } from "@lib/types/user-types";
import { auth } from "src/firebase/firebase-config";
import { HistoryHandler } from "./history-handler";

export const OrderHandler = {
  async addOrder(order: Order) {
    const id = auth.currentUser?.uid;
    if (id) {
      const userDoc = await OrderRepository.getOrderDoc(id);

      if (userDoc.exists()) {
        const data = userDoc.data().ongoing as Order;
        if (data && Object.keys(data).length === 0 && data.constructor === Object) {
          await OrderRepository.updateOrderDoc(id, { ongoing: order });
        } else {
          throw new Error("You have another ongoing order!");
        }
      } else {
        await OrderRepository.setOrderDoc(id, { ongoing: order, history: [] });
      }
      await removeCart();
    } else {
      throw new Error("User ID not found");
    }
  },

  async updateOrderStatus(order: Order, userType: UserType) {
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
        throw new Error("You cannot take your own order!");
      }
      const orderDoc = await OrderRepository.getOrderDoc(order.orderId);

      let updatedOrder;
      if (userType === UserType.USER) {
        updatedOrder = validateSenderOrderStatus(order, statusIdx, id);
      } else {
        updatedOrder = validateVendorOrderStatus(order, statusIdx);
      }

      if (updatedOrder.status === DELIVERY_STATUS.FINISHED) {
        await OrderRepository.updateOrderDoc(order.orderId, { ongoing: {} });
        await HistoryHandler.addHistory(updatedOrder, order.vendorId);
        if (updatedOrder.senderId !== "") {
          await HistoryHandler.addHistory(updatedOrder, order.senderId);
        }
        await HistoryHandler.addUserOrderHistory(updatedOrder);
      } else if (orderDoc.exists()) {
        await OrderRepository.updateOrderDoc(order.orderId, { ongoing: updatedOrder });
      }
    }
  },

  async updateUserPickupStatus(order: Order) {
    const statusIdx = PICKUP_STATUS_LIST.findIndex(
      (status: string) => status === order.status
    );

    const id = auth.currentUser?.uid;
    if (order.orderId && id) {
      const updatedOrder = validateUserPickupStatus(order, statusIdx);

      if (updatedOrder.status === PICKUP_STATUS.FINISHED) {
        await addHistory(updatedOrder, order.vendorId);
        await HistoryHandler.addUserOrderHistory(updatedOrder);
        await OrderRepository.updateOrderDoc(order.orderId, { ongoing: {} });
      }
    }
  }
};

const validateUserPickupStatus = (order: Order, statusIdx: number) => {
  const updatedOrder = order;
  const status = order.status;
  if (status === PICKUP_STATUS.READY_FOR_PICKUP) {
    updatedOrder.status = PICKUP_STATUS_LIST[statusIdx + 1];
  }

  return updatedOrder;
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


