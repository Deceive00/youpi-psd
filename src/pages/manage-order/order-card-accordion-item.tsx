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
import { getNewStatus, hideUpdateButton, isAcceptOrder, updateOrderStatus } from "@lib/services/order.service";
import { useState } from "react";
import SwitchStatus from "@components/popup/switch-status-popup";
import { useMutation } from "react-query";
import { useAuth } from "@lib/hooks/useAuth";
import { useToast } from "@components/ui/use-toast";

interface props {
  index: number;
  order: Order;
  vendor: Vendor;
}

export default function OrderCardAccordionItem({ index, order, vendor }: props) {
  const [showDialog, setShowDialog] = useState(false);
  const {userType, user} = useAuth();
  const {toast} = useToast();
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
    if(isAcceptOrder(order.type, order.status, userType)){
      return 'Accept Order'
    }else{
      return 'Update Status'
    }
  }


  const {mutate: handleUpdateStatus} = useMutation(async() => {
    updateOrderStatus(order, userType)
  },{
    onSuccess:() => {
      console.log("Sukses")
      setShowDialog(false);
      const isAccept = isAcceptOrder(order.type,order.status, userType);
      toast({
        title: isAccept ? 'Succesfully Accepted Order' : 'Succesfully Changed Order Status',
        description: isAccept ? '' : 'Order status changed to ' + getNewStatus(order.type,order.status),
        variant:'success'
      })
    },
    onError:(error: Error) => {
      console.error(error.message)
      toast({
        title: 'Action Failed',
        description: error.message,
        variant:'error'
      })
    }
  })

  return (
    <AccordionItem value={index.toString()} className="mb-4 hover:translate-y-[1px] transition-all duration-200 z-10">
      <AccordionTrigger className="border rounded-md p-4 hover:no-underline">
        <div className="text-left flex gap-4 flex-col">
          <h4 className="font-bold md:text-lg text-base">{order.campusName} - {user?.name}</h4>
          <p className="text-sm md:text-base flex items-center gap-2"><GrStatusInfo className="w-5 h-5"/> {capitalizeFirstChar(order.status)}</p>
          <p className="text-sm md:text-base flex items-center gap-2"><IoFastFoodOutline className="w-5 h-5"/> {order.menus.length} Menus</p>
          <div className="text-sm d:text-base flex items-center gap-2"><MdOutlinePriceChange className="w-5 h-5"/> {getTotalPriceMenu(order.menus)}</div>
        </div>
        <div className="flex justify-between flex-col h-full">
          <div className="">{renderType(order.type)}</div>
          <Button disabled={hideUpdateButton(order.status)} className={`font-bold text-[0.8rem] md:text-sm disabled:opacity-0 opacity-100 `} onClick={() => setShowDialog(true)
            }>{getButtonText()}</Button>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 rounded-md grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-3 font-nunito transition-all duration-300 ease-in-out">
        {order.menus.map((menu: Menu) => (
          <MenuCard key={menu.uid} menuItem={menu} vendorData={vendor} />
        ))}
      </AccordionContent>
      <SwitchStatus
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleDialogResponse={handleUpdateStatus}
        accept={isAcceptOrder(order.type, order.status, userType)}
        newStatus={getNewStatus(order.type, order.status)}
      />
    </AccordionItem>
  );
}
