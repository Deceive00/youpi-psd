import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import MainLayout from "src/layout/main-layout";
import { IoLocationSharp } from "react-icons/io5";

export default function Order() {
  return (
    <MainLayout className={"pt-16"}>
      <div className="w-full font-nunito">
        <div className="px-3 md:px-6 py-2 w-full flex justify-center items-center h-[28rem]">
          <img
            className="rounded-md h-full object-bottom object-cover w-full"
            src={
              "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg"
            }
          />
        </div>
        <div className="relative h-screen w-full flex flex-col justify-center items-center">
          <div className="absolute w-3/4 -top-10 sm:w-1/2 h-20 sm:h-32 sm:-top-16 lg:w-[65%] lg:h-20 lg:-top-14 gap-3 shadow-md z-40 bg-white rounded-xl border p-3 transition-all ease-in-out duration-500 flex flex-col justify-center items-center">
            <div className="flex items-center justify-center gap-3 w-full">
              <Input
                id="search"
                type="search"
                required
                className="w-full"
                placeholder="Enter your location"
                leftIcon={
                  <IoLocationSharp className="h-5 w-5 text-orange-700" />
                }
              />
              <Button className="text-md font-bold rounded-md w-1/4 h-full">
                Explore
              </Button>
            </div>
          </div>
          <div className="mt-40 w-full h-full">asdasdsa</div>
        </div>
      </div>
    </MainLayout>
  );
}
