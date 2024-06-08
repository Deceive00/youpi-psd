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
import { Variable } from "lucide-react";

const HistoryPage = () => {
  // [V] Fetch from firebase 'orders'
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

  // [V] Set Image berdasarkan Jenis Category Transaksinya, ambil dari static image krn cuman 2 gambar aja
    // Pick Up (Merah) = pickUpPng
    // Delivery (Orange) = deliveryPng
  const getImage = (sßatus : string) => {
    if(status === "delivery"){
      return deliveryPng
    }else if(status === "pick up"){
      return pickUpPng
    }
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
        {/* Mapping from database */}
        <motion.div className={``} variants={container} initial="hidden" animate="visible">
          <div className={`grid lg:grid-cols-3 grid-cols-1 lg:gap-12 gap-6`}>

          <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>

              <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>

              <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>

              <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>

              <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>

              <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>
            {/* {history?.map((order) => (
              <motion.div variants={item}>
                <OrderCard
                  onClick={modalDetailHandler}
                  imageUrl={pickUpPng}
                  title="Ramen"
                  campusName="Binus Alam Sutera"
                />
              </motion.div>
            ))} */}
          </div>
        </motion.div>
      </div>

      {/* Modal Box */}
      <ModalHistory
        isDetailOpen={isDetailOpen}
        modalDetailHandler={modalDetailHandler}
        modalRef={modalRef}
      />
    </MainLayout>
  );
};

export default HistoryPage;