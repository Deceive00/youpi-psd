import { Toaster } from "@components/ui/toaster";
import { useAuth } from "@lib/hooks/useAuth";
import SenderLayout from "src/layout/sender-layout";
import { Accordion } from "@components/ui/accordion";
import { useState } from "react";
import { Order } from "@lib/types/order-types";
import { useQuery } from "react-query";
import { getAllVendorSenderHistory as getAllSenderHistory } from "@lib/services/history.service";
import { OrderCardAccordionSkeleton } from "@pages/manage-order/order-card-accordion-item";
import OrderCardAccordionItemSender from "@pages/sender/order-card-accordion-item-sender";
import { User } from "@lib/types/user-types";

export default function SenderHistoryPage() {
  const { isLoading, user } = useAuth();
  const [history, setHistory] = useState<Order[] | null>(null);
  const {isLoading : fetchLoading, isFetching} = useQuery(['fetchSenderHistory'], async() => await getAllSenderHistory(), {
    enabled:!isLoading,
    retry: false,
    staleTime: 0,
    onSuccess:(data : Order[]) => {
      console.log(data)
      setHistory(data);
    },
    onError:(error: Error) => {
      console.log(error);
    }
  })

  return (
    <SenderLayout
      menuDescription={`Manage ${(user as User).firstName} ${(user as User).lastName}  Menus`}
      menuName="Manage Menu"
    >
      <div className="mt-4">
        <Accordion
          type="single"
          collapsible
          className={`mt-4 max-h-[65vh] overflow-y-scroll transition-all duration-300`}
        >
          {
            (fetchLoading || isFetching) && (
              Array.from({length: 2}).map((_,index) => {
                return <OrderCardAccordionSkeleton key={index}/>
              })
            )
          }
          {history && !fetchLoading && !isFetching &&
            history?.length > 0 &&
            history?.map((order: Order, index: number) => {
              if (user) {
                return (
                  <OrderCardAccordionItemSender
                    index={index}
                    key={index}
                    order={order}
  
                  />
                );
              }
            })}
          {((!history || history.length <= 0) && !fetchLoading && !isFetching) && (
            <div className="flex justify-center items-center h-[50vh]">
              <p>You got no order history</p>
            </div>
          )}
        </Accordion>
      </div>
      <Toaster />
    </SenderLayout>
  );
}
