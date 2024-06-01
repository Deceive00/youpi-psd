import Loader from "@components/loading/loader";
import { Button } from "@components/ui/button";
import { formatPrice } from "@lib/services/price.service";
import { fetchVendorDataById } from "@lib/services/vendor.service";
import { queryClient } from "@lib/settings/query-settings";
import { MenuCart, UserCart, UserCartNew } from "@lib/types/user-types";
import { Vendor } from "@lib/types/vendor-types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { GrRestaurant } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";

import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { auth, db } from "src/firebase/firebase-config";
import MainLayout from "src/layout/main-layout";

export default function VendorDetailPage() {
  const { campusId, vendorId } = useParams();
  const [activeCategory, setActiveCategory] = useState(0);
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const [userCart, setUserCart] = useState<UserCartNew | null>(null);
  if (!campusId || !vendorId) {
    return <div>404 Not Found</div>;
  }

  const { isLoading: isLoadingVendorData } = useQuery(
    ["fetchVendorData"],
    () => fetchVendorDataById(campusId, vendorId),
    {
      onSuccess: (data: Vendor) => {
        console.log(data);
        setVendorData(data);
      },
      onError: (error: any) => {
        console.log("Error fetching vendor data ", error.message);
      },
    }
  );

  const { isLoading: isLoadingUserCart } = useQuery(
    ["fetchUserCart"],
    async () => {
      if (auth.currentUser && auth.currentUser.uid) {
        const userCartRef = doc(db, "carts", auth.currentUser.uid);
        const userCart = await getDoc(userCartRef);

        console.log("masuk");
        if (userCart.exists()) {
          return userCart.data();
        } else {
          throw new Error("Cart still null");
        }
      } else {
        throw new Error("No user");
      }
    },
    {
      onSuccess: (data: UserCartNew) => {
        console.log(data);
        setUserCart(data);
      },
      onError: (error: any) => {
        console.log("Error fetching user cart ", error.message);
      },
    }
  );

  const { mutate: addToCart, isLoading: isLoadingAdd } = useMutation(
    async ({
      vendorId,
      menuId,
      notes,
    }: {
      vendorId: string;
      menuId: string;
      notes: string;
    }) => {
      const cartCollection = await getDocs(collection(db, "carts"));
      if (cartCollection && cartCollection.empty) {
        // No document in carts collection
        if (auth.currentUser && auth.currentUser.uid) {
          await setDoc(doc(db, "carts", auth.currentUser.uid), {
            vendorId: vendorId,
            menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
          });
        }
      } else {
        if (auth.currentUser && auth.currentUser.uid) {
          const userCartRef = doc(db, "carts", auth.currentUser.uid);
          const userCart = await getDoc(userCartRef);
          if (userCart.exists()) {
            // Ada document user
            if (userCart.data().vendorId === vendorId) {
              if (userCart.data().menus.length > 0) {
                // Array ada isi
                const existingMenuItemIndex = userCart
                  .data()
                  .menus.findIndex((item: any) => item.menuId === menuId);

                if (existingMenuItemIndex !== -1) {
                  const updatedMenus = [...userCart.data().menus];
                  updatedMenus[existingMenuItemIndex].menuQuantity++;
                  await updateDoc(userCartRef, { menus: updatedMenus });
                } else {
                  const newMenu = {
                    menuId: menuId,
                    menuQuantity: 1,
                    notes: notes,
                  };
                  const updatedMenus = [...userCart.data().menus, newMenu];
                  await updateDoc(userCartRef, { menus: updatedMenus });
                }
              } else {
                // Array kosong
                await updateDoc(userCartRef, {
                  menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
                });
              }
            } else {
              await setDoc(doc(db, "carts", auth.currentUser.uid), {
                vendorId: vendorId,
                menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
              });
            }
          } else {
            // Ga ada docucment user
            await setDoc(doc(db, "carts", auth.currentUser.uid), {
              vendorId: vendorId,
              menus: [{ menuId: menuId, menuQuantity: 1, notes: notes }],
            });
          }
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchUserCart"]);
        console.log("function success");
      },
      onError: (error: any) => {
        console.error("Error bro");
        throw error;
      },
    }
  );

  const checkQuantity = (itemId: string) => {
    if (vendorData?.id == userCart?.vendorId) {
      // vendornya beda
      if (userCart) {
        console.log("user cart menu length = ", userCart.menus.length);
        if (userCart?.menus.length > 0) {
          console.log("user cart = " + userCart.menus);
          console.log("item idnya = " + itemId);
          const itemExist = userCart.menus.findIndex(
            (item: MenuCart) => item.menuId === itemId
          );
          if (itemExist !== -1) {
            console.log(itemExist);
            return 1;
          } else {
            console.log("item ini gaada di cart");
            return -1;
          }
        }
      } else {
        console.log(userCart + "gaada");
      }
    } else {
      // vendornya sama
      return -1;
    }
  };

  return (
    <MainLayout className={`pt-14 bg-slate-50`}>
      {isLoadingVendorData || isLoadingUserCart ? (
        <Loader />
      ) : (
        <div className="w-full font-nunito ">
          <div className="px-0 md:px-6 sm:py-2 w-full flex justify-center items-center h-80 sm:h-[28rem]">
            <img
              className="sm:rounded-md h-full object-top object-cover w-full"
              src={vendorData?.coverImage}
            />
          </div>
          <div className="font-nunito relative w-full flex flex-col justify-start items-center">
            <div className="absolute w-[95%] -top-10 sm:w-3/4 h-20 sm:h-18 sm:-top-14 lg:w-[65%] lg:h-auto lg:-top-14 shadow-md z-3 bg-white rounded-xl border p-5 transition-all ease-in-out duration-500 flex justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                <GrRestaurant className="w-10 h-10 mb-1 text-[#E81A1C]" />
                <div className="text-base">
                  <p className="font-bold">
                    {vendorData?.name}, {vendorData?.campusName}
                  </p>
                  <p className="text-sm">description</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col justify-center items-center px-5 border-r-2">
                  <div className="text-base flex justify-center items-center gap-2">
                    <IoIosStar className="h-6 w-6 text-yellow-400" />
                    <div className="font-bold">
                      {vendorData?.rating as React.ReactNode}
                    </div>
                  </div>
                  <div className="text-xs">Rating & Reviews</div>
                </div>
                <div className="flex flex-col justify-center items-center px-5 border-r-2">
                  <div className="text-base flex justify-center items-center gap-2 font-bold">
                    ±10 minutes
                  </div>
                  <div className="text-xs">Order Processed</div>
                </div>
                <div className="flex flex-col justify-center items-center pl-5">
                  <div className="font-bold text-base flex justify-center items-center gap-2">
                    09.00 - 18.00
                  </div>
                  <div className="text-xs">Operating Hours</div>
                </div>
              </div>
            </div>
            <div className="mt-14 sm:mt-16 w-full h-auto px-20 flex font-nunito text-base">
              <div className="shadow-lg rounded-lg w-1/4 p-7 h-fit mt-5 bg-white sticky top-20 flex flex-col">
                <div className="p-2 font-bold">Categories</div>
                <div className="flex flex-col gap-1">
                  <Button
                    variant={"secondary"}
                    className={
                      activeCategory == 0
                        ? "w-full justify-start hover:bg-orange-100"
                        : "w-full justify-start bg-white"
                    }
                    onClick={() => setActiveCategory(0)}
                  >
                    All Menu
                  </Button>
                  {vendorData?.categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={"secondary"}
                      className={
                        activeCategory == index + 1
                          ? "w-full justify-start hover:bg-orange-100"
                          : "w-full justify-start bg-white"
                      }
                      onClick={() => setActiveCategory(index + 1)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="w-3/4 p-5">
                <div className="grid grid-cols-2 justify-items-center gap-3 font-nunito ">
                  {vendorData?.categories.flatMap((menu) =>
                    menu.menus.map((menuItem) => (
                      <div
                        className="shadow-md h-fit w-full border rounded-lg bg-white flex justify-between p-3 gap-2"
                        key={menuItem.description}
                      >
                        <img
                          className="h-40 w-40 object-cover rounded-md"
                          src={menuItem.image}
                        />
                        <div className="flex w-full pl-2 flex-col justify-between">
                          <div className="w-full">
                            <div className="font-bold text-lg">
                              {menuItem.name}
                            </div>
                            <div className="line-clamp-1 text-base opacity-70">
                              {menuItem.description}
                            </div>
                            <div className="text-base font-semibold mt-3">
                              {formatPrice(menuItem.price)}
                            </div>
                          </div>
                          <div className="flex justify-end items-center">
                            {checkQuantity(menuItem.uid) === -1 ? (
                              <div
                                className="p-2 border rounded-3xl px-5 text-sm font-bold bg-orange-400 text-white hover:cursor-pointer hover:bg-orange-300 transition-all duration-300"
                                onClick={async () =>
                                  await addToCart({
                                    vendorId: vendorData.id,
                                    menuId: menuItem.uid,
                                    notes: "new notes",
                                  })
                                }
                              >
                                {!isLoadingAdd ? "Add" : <LoaderCircle />}
                              </div>
                            ) : (
                              <div>ada item</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
