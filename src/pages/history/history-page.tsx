import MainLayout from "src/layout/main-layout";
import OrderCard from "./finished-order-card";
import pickUpPng from "@assets/images/pick-up.jpg"
import deliveryPng from "@assets/images/delivery.jpg"
import React, { useState } from "react";
import ModalBox from "./modal-box";
import { Separator } from "@radix-ui/react-select";
import RatingStars from "./rating-stars";
import { FaShop } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import dummyImg from "@assets/images/default.png"
import { UserHistory } from "@lib/types/history-types";
import { useQuery } from "react-query";
import { getAllUserHistory } from "@lib/services/history.service";
import Loader from "@components/loading/loader";

const HistoryPage = () => {
  // [] Fetch from firebase 'orders'
  const [history, setHistory] = useState<UserHistory[] | null>(null);
  const {isLoading} = useQuery(['fetchUserHistory'], async() => await getAllUserHistory(), {
    retry:false,
    staleTime:0,
    onSuccess:(data : UserHistory[]) => {
      setHistory(data);
    },
    onError:(error: Error) => {
      console.log(error);
    }
  })
  // [] Use Effect 

  // [V] Set Image berdasarkan Jenis Category Transaksinya, ambil dari static image krn cuman 2 gambar aja
    // Pick Up (Merah) = pickUpPng
    // Delivery (Orange) = deliveryPng
  const getImage = (status : string) => {
    if(status === "delivery"){
      return deliveryPng
    }else if(status === "pick up"){
      return pickUpPng
    }
  }

  // Reorder Handler

  // [V] State for Viewing Detail Handler
  const [isDetailOpen, setIsDetailOpen] = useState(true)
  const modalRef = React.useRef<HTMLDialogElement>(null)
  
  const modalDetailHandler =  async () => {
    await setIsDetailOpen(!isDetailOpen);

    if(modalRef.current && isDetailOpen === true){
      modalRef.current.showModal();
    }else if(modalRef.current && isDetailOpen === false){
      modalRef.current.close();
    }

    console.log(isDetailOpen);
  }

  // Calculate Total Price for each Transaction

  // [ !! ] Make DUMMY DATA
  if(isLoading){
    return <Loader/>
  }
  return (
    <MainLayout className={`lg:py-16 pt-20 pb-8 overflow-x-hidden`}>
      <div
        className={`w-screen h-max font-nunito box-border mx-auto flex justify-center`}
      >
        <div className={`grid lg:grid-cols-3 gap-12`}>
          <OrderCard
            onClick={modalDetailHandler}
            imageUrl={deliveryPng}
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          {/* 2 */}
          <OrderCard
            onClick={modalDetailHandler}
            imageUrl={pickUpPng}
            title="Ramen"
            campusName="Binus Alam Sutera"
          />

          {/* 3 */}
          <OrderCard
            onClick={modalDetailHandler}
            imageUrl={deliveryPng}
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          <OrderCard
            onClick={modalDetailHandler}
            imageUrl={pickUpPng}
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          {/* 2 */}
          <OrderCard
            onClick={modalDetailHandler}
            imageUrl={deliveryPng}
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          {/* 3 */}
          <OrderCard
            onClick={modalDetailHandler}
            imageUrl={pickUpPng}
            title="Shoes"
            campusName="Binus Alam Sutera"
          />
        </div>
      </div>

      {/* Modal Box */}
      <ModalBox modalRef={modalRef} title="Order Summary" onClose={modalDetailHandler} isOpen={isDetailOpen}>
        {/* 1. Rating for Both Vendor and Sender*/}
        <div className={`flex flex-col gap-y-6 py-4`}>
          {/* Vendor */}
          <div className="flex flex-col w-full justify-center items-center gap-y-2">
            <span className={`font-normal text-center`}><b>How was the food?</b><br/>(1 is dissapointing, 5 is awesome)</span>
            <RatingStars key={1}/>
          </div>

          {/* Sender */}
          <div className="flex flex-col w-full justify-center items-center gap-y-2">
            <span className={`font-normal text-center`}><b>How was the driver?</b><br/>(1 is dissapointing, 5 is awesome)</span>
            <RatingStars key={2}/>
          </div>
        </div>
        <Separator className="border-[0.5px] rounded-lg" />

        {/* 2. Detail for Vendor and Sender*/}
        <div className={`py-6 text-slate-600 flex flex-col gap-y-6`}>
          {/* Detail for Vendor */}
          <div className={`w-full flex flex-row gap-x-2 items-center text-sm`}>
            <img 
            className="w-8 h-8 rounded-full"
            src={dummyImg} alt="" />
            <div className="text-slate-600">
              <h1 className={`font-normal text-black`}>Soto Mie Bogor Pak Kadir Kosambi</h1>
              <span>BINUS Alam Sutera</span>
            </div>
          </div>

          {/* Detail for Sender */}
          <div className={`w-full flex flex-row gap-x-2 items-center text-sm`}>
            <img 
            className="w-8 h-8 rounded-full"
            src={dummyImg} alt="" />
            <div className="text-slate-600">
              <h1 className={`font-normal text-black`}>Soto Mie Bogor Pak Kadir Kosambi</h1>
              <span>BINUS Alam Sutera</span>
            </div>
          </div>
        </div>
        <Separator className="border-[0.5px] rounded-lg" />

        {/* 3. Delivery Detail */}
        <div className={`text-slate-600 flex flex-col gap-y-4 py-4`}>
          <p className={`font-semibold`}>
            Delivery details
          </p>
          <div className={`flex flex-row items-center gap-x-4`}>
            <FaShop className={`text-2xl text-[#e71b1c]`}/>
            <div className={`flex flex-col`}>
              <span className={`text-sm`}>Restaurant location</span>
              <h2 className={`font-bold text-black`}>Soto Mie Bogor Pak Kadir Kosambi</h2>
            </div>
          </div>

          <div className={`flex flex-row items-center gap-x-4`}>
            <MdMyLocation className={`text-2xl text-primary`}/>
            <div className={`flex flex-col  text-sm`}>
              <span className={`text-sm`}>Delivery location</span>
              <h2 className={`font-bold text-black`}>A1305</h2>
            </div>
          </div>
        </div>
        <Separator className="border-[0.5px] rounded-lg" />

        {/* 4. Purchase Detail */}
        <div className={`text-slate-600 flex flex-col gap-y-4 py-4`}>
          <p className={`font-semibold`}>Purchase Details</p>
          <div className={`flex flex-col text-sm`}>
            {/* Map from menus that been ordered */}
            <div className="flex flex-row w-full justify-between">
              <h6>Soto Mie Special</h6>
              <span>3</span>
            </div>

            <div className="flex flex-row w-full justify-between">
              <h6>Risol</h6>
              <span>6</span>
            </div>
          </div>
        </div>

        <Separator className="border-[0.5px] rounded-lg" />

        {/* 5. Payment Details */}
        <div className={`text-slate-600 flex flex-col gap-y-4 py-4 text-sm`}>
          <p className={`font-semibold text-base`}>Payment Details</p>
          <div className={`flex flex-col`}>
            {/* Map from menus that been ordered */}
            <div className="flex flex-row w-full justify-between">
              <h6>Price</h6>
              <span>141.000</span>
            </div>

            <div className="flex flex-row w-full justify-between">
              <h6>Handling and delivery fee</h6>
              <span>15.000</span>
            </div>

            <div className="flex flex-row w-full justify-between">
              <h6>Discounts</h6>
              <span>-0.000</span>
            </div>
          </div>
        </div>
        <Separator className="border-[0.5px] rounded-lg" />
        {/* Total Payment */}
        <div className={`py-4 text-sm font-bold text-slate-600`}>
          <div className="flex flex-row w-full justify-between">
              <h6>Total Payment</h6>
              <span>156.000</span>
            </div>
        </div>
      </ModalBox>
    </MainLayout>
  );
};

export default HistoryPage;
