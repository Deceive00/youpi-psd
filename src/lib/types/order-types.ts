import { Menu } from "./vendor-types";

export interface Order{
  vendorId: string;
  menus: Menu[];
  type: string;
  campusName: string;
  status: string;
  senderId: string;
  address?:string;
}

export interface OrderBE{
  ongoing: Order;
  history: Order[];
}