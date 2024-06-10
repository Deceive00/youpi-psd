import { Separator } from "@radix-ui/react-select";
import ModalBox from "./modal-box";
import RatingStars from "./rating-stars";
import { FaShop } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import React from "react";
import dummyImg from "@assets/images/default.png";
import { UserHistory } from "@lib/types/history-types";
import { fetchUserByID } from "@lib/services/user.service";
import { Menu } from "@lib/types/vendor-types";
import { User } from "@lib/types/user-types";

interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  modalDetailHandler: () => void;
  isDetailOpen: boolean;
  userHistory: UserHistory;
}

export const calculateTotalPrice = (menus: Menu[]): number => {
  return menus.reduce((total, menu) => {
    return total + Number(menu.price) * menu.quantity;
  }, 0);
};

const ModalHistory: React.FC<Props> = ({
  modalRef,
  modalDetailHandler,
  isDetailOpen,
  userHistory,
}) => {
  // State
  const fee = 5000;
  const [senderData, setSenderData] = React.useState<User | null>(null)

  React.useEffect(() => {
    const fetchUserData = async () => {
      if(userHistory){
        const data = await fetchUserByID(userHistory.order.senderId)
        setSenderData(data || null)
      }
    }

    fetchUserData()
  }, [userHistory])

  return (
    <ModalBox
      userHistory={userHistory}
      modalRef={modalRef}
      title="Order Summary"
      onClose={modalDetailHandler}
      isOpen={isDetailOpen}
    >
      {/* 1. Rating for Both Vendor and Sender*/}
      <div className={`flex flex-col gap-y-6 py-4`}>
        {/* Vendor */}
        <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <span className={`font-normal text-center`}>
            <b>How was the food?</b>
            <br />
            (1 is dissapointing, 5 is awesome)
          </span>
          <RatingStars name="food-rating" key={1} />
        </div>

        {/* Sender */}
        <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <span className={`font-normal text-center`}>
            <b>How was the driver?</b>
            <br />
            (1 is dissapointing, 5 is awesome)
          </span>
          <RatingStars name="driver-rating" key={2} />
        </div>
      </div>
      <Separator className="border-[0.5px] rounded-lg" />

      {/* 2. Detail for Vendor and Sender*/}
      <div className={`py-6 text-slate-600 flex flex-col gap-y-6`}>
        {/* Detail for Vendor */}
        <div className={`w-full flex flex-row gap-x-2 items-center text-sm`}>
          <img
            className="w-8 h-8 rounded-full"
            src={userHistory.vendor.coverImage}
            alt=""
          />
          <div className="text-slate-600">
            <h1 className={`font-normal text-black`}>
              {userHistory.vendor.name}
            </h1>
            <span>{userHistory.vendor.campusName}</span>
          </div>
        </div>

        {/* Detail for Sender */}
        <div className={`w-full flex flex-row gap-x-2 items-center text-sm`}>
          <img className="w-8 h-8 rounded-full" src={dummyImg} alt="" />
          <div className="text-slate-600">
            <h1 className={`font-normal text-black`}>
              {senderData?.firstName} {senderData?.lastName}
            </h1>
            <span>{userHistory.order.campusName}</span>
          </div>
        </div>
      </div>
      <Separator className="border-[0.5px] rounded-lg" />

      {/* 3. Delivery Detail */}
      <div className={`text-slate-600 flex flex-col gap-y-4 py-4`}>
        <p className={`font-semibold`}>Delivery details</p>
        <div className={`flex flex-row items-center gap-x-4`}>
          <FaShop className={`text-2xl text-[#e71b1c]`} />
          <div className={`flex flex-col`}>
            <span className={`text-sm`}>Restaurant location</span>
            <h2 className={`font-bold text-black`}>
              {userHistory.order.vendorName}
            </h2>
          </div>
        </div>

        <div className={`flex flex-row items-center gap-x-4`}>
          <MdMyLocation className={`text-2xl text-primary`} />
          <div className={`flex flex-col  text-sm`}>
            <span className={`text-sm`}>Delivery location</span>
            <h2 className={`font-bold text-black`}>
              {userHistory.order.address}
            </h2>
          </div>
        </div>
      </div>
      <Separator className="border-[0.5px] rounded-lg" />

      {/* 4. Purchase Detail */}
      <div className={`text-slate-600 flex flex-col gap-y-4 py-4`}>
        <p className={`font-semibold`}>Purchase Details</p>
        <div className={`flex flex-col text-sm`}>
          {/* Map from menus that been ordered */}
          {userHistory.order.menus.map((menu: Menu, index: number) => (
            <div className="flex flex-row w-full justify-between" key={index}>
              <h6>{menu.name}</h6>
              <span>{menu.quantity}</span>
            </div>
          ))}
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
            <span>{calculateTotalPrice(userHistory.order.menus)}</span>
          </div>

          <div className="flex flex-row w-full justify-between">
            <h6>Handling and delivery fee</h6>
            <span>{fee}</span>
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
          <span>{calculateTotalPrice(userHistory.order.menus) - fee}</span>
        </div>
      </div>
    </ModalBox>
  );
};

export default ModalHistory;
