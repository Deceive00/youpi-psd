import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { getTotalPriceMenu } from "@lib/services/price.service";
import { Order } from "@lib/types/order-types";
import { Menu } from "@lib/types/vendor-types";
import { capitalizeFirstChar } from "@lib/utils/formatter";
import MenuCard from "@pages/vendor-detail/menu-card";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { IoFastFoodOutline } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import {
  DELIVERY_STATUS,
  getNewStatus,
  isAcceptOrder,
  updateOrderStatus,
} from "@lib/services/order.service";
import { useEffect, useState } from "react";
import SwitchStatus from "../../components/popup/switch-status-popup";
import { useAuth } from "@lib/hooks/useAuth";
import { useMutation } from "react-query";
import { useToast } from "@components/ui/use-toast";
import LoadingCircle from "@components/ui/loading-circle";

interface props {
  index: number;
  order: Order;
}

export default function OrderCardAccordionItemSender({ index, order }: props) {
  console.log(order)
  const [showDialog, setShowDialog] = useState(false);
  const { userType } = useAuth();
  const { toast } = useToast();
  const { mutate: handleUpdateStatus, isLoading } = useMutation(
    async () => {
      await updateOrderStatus(order, userType);
    },
    {
      onSuccess: () => {
        console.log(order);
        setShowDialog(false);
        const isAccept = isAcceptOrder(order.type, order.status, userType);
        toast({
          title: isAccept
            ? "Succesfully Accepted Order"
            : "Succesfully Changed Order Status",
          description: isAccept
            ? ""
            : "Order status changed to " +
              getNewStatus(order.type, order.status),
          variant: "success",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Action Failed",
          description: error.message,
          variant: "error",
        });
        setShowDialog(false);
      },
    }
  );
  const getButtonText = () => {
    if (isAcceptOrder(order.type, order.status, userType, order.senderId)) {
      return "Accept Order";
    } else {
      return "Update Status";
    }
  };
  return (
    <>
      <AccordionItem
        value={index.toString()}
        className="mb-4 hover:translate-y-[1px] transition-all duration-200 z-10"
      >
        <AccordionTrigger className="border rounded-md p-4 hover:no-underline">
          <div className="text-left flex gap-4 flex-col">
            <h4 className="font-bold md:text-lg text-base">
              {order.campusName} - {order.vendorName}
            </h4>
            <p className="text-sm md:text-base flex items-center gap-2">
              <SiGooglemaps className="w-5 h-5" />
              {capitalizeFirstChar(order.address || "")}
            </p>
            <p className="text-sm md:text-base flex items-center gap-2">
              <GrStatusInfo className="w-5 h-5" />{" "}
              {capitalizeFirstChar(order.status)}
            </p>
            <p className="text-sm md:text-base flex items-center gap-2">
              <IoFastFoodOutline className="w-5 h-5" /> {order.menus.length}{" "}
              Menus
            </p>
            <div className="text-sm d:text-base flex items-center gap-2">
              <MdOutlinePriceChange className="w-5 h-5" />{" "}
              {getTotalPriceMenu(order.menus)}
            </div>
          </div>
          <div className="flex justify-between flex-col h-full">
            <div className="">
              <div className="rounded-lg p-[0.25rem] bg-orange-100 border-2 border-orange-200 flex flex-row items-center justify-center gap-2">
                <MdOutlineDeliveryDining className="h-5 w-5" />

                <p className="font-bold text-[0.7rem]">
                  {capitalizeFirstChar(order.type)}
                </p>
              </div>
            </div>
            {!(
              order.senderId !== "" &&
              (order.status === DELIVERY_STATUS.PREPARING_ORDER ||
                order.status === DELIVERY_STATUS.FINISHED)
            ) && (
              <Button
                disabled={isLoading}
                className="font-bold text-[0.8rem] md:text-sm"
                onClick={() => setShowDialog(true)}
              >
                {getButtonText()}
              </Button>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 rounded-md grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-3 font-nunito transition-all duration-300 ease-in-out">
          {order.menus.map((menu: Menu) => (
            <MenuCard key={menu.uid} menuItem={menu} />
          ))}
        </AccordionContent>
      </AccordionItem>
      <SwitchStatus
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleDialogResponse={handleUpdateStatus}
        accept={isAcceptOrder(
          order.type,
          order.status,
          userType,
          order.senderId
        )}
        isLoading={isLoading}
        newStatus={getNewStatus(order.type, order.status)}
      />
    </>
  );
}
