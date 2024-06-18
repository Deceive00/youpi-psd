import { UserCart } from "@lib/types/user-types";
import { getDocs, collection, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";
export const CartRepository = {
  getCartCollection: async () => {
    return await getDocs(collection(db, "carts"));
  },

  getUserCart: async (userId: string) => {
    const userCartRef = doc(db, "carts", userId);
    return await getDoc(userCartRef);
  },

  setUserCart: async (userId: string, vendorId: string, menuId: string, notes: string) => {
    return await setDoc(doc(db, "carts", userId), {
      vendorId: vendorId,
      menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
    });
  },

  updateUserCartMenus: async (userId: string, menus: any[]) => {
    const userCartRef = doc(db, "carts", userId);
    return await updateDoc(userCartRef, { menus });
  },

  fetchCart: async (id : string) => {
    const userCartRef = doc(db, "carts", id);
    const userCart = await getDoc(userCartRef);

    if (userCart.exists()) {
      return userCart.data() as UserCart;
    } else {
      throw new Error("Cart still null");
    }
  },
  removeCart: async (userRef : any) => {
    await deleteDoc(userRef);
  },
  getCartRef: (id : string) => {
    return doc(db, "carts", id);
  }
  
};