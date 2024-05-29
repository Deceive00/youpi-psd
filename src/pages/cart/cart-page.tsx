import { Button } from "@components/ui/button";
import MainLayout from "src/layout/main-layout";
import CartCard from "./cart-card";

export default function CartPage() {
  const array = [1, 2, 3];

  const dummyObject = {
    campusName: "BINUS Alam Sutera",
    vendorName: "Ramen Saia",
    name: "Gyudon",
    description: "Rice Bowl with Beef",
    price: 13600,
    coverImage:
      "https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/vendors%2FBINUS%20Alam%20Sutera%2FBoba%20Licious%2FIU.jpeg?alt=media&token=a3c969a6-6eb0-48c7-abd6-93d02b264c37",
    notes: "banyakin beefnya mas",
    quantity: 1,
  };

  return (
    <MainLayout className={`pt-14 `}>
      <div className="w-full sm:p-10 font-nunito">
        <div className="flex w-full min-h-screen flex-col lg:flex-row">
          <div className="w-full lg:w-[70%] md:p-10 md:pt-0 flex flex-col gap-3 sm:mb-0">
            <div className="text-3xl font-bold p-5 pb-0 sm:p-0">Your Cart</div>
            <div className="flex flex-col sm:gap-5 justify-center">
              {array.map((index) => (
                <CartCard key={index} item={dummyObject} />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[30%] p-5 md:p-0 md:px-10 lg:px-0">
            <div className="lg:sticky lg:top-20 w-full h-auto shadow-md p-5 border rounded-xl flex flex-col gap-5">
              <div className="text-lg font-bold">Payment Summary</div>
              <div className="flex flex-col border p-4 rounded-md text-sm sm:text-base">
                <div>
                  <div className="flex w-full justify-between">
                    <div>Price</div>
                    <div>22.000</div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div>Handling and delivery fee</div>
                    <div>19.000</div>
                  </div>
                </div>
                <div className="w-full border border-opacity-10 border-black my-3"></div>
                <div className="flex w-full justify-between font-bold ">
                  <div>Total Payment</div>
                  <div>41.000</div>
                </div>
              </div>
              <Button className="font-bold">Place delivery order</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
