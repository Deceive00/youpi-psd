// orderHandler.ts
import { OrderHandler } from "@lib/handler/ordering-handler";
import { Order } from "@lib/types/order-types";
import { UserType } from "@lib/types/user-types";

export const OrderController = {
  async addOrder(order: Order) {
    await OrderHandler.addOrder(order);
  },

  async updateOrderStatus(order: Order, userType: UserType) {
    await OrderHandler.updateOrderStatus(order, userType)
  },

  async updateUserPickupStatus(order: Order) {
    await OrderHandler.updateUserPickupStatus(order);
  }
};

