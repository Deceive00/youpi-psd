import { MenuCategory } from "@lib/types/vendor-types";
import { HiMiniChevronDown } from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";
interface CategoryCardProps{
  category: MenuCategory;
}
export default function CategoryCard({category} : CategoryCardProps) {
  return (
    <div className="flex justify-between items-center border-gray-100 border-2 w-full p-6 rounded-lg transition-all duration-300 hover:translate-x-1">
      <div className="flex flex-row items-center gap-4">
        <IoFastFoodOutline className="w-10 h-10" />
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">{category?.name}</h3>
          <h5 className="text-base">{category?.menus.length} Menus</h5>
        </div>
      </div>
      <HiMiniChevronDown className="w-6 h-6" />
    </div>
  );
}
