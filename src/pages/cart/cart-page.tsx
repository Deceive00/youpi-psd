import { Button } from "@components/ui/button";
import MainLayout from "src/layout/main-layout";
import CartCard from "./cart-card";
import { useMutation, useQuery } from "react-query";
import {fetchUserCartFE } from "@lib/services/vendor.service";
import { UserCartFE } from "@lib/types/user-types";
import { useState } from "react";
import { Input } from "@components/ui/input";


export default function CartPage() {
  const [type, setType] = useState<'pick up'|'delivery'>('delivery');
  const [userCart, setUserCart] = useState<UserCartFE | null>(null);
  const [address, setAddress] =  useState('');
  const { isLoading } = useQuery(['fetchUserCart'], fetchUserCartFE, {
    onSuccess: (data : UserCartFE) => {
      setUserCart(data);
    },
    onError: (error : Error) => {
      console.log(error.message)
    }
  })
  const { mutate: handleOrder } = useMutation(async ( ) => {
    
  },{
    onSuccess: () => {

    },
    onError: () => {

    }
  })
  return (
    <MainLayout className={`pt-14 `}>
      <div className="w-full sm:p-10 font-nunito">
        <div className="flex w-full min-h-screen flex-col lg:flex-row">
          <div className="w-full lg:w-[70%] md:p-10 md:pt-0 flex flex-col gap-3 sm:mb-0">
            <div className="text-3xl font-bold p-5 pb-0 sm:p-0">Your Cart</div>
            <div className="flex flex-row gap-5 my-4 items-center">
              {['Pick Up','Delivery'].map((t) => {
                console.log(t.toLowerCase(), type.toLowerCase())
                return (
                  <div onClick={() => setType(t.toLowerCase() as 'pick up'|'delivery')} className={`${t.toLowerCase() === type.toLowerCase() ? 'border-2 border-primary text-primary font-bold' : ''} transition-all duration-300 font-nunito p-3 rounded-lg cursor-pointer`}>
                    {t}
                  </div>
                )
              })}
            </div>
            {
              type === 'delivery' && (
                <Input onChange={(e) => setAddress(e.target.value)} placeholder="Delivery Address" className="transition-all duration-200"/>
              )
            }
            <div className="flex flex-col sm:gap-5 justify-center mt-4">
              {userCart?.menus.map((menu) => (
                <CartCard key={menu.uid} menu={menu} vendor={userCart.vendor} />
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
              <Button onClick={() => handleOrder()} className="font-bold">Place delivery order</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
