import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import MainLayout from "src/layout/main-layout";
import { IoLocationSharp } from "react-icons/io5";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";
import { useEffect, useState } from "react";
import RestaurantCard from "./restaurant-card";

export default function Order() {
  const [restaurantData, setRestaurantData] = useState([] as any[]);

  const fetchRestaurantData = async () => {
    try {
      const restaurantDoc = await getDocs(collection(db, "campus"));
      if (restaurantDoc) {
        setRestaurantData(
          restaurantDoc.docs.map((doc) => {
            console.log(doc.data());
            return doc.data();
          })
        );
        // restaurantDoc.docs.map((doc) => {
        //   console.log(doc.data());
        // });
      }
    } catch (error) {
      console.log("Error fetching restaurant data: ", error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <MainLayout className={"pt-14 sm:pt-16"}>
      <div className="w-full font-nunito">
        <div className="px-0 md:px-6 sm:py-2 w-full flex justify-center items-center h-80 sm:h-[28rem]">
          <img
            className="sm:rounded-md h-full object-bottom object-cover w-full"
            src={
              "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg"
            }
          />
        </div>
        <div className="relative h-screen w-full flex flex-col justify-center items-center">
          <div className="absolute w-[95%] -top-10 sm:w-3/4 h-20 sm:h-18 sm:-top-14 lg:w-[65%] lg:h-20 lg:-top-14 gap-3 shadow-md z-3 bg-white rounded-xl border p-3 transition-all ease-in-out duration-500 flex flex-col justify-center items-center">
            <div className="flex items-center justify-center gap-3 w-full">
              <Input
                id="search"
                type="search"
                required
                className="w-full"
                placeholder="Enter your location"
                leftIcon={
                  <IoLocationSharp className="h-5 w-5 text-orange-700" />
                }
              />
              <Button className="text-md font-bold rounded-md w-1/4 h-full">
                Explore
              </Button>
            </div>
          </div>
          <div className="mt-28 sm:mt-16 w-full h-full flex flex-col items-center px-4 ">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              We've got <span className="text-red-500">restaurants</span>{" "}
              waiting for your order
            </div>
            <div className="w-full  h-[80%] flex flex-col items-center justify-start">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 h-[80%] items-center justify-center mt-6 sm:mt-10">
                {restaurantData.length > 0 &&
                  restaurantData
                    .flatMap((restaurant) => restaurant.vendors)
                    .map((vendor, index) => (
                      <RestaurantCard vendor={vendor} key={index} />
                    ))}
                {restaurantData.length > 0 &&
                  restaurantData
                    .flatMap((restaurant) => restaurant.vendors)
                    .map((vendor, index) => (
                      <RestaurantCard vendor={vendor} key={index} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
