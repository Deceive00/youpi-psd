import { Order } from "@lib/types/order-types";
import { Menu } from "@lib/types/vendor-types";

export const OrderFactory = {
  createOrder(orderId: string, vendorId: string, menus: Menu[], 
      type: string, campusName: string, status: string, senderId: string,
      vendorName: string, timeAdded: Date, address?:string){
    return {
      orderId: orderId,
      vendorId: vendorId,
      menus: menus,
      type: type,
      campusName: campusName,
      status: status,
      senderId: senderId,
      address: address,
      vendorName: vendorName,
      timeAdded: timeAdded,
    }
  },
  createOrderBE(ongoing: Order, history:Order[]){
    return {
      ongoing: ongoing,
      history: history,
    }
  }
}

