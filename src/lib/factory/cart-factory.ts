import { MenuCart } from "@lib/types/user-types";

export const CartFactory = {
  createCart:(vendorId: string, menus: MenuCart[]) => {
    return {
      vendorId: vendorId,
      menus: menus
    }
  },
  createMenuCart(menuId: string, menuQuantity: Number, notes: string){
    return {
      menuId: menuId,
      menuQuantity: menuQuantity,
      notes: notes,
    }
  }
  
}