import { Toaster } from "@components/ui/toaster";
import { useAuth } from "@lib/hooks/useAuth";
import { Vendor } from "@lib/types/vendor-types";
import AddCategoryPopup from "@pages/vendor/add-category-popup";
import CategoryCard from "@pages/vendor/category-card";
import { Accordion } from "@components/ui/accordion";
import React, { useEffect, useState } from "react";
import VendorLayout from "src/layout/vendor-layout";
import { Order } from "@lib/types/order-types";
import { useQuery } from "react-query";
import { getAllVendorHistory } from "@lib/services/history.service";
import OrderCardAccordionItem, { OrderCardAccordionSkeleton } from "@pages/manage-order/order-card-accordion-item";

export default function VendorHistoryPage() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const { user } = useAuth();
  const [history, setHistory] = useState<Order[] | null>(null);
  const {isLoading} = useQuery(['fetchVendorHistory'], async() => await getAllVendorHistory(), {
    retry:false,
    staleTime:0,
    onSuccess:(data : Order[]) => {
      setHistory(data);
    },
    onError:(error: Error) => {
      console.log(error);
    }
  })
  useEffect(() => {
    if (user && (user as Vendor)?.categories !== undefined) {
      setVendor(user as Vendor);
    }
  }, [user]);

  return (
    <VendorLayout
      menuDescription={`Manage ${vendor?.name} Menus`}
      menuName="Manage Menu"
    >
      <div className="mt-4">
        <Accordion
          type="single"
          collapsible
          className={`mt-4 max-h-[65vh] overflow-y-scroll transition-all duration-300`}
        >
          {
            isLoading && (
              Array.from({length: 4}).map((_,index) => {
                return <OrderCardAccordionSkeleton key={index}/>
              })
            )
          }
          {history &&
            history?.length > 0 &&
            history?.map((order: Order, index: number) => {
              if (vendor) {
                return (
                  <OrderCardAccordionItem
                    index={index}
                    key={index}
                    order={order}
                    vendor={vendor}
                  />
                );
              }
            })}
          {((!history || history.length <= 0) && !isLoading) && (
            <div className="flex justify-center items-center h-[50vh]">
              <p>You got no order history</p>
            </div>
          )}
        </Accordion>
      </div>
      <Toaster />
    </VendorLayout>
  );
}
