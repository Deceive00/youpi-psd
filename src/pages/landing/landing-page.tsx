import MainLayout from "src/layout/main-layout";
import foodBlack from "@assets/images/food-black.png";
import foodWhite from "@assets/images/food-white2.png";

export default function LandingPage() {
  return (
    <MainLayout className={"bg-white pt-14"}>
      <div className="w-full">
        <div className="h-screen md:h-[83vh] w-full flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-full bg-[#2B2929] p-4 xl:p-16 text-[#F1EFEF] font-nunito">
            <div className="absolute left-16 sm:left-20 xl:left-32 top-0 bg-[#F1EFEF] h-2/3 lg:h-5/6 w-14 sm:w-24 lg:w-28 rounded-b-xl"></div>
            <img
              className="absolute left-3 sm:left-5 top-[20vh] w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 xl:left-10 xl:w-72 xl:h-72 object-cover"
              src={foodWhite}
            />
            <div className="flex h-full w-full flex-col">
              <div className="h-full p-5 pl-40 sm:pl-60 xl:pl-72 flex flex-col items-end gap-7 text-right">
                <div className="font-bold text-3xl">
                  <span className="text-[#E68D3B]">Oceanic</span> Greens
                </div>
                <p className="line-clamp-6 md:line-clamp-[7] lg:line-clamp-none text-base lg:text-lg tracking-wide">
                  Indulge in our mouth-watering salmon and salad dish, expertly
                  crafted to tantalize your taste buds with every bite. Our
                  fresh and succulent salmon is seasoned to perfection,
                  pan-seared to lock in the flavors and served on a bed of
                  crisp, creating a delightful culinary experience.
                </p>
                <p className="text-base lg:text-lg line-clamp-6">
                  <strong>Nutritional Benefits:</strong> High in omega-3 fatty
                  acids, rich in vitamins and minerals.
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 h-full bg-[#F1EFEF] p-4 xl:p-16 text-[#2B2929] font-nunito">
            <div className="absolute right-16 sm:right-20 xl:right-32 top-0 bg-[#2B2929] h-2/3 lg:h-5/6 w-14 sm:w-24 lg:w-28 rounded-b-xl"></div>
            <img
              className="absolute right-3 sm:right-5 top-[20vh] w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 xl:right-10 xl:w-72 xl:h-72 object-cover"
              src={foodBlack}
            />
            <div className="flex h-full w-full flex-col">
              <div className="h-full p-5 pr-40 sm:pr-60 xl:pr-72 flex flex-col items-start gap-7 text-left">
                <div className="font-bold text-3xl">
                  Pepper <span className="text-[#E81A1B]">Quinoa</span>
                </div>
                <p className="line-clamp-6 md:line-clamp-[7] lg:line-clamp-none text-base lg:text-lg tracking-wide">
                  Quinoa with Grilled Peppers is a vibrant and healthy dish that
                  combines the nutty flavor of quinoa with the smoky sweetness
                  of grilled peppers and the refreshing taste of fresh mint.
                  This nutrient-rich meal is both satisfying and light, making
                  it perfect for a wholesome lunch or a side dish.{" "}
                </p>
                <p className="text-base lg:text-lg line-clamp-6">
                  <strong>Nutritional Benefits:</strong> High in protein, rich
                  in fiber, packed with antioxidants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
