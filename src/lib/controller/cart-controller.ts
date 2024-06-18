import { CartHandler } from "@lib/handler/cart-handler";

interface AddCartParams {
  vendorId: string;
  menuId: string;
  notes: string;
  add?: boolean | null;
  notesUpdated?: boolean | null;
}

export const CartController = {
  addCart:async ({
    vendorId,
    menuId,
    notes,
    add = null,
    notesUpdated = null,
  }: AddCartParams) => {
    
    await CartHandler.addCart({vendorId, menuId, notes, add, notesUpdated})
  },
  getUserCart: async () => {
    return await CartHandler.getUserCart()
  },
  removeCart: async () => {
    return await CartHandler.removeCart();
  }
}



