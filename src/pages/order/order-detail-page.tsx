import WaitingConfirmation from "@components/loading/waiting-confirmation";
import { useAuth } from "@lib/hooks/useAuth";
import {
  ORDER_TYPE,
  PICKUP_STATUS,
  getEstimatedDeliveryTime,
  onUserOngoingOrder,
  updateUserPickupStatus,
} from "@lib/services/order.service";
import { Order } from "@lib/types/order-types";
import { capitalizeFirstChar } from "@lib/utils/formatter";
import { useEffect, useState } from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import MainLayout from "src/layout/main-layout";
import UserMiddleware from "src/middleware/user-middleware";
import { IoPersonSharp } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import MenuSummaryCard from "./menu-summary-card";
import { formatPrice, getTotalPriceMenu } from "@lib/services/price.service";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";
import { User } from "@lib/types/user-types";
import { Button } from "@components/ui/button";
import { useMutation } from "react-query";
import SwitchStatus from "@components/popup/switch-status-popup";
import { useToast } from "@components/ui/use-toast";
import { Toaster } from "@components/ui/toaster";
import { startMessaging } from "@lib/services/chat.service";
import { auth } from "src/firebase/firebase-config";
import Loader from "@components/loading/loader";

export default function OrderDetail() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading: userLoading } = useAuth();
  const { toast } = useToast();

  const userId = auth.currentUser?.uid;

  const messageHandler = async (toId: string, text: string) => {
    // Call Function from chat.service.ts ( startMessaging )
    if (userId && toId) {
      await startMessaging(userId, toId, text);

      console.log(`Start Messaing`);
      console.log(`From : ${userId}`);
      console.log(`To : ${toId}`);

      navigate("/chat");
    } else {
      console.log("User ID / ToID is undefined. Please log in");
    }
  };

  const { mutate: handleUpdateStatus, isLoading } = useMutation(
    async () => {
      if (order) {
        await updateUserPickupStatus(order);
      }
    },
    {
      onSuccess: () => {
        console.log("Sukses");
        setShowDialog(false);
        toast({
          title: "Succesfully Changed Order Status",
          description: "Order status changed to Finished",
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

  useEffect(() => {
    if (user) {
      const unsubscribe = onUserOngoingOrder((order) => {
        setOrder(order);
        setLoading(false);

        console.log(order);
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !order) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [loading, order, navigate]);
  if (isLoading || userLoading) {
    return <Loader />;
  }
  return (
    <UserMiddleware>
      <MainLayout className={`pt-14 bg-slate-50`}>
        <div className="p-5 w-full flex flex-col md:flex-row h-auto justify-center items-center font-nunito">
          {order ? (
            <>
              <div className="w-full md:w-1/2 pt-3 pb-5 flex flex-col justify-center items-center">
                <WaitingConfirmation />
                <div className="font-bold text-lg">
                  {capitalizeFirstChar(order.status)}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-3 pt-0 md:p-5 flex flex-col justify-start items-center h-full gap-4">
                <div className="hidden md:block font-bold text-2xl">
                  Order Detail
                </div>
                <div className="w-full p-4 shadow-md rounded-xl flex flex-col gap-3 bg-white">
                  <div className="text-center font-bold text-base sm:text-xl">
                    {order?.vendorName} - {order?.campusName}
                  </div>
                  <div className="mt-1 flex w-full justify-between items-start">
                    <div className="flex flex-col gap-3 items-start">
                      <div className="flex gap-3 text-sm sm:text-lg items-center">
                        <SiGooglemaps className="w-5 h-5 text-red-700" />
                        <p>
                          {order.type === ORDER_TYPE.DELIVERY
                            ? order.address
                            : "None"}
                        </p>
                      </div>
                      <div className="flex gap-3 items-center justify-start">
                        <IoPersonSharp />
                        <p className="text-sm sm:text-lg">
                          {(user as User).firstName}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`rounded-lg p-[0.25rem] ${
                        order.type === ORDER_TYPE.DELIVERY
                          ? "bg-orange-100 border-2 border-orange-200"
                          : "bg-red-200"
                      } flex flex-row items-center justify-center gap-2`}
                    >
                      <MdOutlineDeliveryDining className="h-5 w-5" />
                      <p className="font-bold text-sm">
                        {capitalizeFirstChar(order.type)}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm sm:text-lg font-bold">
                    {order.type === ORDER_TYPE.DELIVERY ? (
                      <>
                        <span>Estimated delivery time: </span>
                        <span className="text-red-700">
                          {getEstimatedDeliveryTime(order.timeAdded, true)} WIB
                        </span>
                      </>
                    ) : (
                      <>
                        <span> Estimated picked up time:</span>{" "}
                        <span className="text-red-700">
                          {getEstimatedDeliveryTime(order.timeAdded, false)} WIB
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full p-2 shadow-md rounded-xl flex gap-3 bg-white text-base">
                  {/* Vendor Chat */}
                  <div
                    onClick={() =>
                      messageHandler(
                        order.vendorId,
                        "Hey, please kindly deliver my order according to notes."
                      )
                    }
                    className="flex w-1/2 h-10 rounded-md hover:bg-slate-200 hover:cursor-pointer justify-center items-center gap-3 transition-all duration-300 ease-in-out"
                  >
                    <IoChatboxEllipses className="w-5 h-5 text-orange-600" />
                    <p>Vendor</p>
                  </div>

                  {/* Sender Chat */}
                  <div
                    onClick={() =>
                      order.senderId
                        ? messageHandler(
                            order.senderId,
                            "Hey, please kindly deliver my order according to notes."
                          )
                        : null
                    }
                    className="flex w-1/2 h-10 rounded-md hover:bg-slate-200 hover:cursor-pointer justify-center items-center gap-3 transition-all duration-300 ease-in-out"
                  >
                    <IoChatboxEllipses className="w-5 h-5 text-orange-600" />
                    <p>Sender</p>
                  </div>
                </div>
                <div className="w-full p-4 shadow-md rounded-xl flex flex-col gap-3 bg-white">
                  <div className="text-center font-bold text-base sm:text-xl">
                    Order Summary
                  </div>
                  <div className="flex flex-col gap-3 text-base">
                    {order.menus.map((menu, index) => (
                      <MenuSummaryCard menu={menu} key={index} />
                    ))}
                    <div className="border-t-2 pt-3 flex justify-between items-start flex-col gap-1 w-full text-sm sm:text-base">
                      <div className="flex justify-between w-full">
                        <p>Subtotal</p>
                        <p>{formatPrice(getTotalPriceMenu(order.menus))}</p>
                      </div>
                      <div className="flex justify-between w-full">
                        <p>Handling and delivery fee</p>
                        <p>{formatPrice(5000)}</p>
                      </div>
                    </div>
                    <div className="border-t-2 pt-3 flex justify-between items-start flex-col gap-1 w-full text-sm sm:text-base">
                      <div className="flex justify-between w-full font-bold">
                        <p>Total</p>
                        <p>
                          {formatPrice(getTotalPriceMenu(order.menus) + 5000)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {order.type === ORDER_TYPE.PICK_UP &&
                  order.status === PICKUP_STATUS.READY_FOR_PICKUP && (
                    <Button
                      className="w-full font-bold"
                      onClick={() => setShowDialog(true)}
                    >
                      Confirm Pickup
                    </Button>
                  )}
              </div>
            </>
          ) : (
            <div className="w-1/2 h-96 flex flex-col justify-center items-center">
              <div>No ongoing order</div>
            </div>
          )}
        </div>
        <SwitchStatus
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleDialogResponse={handleUpdateStatus}
          accept={false}
          isLoading={isLoading}
          newStatus={"Finished"}
        />
        <Toaster />
      </MainLayout>
    </UserMiddleware>
  );
}
