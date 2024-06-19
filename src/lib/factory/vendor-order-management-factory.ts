import { Menu } from "@lib/types/vendor-types"

export const VendorOrderManagementFactory = {
  createMenu(uid: string, name: string, description: string, image: string, price: Number, notes: string, quantity: Number){
    return {
      uid: uid,
      name: name,
      description: description,
      image: image,
      price: price,
      notes: notes,
      quantity: quantity,
    }
  },
  createMenuCategory(name: string, menus: Menu[]){
    return {
      name: name,
      menus: menus,
    }
  },
}