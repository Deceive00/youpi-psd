import { Campus, Menu, MenuCategory } from "@lib/types/vendor-types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";
import { v4 as uuidv4 } from "uuid";
export const fetchRestaurantData = async () => {
  const restaurantDoc = await getDocs(collection(db, "campus"));
  return restaurantDoc;
};

export const fetchVendorDataById = async (
  campusId: string,
  vendorId: string
) => {
  const campusDocRef = doc(db, "campus", campusId);
  const campusDoc = await getDoc(campusDocRef);
  if (campusDoc.exists()) {
    const campusData = campusDoc.data();
    const vendor = campusData.vendors.find((v: any) => v.id === vendorId);

    if (vendor) {
      return vendor;
    } else {
      console.error("Vendor not found in this campus");
      throw new Error("Vendor Not Found");
    }
  } else {
    console.error("No such campus document!");
    return new Error("Campus Not Found");
  }
};

export const addCategory = async (
  campusId: string,
  vendorId: string,
  newCategory: MenuCategory
) => {
  const restaurantDoc = await getDoc(doc(db, "campus", campusId));
  const restaurantData: Campus = restaurantDoc.data() as Campus;
  if (restaurantData) {
    const vendorIdx = restaurantData.vendors.findIndex(
      (v: any) => v.id === vendorId
    );
    const vendor = restaurantData.vendors[vendorIdx];
    if (vendor) {
      const categoryExists = vendor.categories.find(
        (c) => c.name == newCategory.name
      );
      if (categoryExists) {
        throw new Error("Category already exists!");
      }
      const updatedVendor = {
        ...vendor,
        categories: [...vendor.categories, newCategory],
      };
      restaurantData.vendors[vendorIdx] = updatedVendor;

      await updateDoc(doc(db, "campus", campusId), {
        vendors: restaurantData.vendors,
      });
      return "Category succesfully added!";
    } else {
      console.error("Vendor not found in this campus");
      throw new Error("Vendor Not Found");
    }
  }
};

export const addMenu = async (
  campusId: string,
  vendorId: string,
  newMenu: Menu,
  categoryName: string
) => {
  const restaurantDoc = await getDoc(doc(db, "campus", campusId));
  const restaurantData: Campus = restaurantDoc.data() as Campus;
  if (restaurantData) {
    const vendorIdx = restaurantData.vendors.findIndex(
      (v: any) => v.id === vendorId
    );
    const vendor = restaurantData.vendors[vendorIdx];
    if (vendor) {
      const categoryIdx = vendor.categories.findIndex(
        (c: MenuCategory) => c.name === categoryName
      );
      const categories = vendor.categories[categoryIdx];
      if (categories) {
        newMenu.uid = uuidv4();
        const updatedCategories = {
          ...categories,
          menus: [...categories.menus, newMenu],
        };
        restaurantData.vendors[vendorIdx].categories[categoryIdx] =
          updatedCategories;
        await updateDoc(doc(db, "campus", campusId), {
          vendors: restaurantData.vendors,
        });
        console.log(restaurantData);
        return "Menu succesfully added!";
      } else {
        throw new Error("Category Not Found");
      }
    } else {
      console.error("Vendor not found in this campus");
      throw new Error("Vendor Not Found");
    }
  }
};

export const addCart = async ({
  vendorId,
  menuId,
  notes,
  add = null,
}: {
  vendorId: string;
  menuId: string;
  notes: string;
  add?: boolean | null;
}) => {
  const cartCollection = await getDocs(collection(db, "carts"));
  if (cartCollection && cartCollection.empty) {
    if (auth.currentUser && auth.currentUser.uid) {
      await setDoc(doc(db, "carts", auth.currentUser.uid), {
        vendorId: vendorId,
        menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
      });
    }
  } else {
    if (auth.currentUser && auth.currentUser.uid) {
      const userCartRef = doc(db, "carts", auth.currentUser.uid);
      const userCart = await getDoc(userCartRef);
      if (userCart.exists()) {
        if (userCart.data().vendorId === vendorId) {
          if (userCart.data().menus.length > 0) {
            const existingMenuItemIndex = userCart
              .data()
              .menus.findIndex((item: any) => item.menuId === menuId);

            if (existingMenuItemIndex !== -1) {
              if (add !== null) {
                const updatedMenus = [...userCart.data().menus];
                if (add) {
                  updatedMenus[existingMenuItemIndex].menuQuantity++;
                } else {
                  updatedMenus[existingMenuItemIndex].menuQuantity--;

                  if (updatedMenus[existingMenuItemIndex].menuQuantity <= 0) {
                    updatedMenus.splice(existingMenuItemIndex, 1);
                  }
                }
                await updateDoc(userCartRef, { menus: updatedMenus });
              }
            } else {
              const newMenu = {
                menuId: menuId,
                menuQuantity: 1,
                notes: notes,
              };
              const updatedMenus = [...userCart.data().menus, newMenu];
              await updateDoc(userCartRef, { menus: updatedMenus });
            }
          } else {
            await updateDoc(userCartRef, {
              menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
            });
          }
        } else {
          await setDoc(doc(db, "carts", auth.currentUser.uid), {
            vendorId: vendorId,
            menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
          });
        }
      } else {
        await setDoc(doc(db, "carts", auth.currentUser.uid), {
          vendorId: vendorId,
          menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
        });
      }
    }
  }
};
