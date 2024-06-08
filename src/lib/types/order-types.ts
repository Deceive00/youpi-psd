import { Menu } from "./vendor-types";

export interface Order {
  orderId: string;
  vendorId: string;
  menus: Menu[];
  type: string;
  campusName: string;
  status: string;
  timeAdded: {
    seconds : number;
    nanoseconds : number;
  }
  senderId: string;
  address?: string;
  vendorName: string;
}

export interface OrderBE {
  ongoing: Order;
  history: Order[];
}
