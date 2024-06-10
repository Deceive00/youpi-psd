import MainLayout from "src/layout/main-layout";
import OrderCard from "./finished-order-card";
import pickUpPng from "@assets/images/pick-up.jpg"
import deliveryPng from "@assets/images/delivery.jpg"
import React, { useState } from "react";
import { UserHistory } from "@lib/types/history-types";
import { useQuery } from "react-query";
import { getAllUserHistory } from "@lib/services/history.service";
import Loader from "@components/loading/loader";
import { motion } from "framer-motion";
import { item, container } from "@components/variants/staggered-children";
import ModalHistory from "./modal-history";
import { useAuth } from "@lib/hooks/useAuth";

// [V] Function to capitalize the first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const HistoryPage = () => {
  // [V] Fetch from firebase 'orders'
  const [history, setHistory] = useState<UserHistory[] | null>(null);
  const {isLoading : userLoading} = useAuth();
  const {isLoading} = useQuery(['fetchUserHistory'], async() => await getAllUserHistory(), {
    enabled:!userLoading,
    retry:true,
    staleTime:0,
    onSuccess:(data : UserHistory[]) => {    
      setHistory(data);

      console.log(data);
      
    },
    onError:(error: Error) => {
      console.log(error);
    }
  })

  // [V] Set Image berdasarkan Jenis Category Transaksinya, ambil dari static image krn cuman 2 gambar aja
    // Pick Up (Merah) = pickUpPng
    // Delivery (Orange) = deliveryPng
  const getImage = (status : string) => {
    if(status === "delivery"){
      return deliveryPng
    }else if(status === "pick up"){
      return pickUpPng
    }

    return ""
  }

  // Reorder Handler

  // [V] State for Viewing Detail Handler
  const [isDetailOpen, setIsDetailOpen] = React.useState(true)
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

  // [V] State for UserHistory
  const [userHistory, setUserHistory] = React.useState<UserHistory>() 

  const handleOrderCardClick = (order: UserHistory) => {
    setUserHistory(order);
    modalDetailHandler();
  }

  // Calculate Total Price for each Transaction

  if(isLoading || userLoading){
    return <Loader/>
  }
  return (
    <MainLayout className={`lg:py-20 pt-20 pb-8 overflow-x-hidden`}>
      <div
        className={`w-screen h-max font-nunito box-border mx-auto flex justify-center`}
      >
        {/* Mapping from database */}
        <motion.div
          className={``}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className={`grid lg:grid-cols-3 grid-cols-1 lg:gap-12 gap-6`}>
            {history?.map((order, key) => (
              <motion.div variants={item} key={key}>
                <OrderCard
                  userHistory={order}
                  onClick={handleOrderCardClick}
                  imageUrl={getImage(order.order.type)}
                  title={`${capitalizeFirstLetter(order.order.type)}`}
                  campusName={`${order.order.campusName} - ${order.order.vendorName}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal Box */}
      {userHistory && (
        <ModalHistory
          userHistory={userHistory}
          isDetailOpen={isDetailOpen}
          modalDetailHandler={modalDetailHandler}
          modalRef={modalRef}
        />
      )}
    </MainLayout>
  );
};

export default HistoryPage;