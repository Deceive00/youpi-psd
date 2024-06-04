import {
  calculateFakeDiscount,
  formatPrice,
} from "@lib/services/price.service";
import { UserCart } from "@lib/types/user-types";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

interface CartCardProps {
  vendor: Vendor;
  menu: Menu;
}

export default function CartCard({ vendor, menu }: CartCardProps) {
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
          <FiMinusCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          <p className="font-bold">{1}</p>
          <FiPlusCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
      </div>
    </div>
  );
}
