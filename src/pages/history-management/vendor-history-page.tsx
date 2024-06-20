import { Toaster } from "@components/ui/toaster";
import { useAuth } from "@lib/hooks/useAuth";
import { Vendor } from "@lib/types/vendor-types";
import { Accordion } from "@components/ui/accordion";
import { useEffect, useState } from "react";
import VendorLayout from "src/layout/vendor-layout";
import { Order } from "@lib/types/order-types";
import { useQuery } from "react-query";
import { getAllVendorSenderHistory as getAllVendorHistory } from "@lib/services/history.service";
import OrderCardAccordionItem, {
  OrderCardAccordionSkeleton,
} from "@pages/ordering/order-card-accordion-item";

export default function VendorHistoryPage() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const { isLoading, user } = useAuth();
  const [history, setHistory] = useState<Order[] | null>(null);
  const { isLoading: fetchLoading, isFetching } = useQuery(
    ["fetchVendorHistory"],
    async () => await getAllVendorHistory(),
    {
      enabled: !isLoading,
      retry: false,
      staleTime: 0,
      onSuccess: (data: Order[]) => {
        console.log(data);
        setHistory(data);
      },
      onError: (error: Error) => {
        console.log(error);
      },
    }
  );
  useEffect(() => {
    if (user && (user as Vendor)?.categories !== undefined) {
      setVendor(user as Vendor);
    }
  }, [user]);

  return (
    <VendorLayout
      menuDescription={`See ${vendor?.name} histories`}
      menuName="Your History"
    >
      <div className="mt-4">
        <Accordion
          type="single"
          collapsible
          className={`mt-4 max-h-[65vh] overflow-y-scroll transition-all duration-300`}
        >
          {(fetchLoading || isFetching) &&
            Array.from({ length: 2 }).map((_, index) => {
              return <OrderCardAccordionSkeleton key={index} />;
            })}
          {history &&
            !fetchLoading &&
            !isFetching &&
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
          {(!history || history.length <= 0) &&
            !fetchLoading &&
            !isFetching && (
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
