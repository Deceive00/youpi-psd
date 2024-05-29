import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";


export const fetchRestaurantData = async () => {
  const restaurantDoc = await getDocs(collection(db, "campus"));
  return restaurantDoc;
};

export const fetchVendorDataById = async (campusId: string, vendorId: string) => {
  const campusDocRef = doc(db, "campus", campusId); 
  const campusDoc = await getDoc(campusDocRef); 
  if (campusDoc.exists()) {
    const campusData = campusDoc.data();
    const vendor = campusData.vendors.find((v : any) => v.id === vendorId);

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
}
