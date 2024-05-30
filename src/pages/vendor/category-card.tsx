import { MenuCategory } from "@lib/types/vendor-types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { IoFastFoodOutline } from "react-icons/io5";
import MenuTable from "./menu-table";
interface CategoryCardProps {
  category: MenuCategory;
}
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <AccordionItem value={category.name} className="mb-4">
      <AccordionTrigger className="border rounded-md p-4">
        {" "}
        <div className="flex flex-row items-center gap-4">
          <IoFastFoodOutline className="w-10 h-10" />
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-left">{category?.name}</h3>
            <h5 className="text-base text-left">{category?.menus.length} Menus</h5>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 rounded-md">
        <MenuTable menu={category.menus} categoryName={category.name}/>
      </AccordionContent>
    </AccordionItem>
  );
}
