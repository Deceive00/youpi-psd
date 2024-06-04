import { MenuCart, UserCart, UserCartFE } from "@lib/types/user-types";
import { Campus, Menu, MenuCategory, Vendor } from "@lib/types/vendor-types";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
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
  const restaurantDoc : QuerySnapshot = await getDocs(collection(db, "campus"));
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
export const updateMenu = async (
  campusId: string,
  vendorId: string,
  updatedMenu: Menu,
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
        const menuIdx = categories.menus.findIndex(
          (m: Menu) => m.uid === updatedMenu.uid
        );
        console.log("menu index", menuIdx);
        restaurantData.vendors[vendorIdx].categories[categoryIdx].menus[
          menuIdx
        ] = updatedMenu;
        console.log(restaurantData.vendors);
        await updateDoc(doc(db, "campus", campusId), {
          vendors: restaurantData.vendors,
        });
        console.log(restaurantData);
        return "Menu succesfully updated!";
      } else {
        throw new Error("Category Not Found");
      }
    } else {
      console.error("Vendor not found in this campus");
      throw new Error("Vendor Not Found");
    }
  }
};
export const deleteMenu = async (
  campusId: string,
  vendorId: string,
  toDeleteMenu: Menu,
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

      const updatedMenu = restaurantData.vendors[vendorIdx].categories[
        categoryIdx
      ].menus.filter((m: any) => m.uid !== toDeleteMenu.uid);
      restaurantData.vendors[vendorIdx].categories[categoryIdx].menus =
        updatedMenu;

      await updateDoc(doc(db, "campus", campusId), {
        vendors: restaurantData.vendors,
      });
      console.log(restaurantData);
      return "Menu succesfully deleted!";
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
  notesUpdated = null,
}: {
  vendorId: string;
  menuId: string;
  notes: string;
  add?: boolean | null;
  notesUpdated?: boolean | null;
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

              if (notesUpdated) {
                console.log("masuk sini ga sih");
                const updatedMenus = [...userCart.data().menus];
                updatedMenus[existingMenuItemIndex].notes = notes;
                console.log(updatedMenus);
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

export const fetchVendorDataByVendorId = async (vendorId: string) => {
  const allCampus = await fetchRestaurantData();
  let found = false;
  let selectedVendor : Vendor | null = null;
  allCampus.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data() as Campus;

    if(data){
      data.vendors.map((vendor : Vendor) => {
        if(vendor.id === vendorId && !found){
          selectedVendor = vendor;
          found = true;
        }
      })
    }
  })

  if(selectedVendor != null){
    
    return selectedVendor;
  }else{
    throw new Error('Vendor Not Found');
  }
}
export const fetchCart = async () => {
  if (auth.currentUser && auth.currentUser.uid) {
    const userCartRef = doc(db, "carts", auth.currentUser.uid);
    const userCart = await getDoc(userCartRef);

    if (userCart.exists()) {
      return userCart.data() as UserCart;
    } else {
      throw new Error("Cart still null");
    }
  } else {
    throw new Error("No user");
  }
}

export const fetchMenuById = () => {
  
}
export const fetchUserCartFE = async () => {
  const dataBE : UserCart = await fetchCart();
  if(dataBE) {
    const vendor : Vendor | null = await fetchVendorDataByVendorId(dataBE.vendorId);
    if(vendor){
      const menuIds : string[] = [];
      dataBE.menus.map((menu : MenuCart) => {
        menuIds.push(menu.menuId);
      });
      let menus : Menu[] = [];

      (vendor as Vendor).categories.map((category : MenuCategory) => {
        category.menus.map((menu : Menu) => {
          if(menuIds.includes(menu.uid)){
            menu.notes = dataBE.menus.find((m : MenuCart) => m.menuId === menu.uid)?.notes || '';
            menus.push(menu);
          }
        })
      })

      return {
        vendor: vendor,
        menus: menus
      } as UserCartFE;
    } else{
      throw new Error("Vendor not found");
    }
  } else {
    throw new Error("User Cart Is Empty")
  }
}