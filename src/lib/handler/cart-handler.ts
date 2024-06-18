import { CartRepository } from "@lib/repository/cart-repository";
import { getDoc } from "firebase/firestore";
import { auth } from "src/firebase/firebase-config";


interface AddCartParams {
  vendorId: string;
  menuId: string;
  notes: string;
  add?: boolean | null;
  notesUpdated?: boolean | null;
}

export const CartHandler = {
  addCart:async ({
    vendorId,
    menuId,
    notes,
    add = null,
    notesUpdated = null,
  }: AddCartParams) => {
    const cartCollection = await CartRepository.getCartCollection();
  
    if (cartCollection && cartCollection.empty) {
      if (auth.currentUser && auth.currentUser.uid) {
        await CartRepository.setUserCart(auth.currentUser.uid, vendorId, menuId, notes);
      }
    } else {
      if (auth.currentUser && auth.currentUser.uid) {
        const userId = auth.currentUser.uid;
        const userCart = await CartRepository.getUserCart(userId);
  
        if (userCart.exists()) {
          if (userCart.data().vendorId === vendorId) {
            const existingMenus = userCart.data().menus;
            const existingMenuItemIndex = existingMenus.findIndex((item: any) => item.menuId === menuId);
  
            if (existingMenuItemIndex !== -1) {
              if (add !== null) {
                const updatedMenus = [...existingMenus];
                if (add) {
                  updatedMenus[existingMenuItemIndex].menuQuantity++;
                } else {
                  updatedMenus[existingMenuItemIndex].menuQuantity--;
                  if (updatedMenus[existingMenuItemIndex].menuQuantity <= 0) {
                    updatedMenus.splice(existingMenuItemIndex, 1);
                  }
                }
                await CartRepository.updateUserCartMenus(userId, updatedMenus);
              }
  
              if (notesUpdated) {
                const updatedMenus = [...existingMenus];
                updatedMenus[existingMenuItemIndex].notes = notes;
                await CartRepository.updateUserCartMenus(userId, updatedMenus);
              }
            } else {
              const newMenu = { menuId: menuId, menuQuantity: 1, notes: notes };
              const updatedMenus = [...existingMenus, newMenu];
              await CartRepository.updateUserCartMenus(userId, updatedMenus);
            }
          } else {
            await CartRepository.setUserCart(userId, vendorId, menuId, notes);
          }
        } else {
          await CartRepository.setUserCart(userId, vendorId, menuId, notes);
        }
      }
    }
  },
  getUserCart: async () => {
    if (auth.currentUser && auth.currentUser.uid) {
      await CartRepository.fetchCart(auth.currentUser.uid);
    } else {
      throw new Error("No user");
    }
  },
  removeCart: async () => {
    const id = auth.currentUser?.uid;
    if (id) {
      const userRef = CartRepository.getCartRef(id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await CartRepository.removeCart(userRef)
      } else {
        throw new Error("Cart Not Found");
      }
    } else {
      throw new Error("User ID not found");
    }
  }
}
