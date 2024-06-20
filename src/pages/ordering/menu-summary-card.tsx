import { formatPrice, getPricePerMenu } from "@lib/services/price.service";
import { Menu } from "@lib/types/vendor-types";

interface MenuSummaryCardProps {
  menu: Menu;
}

export default function MenuSummaryCard({ menu }: MenuSummaryCardProps) {
  return (
    <div className="border-t-2 pt-3 flex justify-between items-start text-sm sm:text-base">
      <div className="flex flex-col">
        <p>
          {menu.quantity}x {menu.name}
        </p>
        <p>{formatPrice(menu.price)}</p>
      </div>
      <div>{formatPrice(getPricePerMenu(menu))}</div>
    </div>
  );
}
