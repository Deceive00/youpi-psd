import { Button } from "@components/ui/button";
import MainLayout from "src/layout/main-layout";
import CartCard, { CartCardSkeleton } from "./cart-card";
import { useMutation, useQuery } from "react-query";
import {fetchUserCartFE } from "@lib/services/vendor.service";
import { UserCartFE, UserType } from "@lib/types/user-types";
import { useEffect, useState } from "react";
import { Input } from "@components/ui/input";
import { addOrder } from "@lib/services/order.service";
import { Order } from "@lib/types/order-types";
import { useToast } from "@components/ui/use-toast";
import { Toaster } from "@components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { getTotalPriceMenu } from "@lib/services/price.service";
import { useAuth } from "@lib/hooks/useAuth";


export default function CartPage() {
  const [type, setType] = useState<'pick up'|'delivery'>('delivery');
  const [userCart, setUserCart] = useState<UserCartFE | null>(null);
  const [address, setAddress] =  useState('');
  const {toast} = useToast();
  const {userType} = useAuth()
  const { isLoading: cartLoading } = useQuery(['fetchUserCart'], fetchUserCartFE, {
    onSuccess: (data : UserCartFE) => {
      setUserCart(data);
      if(!data){
        navigate('/order');
      }
    },
    onError: (error : Error) => {
      console.log(error.message);
      if(error.message === 'Cart still null'){
        navigate('/order');
      }
    }
  });
  useEffect(() => {
    if(userType === UserType.VENDOR){
      navigate('/');
    }
  }, [userType])
  const navigate = useNavigate();
  const { mutate: handleOrder } = useMutation(async () => {
    if(type === 'delivery' && address.length <= 0){
      throw new Error("Please insert your delivery address details")
    }

    return addOrder({
      campusName: userCart?.vendor.campusName,
      menus: userCart?.menus,
      senderId:'',
      status:'waiting confirmation',
      type: type,
      vendorId: userCart?.vendor.id,
      address: address,
    } as Order)
  },{
    onSuccess: () => {
      toast({
        title: "Order Placed",
        description: "Your order has been placed",
        variant: "success",
      });
      setUserCart(null);
    },
    onError: (error : Error) => {
      toast({
        title: "Place Order Failed",
        description: error.message,
        variant: "error",
      })
    }
  })


  return (
    <MainLayout className={`pt-14 `}>
      <div className="w-full p-10 md:p-12 font-nunito">
        <div className="flex w-full min-h-screen flex-col lg:flex-row">
          <div className="w-full lg:w-[70%] lg:pr-10 md:pt-0 flex flex-col gap-3 sm:mb-0">
            <div className="text-3xl font-bold py-5 pb-0 sm:p-0">Your Cart</div>
            <div className="flex flex-row gap-5 my-4 items-center">
              {['Delivery', 'Pick Up'].map((t) => {
                return (
                  <div key={t} onClick={() => setType(t.toLowerCase() as 'pick up'|'delivery')} className={`${t.toLowerCase() === type.toLowerCase() ? 'border-2 border-primary text-primary font-bold' : ''} transition-all duration-300 font-nunito p-3 rounded-lg cursor-pointer`}>
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
              {!cartLoading && userCart?.menus.map((menu) => (
                <CartCard key={menu.uid} menu={menu} vendor={userCart.vendor} />
              ))}
              {
                cartLoading && ([1,2,3].map((index) => {
                  return (
                   <CartCardSkeleton key={index}/>
                  )
                }))
              }
            </div>
          </div>
          <div className="w-full lg:w-[30%] p-5 md:p-0 md:px-10 lg:px-0 mt-7 lg:mt-0">
            <div className="lg:sticky lg:top-20 w-full h-auto shadow-md p-5 border rounded-xl flex flex-col gap-5">
              <div className="text-lg font-bold">Payment Summary</div>
              <div className="flex flex-col border p-4 rounded-md text-sm sm:text-base">
                <div>
                  <div className="flex w-full justify-between">
                    <div>Price</div>
                    <div>{getTotalPriceMenu(userCart?.menus || [])}</div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div>Handling and delivery fee</div>
                    <div>5000</div>
                  </div>
                </div>
                <div className="w-full border border-opacity-10 border-black my-3"></div>
                <div className="flex w-full justify-between font-bold ">
                  <div>Total Payment</div>
                  <div>{getTotalPriceMenu(userCart?.menus || []) + 5000}</div>
                </div>
              </div>
              <Button onClick={() => handleOrder()} className="font-bold">Place Order</Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </MainLayout>
  );
}
