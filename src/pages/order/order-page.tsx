import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import MainLayout from "src/layout/main-layout";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useMemo, useRef, useState } from "react";
import RestaurantCard, { RestaurantCardSkeleton } from "./restaurant-card";
import { useQuery } from "react-query";
import { fetchRestaurantData } from "@lib/services/vendor.service";
import { LuChevronDown } from "react-icons/lu";
export default function Order() {
  const [restaurantData, setRestaurantData] = useState([] as any[]);
  const cardReferenceFade = useRef(null);

  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [cardReferenceFade]
  );

  useEffect(() => {
    if (cardReferenceFade.current) {
      observer.observe(cardReferenceFade.current);
    }
    return () => {
      if (cardReferenceFade.current) {
        observer.unobserve(cardReferenceFade.current);
      }
    };
  }, []);

  const { isLoading, isFetching } = useQuery(
    ["fetchRestaurantData"],
    () => fetchRestaurantData(),
    {
      onSuccess: (data) => {
        setRestaurantData(
          data.docs.map((doc) => {
            return doc.data();
          })
        );
      },
      onError: (error: any) => {
        console.error("Restaurant fetch failed!", error);
      },
    }
  );

  const showSkeleton = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <RestaurantCardSkeleton key={index} />
    ));
  };
  return (
    <MainLayout className={"pt-14 sm:pt-16"}>
      <div className="w-full font-nunito ">
        <div className="px-0 md:px-6 sm:py-2 w-full flex justify-center items-center h-80 sm:h-[28rem]">
          <img
            className="sm:rounded-md h-full object-bottom object-cover w-full"
            src={
              "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg"
            }
          />
        </div>
        <div className="relative h-full w-full flex flex-col justify-start items-center">
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
          <div className="mt-14 sm:mt-16 w-full h-auto flex flex-col items-center px-4 ">
            <div className="mt-14 text-xl sm:text-2xl md:text-4xl font-bold">
              We've got <span className="text-red-500">restaurants</span>{" "}
              waiting for your order
            </div>
            <div className="w-full flex flex-col items-start md:items-center justify-start h-[300px] md:h-auto">
              <div className="flex w-[95%] md:w-auto h-full md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-start md:justify-center mt-2 md:mt-8 overflow-x-auto overflow-y-hidden py-4">
                {(isLoading || isFetching) && showSkeleton()}
                {!isLoading && (
                  <>
                    {restaurantData.length > 0 &&
                      restaurantData
                        .flatMap((restaurant) => restaurant.vendors)
                        .map((vendor, index) => (
                          <RestaurantCard vendor={vendor} key={index} />
                        ))}
                    
                  </>
                )}
              </div>
            </div>
            <div
              ref={cardReferenceFade}
              className="bg-transparent h-1 w-full"
            ></div>
          </div>
        </div>
        <LuChevronDown
          className={`md:block hidden w-14 h-14 bottom-[2vh] right-4 fixed animate-bounce transition-all duration-1000 ${
            isIntersecting ? "opacity-0" : "opacity-100"
          } text-orange-500`}
        />
      </div>
    </MainLayout>
  );
}
