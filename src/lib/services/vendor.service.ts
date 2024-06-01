import { Campus, Menu, MenuCategory } from "@lib/types/vendor-types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "src/firebase/firebase-config";
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

      const updatedMenu = restaurantData.vendors[vendorIdx].categories[categoryIdx].menus.filter((m: any) => m.uid !== toDeleteMenu.uid);
      restaurantData.vendors[vendorIdx].categories[categoryIdx].menus = updatedMenu;

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
