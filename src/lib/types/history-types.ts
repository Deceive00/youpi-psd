import { Order } from "./order-types";
import { Vendor } from "./vendor-types";

export interface UserHistory{ 
  vendor: Vendor;
  order: Order;
}