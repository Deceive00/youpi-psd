import { IoIosStar } from "react-icons/io";
import { IoPricetag } from "react-icons/io5";

interface RestaurantCardProps {
  vendor: any;
}

export default function RestaurantCard({ vendor }: RestaurantCardProps) {
  return (
    <div className="w-52 md:w-60 xl:w-64 h-[250px] md:h-[275px] shadow-md rounded-lg hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer transition-all duration-500 ease-in-out flex-shrink-0 border">
      <div className="w-full h-[50%] md:h-[60%]">
        <img
          className="rounded-t-lg h-full w-full object-cover"
          src={vendor.coverImage}
        />
      </div>
      <div className="h-[40%] p-3 flex flex-col gap-1 justify-start items-start">
        <div className="font-bold text-lg">{vendor.name}</div>
        <div className="flex w-full gap-5 items-center text-sm sm:text-base">
          <div className="flex items-center justify-center gap-1">
            <IoIosStar className="h-6 w-6 text-yellow-400" />
            <div>{vendor.rating}</div>
          </div>
          <div className="font-light">{vendor.review}+ ratings</div>
        </div>
        <div className="flex bg-red-600 justify-between text-white w-[95%] md:w-[65%] xl:w-[50%] p-1 px-2 rounded-md my-1">
          <IoPricetag />
          <p className="text-xs">Rp. 25.000 off</p>
        </div>
      </div>
    </div>
  );
}
