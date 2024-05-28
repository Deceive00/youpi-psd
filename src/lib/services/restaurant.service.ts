import { collection, getDocs } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";


export const fetchRestaurantData = async () => {
  const restaurantDoc = await getDocs(collection(db, "campus"));
  return restaurantDoc;
};
