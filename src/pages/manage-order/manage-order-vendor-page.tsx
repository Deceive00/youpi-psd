import { Accordion } from "@components/ui/accordion";
import { Toaster } from "@components/ui/toaster";
import { useToast } from "@components/ui/use-toast";
import { useAuth } from "@lib/hooks/useAuth";
import {
  getVendorIncomingOrder,
  getVendorOrderHistory,
} from "@lib/services/order.service";
import { Order } from "@lib/types/order-types";
import { Vendor } from "@lib/types/vendor-types";
import MenuCard from "@pages/vendor-detail/menu-card";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import VendorLayout from "src/layout/vendor-layout";
import OrderCardAccordionItem from "./order-card-accordion-item";
enum OrderTab {
  INCOMING = "incoming",
  HISTORY = "history",
}
export default function ManageOrderVendorPage() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [incomingOrderData, setIncomingOrderData] = useState<Order[] | null>(
    null
  );
  const [historyData, setHistoryData] = useState<Order[] | null>(null);
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
      setVendor(user as Vendor);
    }
  }, [user]);

  useEffect(() => {
    if (vendor) {
      const unsubscribe = getVendorIncomingOrder((orders: Order[]) => {
        setIncomingOrderData(orders);
      });

      return () => unsubscribe();
    }
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
      const unsubscribe = getVendorOrderHistory((orders: Order[]) => {
        console.log(orders);
        setHistoryData(orders);
      });

      return () => unsubscribe();
    }
  }, [vendor]);
  return (
    <VendorLayout
      menuDescription={`Manage ${vendor?.name} Orders`}
      menuName="Manage Order"
    >
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
            onClick={() => handleTabChange(OrderTab.HISTORY)}
          >
            <div
              className={`px-10 py-2 transition-all duration-100 ${
                tab === OrderTab.HISTORY ? "font-bold" : ""
              }`}
            >
              History
            </div>
            <div
              className={`bg-primary h-[0.15rem] transition-all duration-300 ${
                tab === OrderTab.HISTORY ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <Accordion
            type="single"
            collapsible
            className={`mt-4 max-h-[65vh] overflow-y-scroll transition-all duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}
          >
            {tab === OrderTab.INCOMING
              ? incomingOrderData?.map((order: Order, index: number) => {
                  if(vendor){
                    return <OrderCardAccordionItem index={index} key={index} order={order} vendor={vendor}/>;
                  }
                })
              : historyData?.map((order: Order, index: number) => {
                  return <p key={index}>{order.address}</p>;
                })}
          </Accordion>
        </div>
      </div>
      <Toaster />
    </VendorLayout>
  );
}
