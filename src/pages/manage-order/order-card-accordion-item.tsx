import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { getTotalPriceMenu } from "@lib/services/price.service";
import { Order } from "@lib/types/order-types";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { capitalizeFirstChar } from "@lib/utils/formatter";
import MenuCard from "@pages/vendor-detail/menu-card";
import { GiCardPickup } from "react-icons/gi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { IoFastFoodOutline } from "react-icons/io5";
import { DELIVERY_STATUS, DELIVERY_STATUS_LIST, PICKUP_STATUS } from "@lib/services/order.service";

interface props {
  index: number;
  order: Order;
  vendor: Vendor;
}

export default function OrderCardAccordionItem({ index, order, vendor }: props) {
  const renderType = (type: string) => {
    const isDelivery = type === "delivery";
    return (
      <div
        className={`rounded-lg p-[0.25rem] ${
          isDelivery ? "bg-orange-100 border-2 border-orange-200" : "bg-red-200"
        } flex flex-row items-center justify-center gap-2`}
      >
        {isDelivery ? (
          <MdOutlineDeliveryDining className="h-5 w-5" />
        ) : (
          <GiCardPickup className="h-5 w-5" />
        )}
        <p className="font-bold text-[0.7rem]">{capitalizeFirstChar(type)}</p>
      </div>
    );
  };
  const getButtonText = () => {
    if(order.status === DELIVERY_STATUS.WAITING_CONFIRMATION || order.status === PICKUP_STATUS.WAITING_CONFIRMATION){
      return 'Accept Order'
    }else{
      return 'Update Status'
    }
  }
  const handleUpdateStatus = () => {
    if(order.type === 'delivery'){
      const statusIdx = DELIVERY_STATUS_LIST.findIndex((status : string) => status === order.status);
      console.log(DELIVERY_STATUS_LIST[statusIdx + 1]);
      
    } else {

    }
  }
  return (
    <AccordionItem value={index.toString()} className="mb-4 hover:translate-y-[1px] transition-all duration-200 z-10">
      <AccordionTrigger className="border rounded-md p-4 hover:no-underline">
        <div className="text-left flex gap-4 flex-col">

          <h4 className="font-bold md:text-lg text-base">{order.campusName}</h4>
          <p className="text-sm md:text-base flex items-center gap-2"><GrStatusInfo className="w-5 h-5"/> {capitalizeFirstChar(order.status)}</p>
          <p className="text-sm md:text-base flex items-center gap-2"><IoFastFoodOutline className="w-5 h-5"/> {order.menus.length} Menus</p>
          <div className="text-sm d:text-base flex items-center gap-2"><MdOutlinePriceChange className="w-5 h-5"/> {getTotalPriceMenu(order.menus)}</div>
        </div>
        <div className="flex justify-between flex-col h-full">
          <div className="">{renderType(order.type)}</div>
          <Button className="font-bold text-[0.8rem] md:text-sm" onClick={() => handleUpdateStatus()
            }>{getButtonText()}</Button>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 rounded-md grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-3 font-nunito transition-all duration-300 ease-in-out">
        {order.menus.map((menu: Menu) => (
          <MenuCard key={menu.uid} menuItem={menu} vendorData={vendor} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
