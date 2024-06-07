import MainLayout from "src/layout/main-layout";
import OrderCard from "./finished-order-card";
import pickUpPng from "@assets/images/pick-up.jpg"
import deliveryPng from "@assets/images/delivery.jpg"
import React from "react";
import { motion } from "framer-motion"
import ModalHistory from "./modal-history";
import { container, item } from "@components/variants/staggered-children";

const HistoryPage = () => {
  // [] Fetch from firebase 'orders'

  // [] Use Effect 

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

  return (
    <MainLayout className={`lg:py-16 pt-20 pb-8 overflow-x-hidden`}>
      <div
        className={`w-screen h-max font-nunito box-border mx-auto flex justify-center`}
      >
        {/* Mapping from database */}
        <motion.div
          key={111}
          variants={container}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.5,
          }}
          className={`grid lg:grid-cols-3 gap-12`}
        >
          <motion.div variants={item}>
            <OrderCard
              onClick={modalDetailHandler}
              imageUrl={deliveryPng}
              title="Shoes"
              campusName="Binus Alam Sutera"
            />
          </motion.div>

          {/* 2 */}
          <motion.div variants={item}>
            <OrderCard
              onClick={modalDetailHandler}
              imageUrl={pickUpPng}
              title="Ramen"
              campusName="Binus Alam Sutera"
            />
          </motion.div>

          {/* 3 */}
          <motion.div variants={item}>
            <OrderCard
              onClick={modalDetailHandler}
              imageUrl={deliveryPng}
              title="Shoes"
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

          {/* 2 */}
          <motion.div variants={item}>
            <OrderCard
              onClick={modalDetailHandler}
              imageUrl={deliveryPng}
              title="Shoes"
              campusName="Binus Alam Sutera"
            />
          </motion.div>

          {/* 3 */}
          <motion.div variants={item}>
            <OrderCard
              onClick={modalDetailHandler}
              imageUrl={pickUpPng}
              title="Ramen"
              campusName="Binus Alam Sutera"
            />
          </motion.div>
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
