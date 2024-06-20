import { UserHistory } from "@lib/types/history-types";
import { Separator } from "@radix-ui/react-select";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { calculateTotalPrice } from "./modal-history";
import { getFormattedTime } from "@lib/services/formatter.service";

interface Props {
  imageUrl: string;
  title: string;
  campusName: string;
  onClick: (order: UserHistory) => void;
  userHistory: UserHistory;
}

const OrderCard: React.FC<Props> = ({
  imageUrl,
  title,
  campusName,
  onClick,
  userHistory,
}) => {
  return (
    <div
      className="card w-96 h-96 shadow-xl cursor-pointer"
      onClick={() => onClick(userHistory)}
    >
      <figure className="lg:h-[40%]">
        <img src={imageUrl} alt="Card Image" className="h-max" />
      </figure>
      <div className="card-body lg:h-[60%]">
        <div>
          <h2 className="card-title font-semibold text-2xl">{title}</h2>
          <p>{campusName}</p>
        </div>
        <div className={`flex flex-row items-center gap-x-2`}>
          <IoIosCheckmarkCircle className="text-green-400 text-2xl" />
          <p>Order Completed</p>
        </div>
        <div className={`flex justify-end text-slate-300`}>
          {getFormattedTime(userHistory.order.timeAdded)}
        </div>
        <Separator className="border-[1px]" />
        <div className={`flex flex-row justify-between items-end h-full`}>
          <div className="flex h-full w-full justify-start items-center">
            <span className={`text-xl font-semibold`}>
              Rp {calculateTotalPrice(userHistory.order.menus) - 15000}
            </span>
          </div>
          <button
            className={`bg-red-100 py-3 px-12 bg-secondary rounded-lg text-primary font-semibold`}
          >
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
