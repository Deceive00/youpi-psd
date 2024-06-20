import { Skeleton } from "@components/ui/skeleton";
import {
  calculateFakeDiscount,
  formatPrice,
} from "@lib/services/price.service";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { FiPlusCircle } from "react-icons/fi";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";

interface CartCardProps {
  vendor: Vendor;
  menu: Menu;
  addToCart: any;
}
export const CartCardSkeleton = () => {
  return (
    <Skeleton className="h-[250px] md:h-[275px] w-full bg-gray-200"></Skeleton>
  );
};
export default function CartCard({ vendor, menu, addToCart }: CartCardProps) {
  return (
    <div className="w-full sm:shadow-md h-auto border flex justify-between p-5 pb-3">
      <div className="flex flex-col w-3/4 md:w-4/5 pr-5">
        <div className="font-bold text-base line-clamp-1 sm:line-clamp-0 sm:text-xl">
          {vendor.name} - {vendor.campusName}
        </div>
        <div className="w-full border border-opacity-10 border-black my-1 xl:my-3"></div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-1 xl:gap-2">
            <div className="font-bold text-base sm:text-lg">{menu.name}</div>
            <div className="text-sm sm:text-base">{menu.description}</div>
            <div className="flex gap-3 menus-center mb-1 text-sm sm:text-base">
              <div>{formatPrice(menu.price)}</div>
              <div className="line-through">
                {calculateFakeDiscount(menu.price)}
              </div>
              <div className="text-sm xl:text-base border p-1 px-2 bg-red-600 rounded-2xl text-white font-bold">
                Promo
              </div>
            </div>
          </div>
          <div className="border-2 rounded-md p-2 text-sm sm:text-base line-clamp-1 sm:line-clamp-0">
            <span className="font-bold">Notes:</span> {menu.notes}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 md:w-1/5 gap-3 items-center">
        <img
          className="rounded-md w-28 h-28 md:w-60 md:h-3/4 object-cover"
          src={menu.image}
        />
        <div className="flex w-full justify-between items-center ">
          <div className="sm:p-2 rounded-3xl hover:cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out">
            <LuMinusCircle
              className="w-6 h-6"
              onClick={async () =>
                await addToCart({
                  vendorId: vendor.id,
                  menuId: menu.uid,
                  notes: "",
                  add: false,
                })
              }
            />
          </div>  
          <p className="font-bold">{menu.quantity}</p>
          <div className="sm:p-2 rounded-3xl hover:cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out">
            <LuPlusCircle
              className="w-6 h-6"
              onClick={async () =>
                await addToCart({
                  vendorId: vendor.id,
                  menuId: menu.uid,
                  notes: "",
                  add: true,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
