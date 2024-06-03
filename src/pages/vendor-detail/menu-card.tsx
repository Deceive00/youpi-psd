import Loader from "@components/loading/loader";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { LoaderCircle } from "lucide-react";
import { CgNotes } from "react-icons/cg";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";

export default function MenuCard({
  menuItem,
  vendorData,
  addToCart,
  handleAddToCart,
  formatPrice,
  checkQuantity,
}: {
  menuItem: Menu;
  vendorData: Vendor;
  addToCart: any;
  handleAddToCart: any;
  formatPrice: any;
  checkQuantity: any;
}) {
  return (
    <div
      className="shadow-md h-fit w-full border rounded-lg bg-white flex justify-between items-center p-3 gap-2"
      key={menuItem.description}
    >
      <img
        className="h-28 w-28 xl:h-36 xl:w-36 object-cover rounded-md transition-all duration-300"
        src={menuItem.image}
      />
      <div className="flex w-full pl-2 flex-col justify-between h-full gap-3">
        <div className="w-full h-full">
          <div className="font-bold text-base lg:text-lg line-clamp-1">
            {menuItem.name}
          </div>
          <div className="line-clamp-1 text-sm lg:text-base opacity-70">
            {menuItem.description}
          </div>
          <div className="text-base font-semibold mt-3">
            {formatPrice(menuItem.price)}
          </div>
        </div>
        <div className="flex justify-end items-center">
          {checkQuantity(menuItem.uid) === -1 ? (
            <div
              className="p-2 border w-20 flex justify-center rounded-3xl px-5 text-sm font-bold bg-orange-400 text-white hover:cursor-pointer hover:bg-orange-300 transition-all duration-300"
              onClick={async () =>
                handleAddToCart({
                  vendorId: vendorData.id,
                  menuId: menuItem.uid,
                  notes: "",
                })
              }
            >
              Add
            </div>
          ) : (
            <div className="flex gap-5 text-sm font-nunito justify-between w-full xl:justify-end items-center">
              <div className="hidden font-bold border p-2 px-4 rounded-lg xl:flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-slate-50 transition-all duration-300 ease-in-out">
                <CgNotes />
                <p>Notes</p>
              </div>
              <div className="flex xl:hidden font-bold border p-2 px-4 rounded-lg justify-center items-center gap-2 hover:cursor-pointer hover:bg-slate-50 transition-all duration-300 ease-in-out">
                <CgNotes />
              </div>
              <div className="flex gap-2 justify-center items-center">
                <div className="p-2 rounded-3xl hover:cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out">
                  <LuMinusCircle
                    className="w-6 h-6"
                    onClick={async () =>
                      await addToCart({
                        vendorId: vendorData.id,
                        menuId: menuItem.uid,
                        notes: "",
                        add: false,
                      })
                    }
                  />
                </div>
                <p className="font-bold">
                  {checkQuantity(menuItem.uid) as number}
                </p>
                <div className="p-2 rounded-3xl hover:cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out">
                  <LuPlusCircle
                    className="w-6 h-6"
                    onClick={async () =>
                      await addToCart({
                        vendorId: vendorData.id,
                        menuId: menuItem.uid,
                        notes: "",
                        add: true,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
