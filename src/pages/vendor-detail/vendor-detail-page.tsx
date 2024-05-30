import { fetchVendorDataById } from "@lib/services/vendor.service";
import { Vendor } from "@lib/types/vendor-types";
import RestaurantCard from "@pages/order/restaurant-card";
import React, { useState } from "react";
import { GrRestaurant } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import MainLayout from "src/layout/main-layout";

export default function VendorDetailPage() {
  const { campusId, vendorId } = useParams();
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  if (!campusId || !vendorId) {
    return <div>404 Not Found</div>;
  }

  const { isLoading } = useQuery(
    ["fetchVendorData"],
    () => fetchVendorDataById(campusId, vendorId),
    {
      onSuccess: (data: Vendor) => {
        console.log(data);
        setVendorData(data);
      },
      onError: (error: any) => {
        console.log("Error fetching vendor data ", error.message);
      },
    }
  );

  return (
    <MainLayout className={`pt-14 `}>
      <div className="w-full font-nunito ">
        <div className="px-0 md:px-6 sm:py-2 w-full flex justify-center items-center h-80 sm:h-[28rem]">
          <img
            className="sm:rounded-md h-full object-top object-cover w-full"
            src={vendorData?.coverImage}
          />
        </div>
        <div className="font-nunito relative w-full flex flex-col justify-start items-center">
          <div className="absolute w-[95%] -top-10 sm:w-3/4 h-20 sm:h-18 sm:-top-14 lg:w-[65%] lg:h-auto lg:-top-14 shadow-md z-3 bg-white rounded-xl border p-5 transition-all ease-in-out duration-500 flex justify-between items-center">
            <div className="flex justify-center items-center gap-3">
              <GrRestaurant className="w-10 h-10 mb-1 text-[#E81A1C]" />
              <div className="text-base">
                <p className="font-bold">
                  {vendorData?.name}, {vendorData?.campusName}
                </p>
                <p className="text-sm">description</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col justify-center items-center px-5 border-r-2">
                <div className="text-base flex justify-center items-center gap-2">
                  <IoIosStar className="h-6 w-6 text-yellow-400" />
                  <div className="font-bold">
                    {vendorData?.rating as React.ReactNode}
                  </div>
                </div>
                <div className="text-xs">Rating & Reviews</div>
              </div>
              <div className="flex flex-col justify-center items-center px-5 border-r-2">
                <div className="text-base flex justify-center items-center gap-2 font-bold">
                  ±10 minutes
                </div>
                <div className="text-xs">Order Processed</div>
              </div>
              <div className="flex flex-col justify-center items-center pl-5">
                <div className="font-bold text-base flex justify-center items-center gap-2">
                  09.00 - 18.00
                </div>
                <div className="text-xs">Operating Hours</div>
              </div>
            </div>
          </div>
          <div className="mt-14 sm:mt-16 w-full h-auto px-20 flex">
            <div className="shadow-md w-1/4 p-5 h-60 mt-5 bg-white sticky top-20">
              card filter
            </div>
            <div className="w-3/4 p-5 grid grid-cols-4 gap-3">
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
              <div className="shadow-md h-72 border rounded-lg bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
