import { fetchVendorDataById } from "@lib/services/vendor.service";
import { Vendor } from "@lib/types/vendor-types";
import { useState } from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import MainLayout from "src/layout/main-layout";

export default function VendorDetailPage() {
  const { campusId, vendorId  } = useParams();
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  if(!campusId || !vendorId){
    return <div>404 Not Found</div>
  }
  
  const {isLoading} = useQuery(['fetchVendorData'], () => fetchVendorDataById(campusId, vendorId), {
    onSuccess: (data : Vendor) => {
      console.log(data);
      setVendorData(data);
    },
    onError:(error : any) => {
      console.log('Error fetching vendor data ' , error.message);
    }
  });

  return (
    <MainLayout className={`pt-14 `}>
      <div className="w-full font-nunito ">
        <div className="px-0 md:px-6 sm:py-2 w-full flex justify-center items-center h-80 sm:h-[28rem]">
          <img
            className="sm:rounded-md h-full object-top object-cover w-full"
            src={
              vendorData?.coverImage
            }
          />
        </div>
        
      </div>
    </MainLayout>
  ) 
}
