import { Accordion } from "@components/ui/accordion";
import { Toaster } from "@components/ui/toaster";
import { useAuth } from "@lib/hooks/useAuth";
import {
  getSenderIncomingOrder,
  getSenderOngoingOrder,
} from "@lib/services/order.service";
import { Order } from "@lib/types/order-types";
import { useEffect, useState } from "react";
import SenderLayout from "src/layout/sender-layout";
import OrderCardAccordionItemSender from "./order-card-accordion-item-sender";
enum OrderTab {
  INCOMING = "incoming",
  ONGOING = "ongoing",
}
export default function ManageOrderSenderPage() {
  const [incomingOrderData, setIncomingOrderData] = useState<Order[] | null>(
    null
  );
  const [ongoingData, setOngoingData] = useState<Order[] | null>(null);
  const { user } = useAuth();
  const [tab, setTab] = useState<OrderTab>(OrderTab.INCOMING);
  const [transitioning, setTransitioning] = useState(false);
  const handleTabChange = async (tab: OrderTab) => {
    setTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setTab(tab);
    setTransitioning(false);
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = getSenderIncomingOrder((orders: Order[]) => {
        setIncomingOrderData(orders);
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = getSenderOngoingOrder((orders: Order[]) => {
        console.log(orders);
        setOngoingData(orders);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <SenderLayout menuDescription="Manage Your Orders" menuName="Manage Order">
      <div className="font-nunito ">
        <div className="w-full flex">
          <div
            className="flex flex-col items-end cursor-pointer"
            onClick={() => handleTabChange(OrderTab.INCOMING)}
          >
            <div
              className={`px-10 py-2 transition-all duration-100 ${
                tab === OrderTab.INCOMING ? "font-bold" : ""
              }`}
            >
              Incoming
            </div>
            <div
              className={`bg-primary h-[0.15rem] transition-all duration-300 ${
                tab === OrderTab.INCOMING ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          <div
            className="flex flex-col items-start cursor-pointer"
            onClick={() => handleTabChange(OrderTab.ONGOING)}
          >
            <div
              className={`px-10 py-2 transition-all duration-100 ${
                tab === OrderTab.ONGOING ? "font-bold" : ""
              }`}
            >
              Ongoing
            </div>
            <div
              className={`bg-primary h-[0.15rem] transition-all duration-300 ${
                tab === OrderTab.ONGOING ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <Accordion
            type="single"
            collapsible
            className={`mt-4 max-h-[65vh] overflow-y-scroll transition-all duration-300 ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {tab === OrderTab.INCOMING
              ? incomingOrderData?.map((order: Order, index: number) => {
                  if (user) {
                    return (
                      <OrderCardAccordionItemSender
                        index={index}
                        key={index}
                        order={order}
                      />
                    );
                  }
                })
              : ongoingData?.map((order: Order, index: number) => {
                  return <p key={index}>{order.orderId}</p>;
                })}
          </Accordion>
        </div>
      </div>
      <Toaster />
    </SenderLayout>
  );
}
