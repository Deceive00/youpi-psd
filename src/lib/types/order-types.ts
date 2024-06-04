import { Menu } from "./vendor-types";

export interface Order{
  vendorId: string;
  menu: Menu[];
  type: string;
  campusName: string;
  status: string;
  senderId: string;
  address?:string;
}