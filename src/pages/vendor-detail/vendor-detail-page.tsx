import { Button } from "@components/ui/button";
import { formatPrice } from "@lib/services/price.service";
import { addCart, fetchVendorDataById } from "@lib/services/vendor.service";
import { MenuCart, UserCart } from "@lib/types/user-types";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GrRestaurant } from "react-icons/gr";
import { IoIosStar } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { auth, db } from "src/firebase/firebase-config";
import MainLayout from "src/layout/main-layout";
import SwitchVendor from "./switch-vendor-popup";
import MenuCard, { MenuCardSkeleton } from "./menu-card";
import NotesPopup from "./notes-popup";
import { Skeleton } from "@components/ui/skeleton";

export default function VendorDetailPage() {
  const { campusId, vendorId } = useParams();
  const [activeCategory, setActiveCategory] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [vendorData, setVendorData] = useState<Vendor | null>(null);
  const [userCart, setUserCart] = useState<UserCart | null>(null);
  const [pendingMenu, setPendingMenu] = useState<{
    vendorId: string;
    menuId: string;
    notes: string;
  } | null>(null);
  const [notesMenu, setNotesMenu] = useState<{
    vendorId: string | undefined;
    menuId: string;
    notes: string;
    name: string;
  } | null>(null);
  const [notesPopupOpen, setNotesPopupOpen] = useState(false);

  if (!campusId || !vendorId) {
    return <div>404 Not Found</div>;
  }

  const { isLoading: isLoadingVendorData } = useQuery(
    ["fetchVendorData"],
    () => fetchVendorDataById(campusId, vendorId),
    {
      onSuccess: (data: Vendor) => {
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
      staleTime: 5,
      onSuccess: (data: UserCart) => {
        console.log(data);
        setUserCart(data);
      },
      onError: (error: Error) => {
        console.log("Error fetching user cart ", error.message);
      },
    }
  );
  console.log(isLoadingUserCart);
  const { mutate: addToCart } = useMutation(
    async ({
      vendorId,
      menuId,
      notes,
      add = null,
      notesUpdated = null,
    }: {
      vendorId: string;
      menuId: string;
      notes: string;
      add?: boolean | null;
      notesUpdated?: boolean | null;
    }) => {
      addCart({ vendorId, menuId, notes, add, notesUpdated });
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(["fetchUserCart"]);
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
      if (userCart) {
        if (userCart?.menus.length > 0) {
          const itemExist = userCart.menus.find(
            (item: MenuCart) => item.menuId === itemId
          );
          if (itemExist) {
            return itemExist.menuQuantity;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  };

  const getMenuData = (itemm: Menu) => {
    if (vendorData?.id == userCart?.vendorId) {
      if (userCart) {
        if (userCart?.menus.length > 0) {
          const itemExist = userCart.menus.find(
            (item: MenuCart) => item.menuId === itemm.uid
          );
          console.log(itemExist?.notes);
          if (itemExist) {
            return {
              vendorId: vendorData?.id,
              menuId: itemm.uid,
              notes: itemExist.notes,
              name: itemm.name,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const handleAddToCart = async ({
    vendorId,
    menuId,
    notes,
  }: {
    vendorId: string;
    menuId: string;
    notes: string;
  }) => {
    if (userCart?.vendorId && userCart?.vendorId !== vendorId) {
      setPendingMenu({ vendorId, menuId, notes });
      setShowDialog(true);
    } else {
      await addToCart({
        vendorId: vendorId,
        menuId: menuId,
        notes: notes,
      });
    }
  };

  const handleDialogResponse = async (response: boolean) => {
    setShowDialog(false);
    if (response && pendingMenu) {
      await addToCart(pendingMenu);
    }
    setPendingMenu(null);
  };

  const handleDialogResponseNotes = async (
    response: boolean,
    newNote: string
  ) => {
    setNotesPopupOpen(false);
    if (response && notesMenu) {
      if (notesMenu.vendorId) {
        await addToCart({
          vendorId: notesMenu.vendorId,
          menuId: notesMenu.menuId,
          notes: newNote,
          notesUpdated: true,
        });
      }
    }
    setNotesMenu(null);
  };

  const handleAddNotes = (data: Menu) => {
    setNotesMenu(getMenuData(data));
    setNotesPopupOpen(true);
  };

  useEffect(() => {
    let unsubscribe = () => {};
    if (auth.currentUser && auth.currentUser.uid) {
      const userCartRef = collection(db, "carts");
      unsubscribe = onSnapshot(userCartRef, (snapshot) => {
        const currentUserDoc = snapshot.docs.find(
          (doc) => doc.id === auth.currentUser?.uid
        );
        if (currentUserDoc) {
          const data = currentUserDoc.data();
          const updatedCart: UserCart = {
            vendorId: data.vendorId,
            menus: data.menus,
          };
          setUserCart(updatedCart);
        } else {
          setUserCart(null);
        }
      });
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const renderHeader = () => {
    if (!isLoadingVendorData) {
      return (
        <p className="font-bold line-clamp-1 text-sm lg:text-base">
          {vendorData?.name}, {vendorData?.campusName}
        </p>
      );
    } else {
      return <Skeleton className="h-4 w-full bg-gray-200" />;
    }
  };
  const renderCategory = () => {
    if(!isLoadingVendorData){
      return (
        vendorData?.categories.map((category, index) => (
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
        ))
      )
    } else {
      return (
        [1,2,3].map((index) => (
          <Skeleton key={index} className="w-full h-10 bg-gray-200"/>
        ))
      )
    }
  }
  return (
    <MainLayout className={`pt-14 bg-slate-50`}>
      <div className="w-full font-nunito ">
        <div className="px-0 md:px-6 sm:py-2 w-full flex justify-center items-center h-80 sm:h-[28rem]">
          {isLoadingVendorData ? (
            <Skeleton className="sm:rounded-md h-full object-top object-cover w-full bg-gray-200" />
          ) : (
            <img
              className="sm:rounded-md h-full object-top object-cover w-full"
              src={vendorData?.coverImage}
            />
          )}
        </div>
        <div className="font-nunito relative w-full flex flex-col justify-start items-center">
          <div className="absolute w-[95%] sm:w-[90%] -top-14 lg:w-[75%] h-auto lg:-top-14 shadow-md z-3 bg-white rounded-xl border p-5 transition-all ease-in-out duration-500 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <div className="flex justify-center items-center gap-3">
              <GrRestaurant className="w-10 h-10 mb-1 text-[#E81A1C]" />
              <div>
                {renderHeader()}
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci, asperiores.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col justify-center items-center px-3 lg:px-5 border-r-2">
                <div className="text-base flex justify-center items-center gap-2">
                  <IoIosStar className="w-4 h-4 lg:h-6 lg:w-6 text-yellow-400" />
                  <div className="font-bold">
                    {vendorData?.rating as React.ReactNode}
                  </div>
                </div>
                <div className="text-xs">Rating & Reviews</div>
              </div>
              <div className="flex flex-col justify-center items-center px-3 lg:px-5 border-r-2">
                <div className="text-xs lg:text-base flex justify-center items-center gap-2 font-bold">
                  ±10 minutes
                </div>
                <div className="text-xs">Order Processed</div>
              </div>
              <div className="flex flex-col justify-center items-center pl-3 lg:pl-5">
                <div className="font-bold text-xs lg:text-base flex justify-center items-center gap-2">
                  09.00 - 18.00
                </div>
                <div className="text-xs">Operating Hours</div>
              </div>
            </div>
          </div>
          <div className="mt-24 sm:mt-16 w-full h-auto px-3 sm:px-10 xl:px-20 pb-20 flex flex-col md:flex-row font-nunito text-base">
            <div className="shadow-lg rounded-lg w-full md:w-1/4 p-3 md:p-7 h-fit mt-5 bg-white md:sticky top-20 flex flex-col">
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
                {renderCategory()}
              </div>
            </div>
            <div className="w-full md:w-3/4 py-5 md:p-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-3 font-nunito transition-all duration-300 ease-in-out">
                {isLoadingVendorData ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <MenuCardSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {vendorData?.categories.flatMap((menu) =>
                      menu.menus.map((menuItem) => (
                        <MenuCard
                          key={menuItem.uid}
                          menuItem={menuItem}
                          vendorData={vendorData}
                          addToCart={addToCart}
                          handleAddToCart={handleAddToCart}
                          handleAddNotes={handleAddNotes}
                          formatPrice={formatPrice}
                          checkQuantity={checkQuantity}
                          isLoading={isLoadingUserCart}
                        />
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SwitchVendor
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleDialogResponse={handleDialogResponse}
      />
      <NotesPopup
        open={notesPopupOpen}
        onOpenChange={setNotesPopupOpen}
        notesMenu={notesMenu}
        handleDialogResponseNotes={handleDialogResponseNotes}
      />
    </MainLayout>
  );
}
