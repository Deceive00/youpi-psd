import { FaArrowRight } from "react-icons/fa";
import MainLayout from "src/layout/main-layout";
import PartnerContainer from "./partner-container";

export default function About() {
  return (
    <div>
      {/* Ini gw gatau berapa pading nya buat samping */}
      <MainLayout className={"pt-14 sm:pt-16"}>
        {/* Layout terluar */}
        <div className={`w-screen h-screen`}>
          {/* 1. Eat and Enjoy With Youpi */}
          <div
            className={`flex justify-between items-center w-full h-3/5 px-16 mt-8 bg-yellow-100`}
          >
            <div className="w-1/2 h-full gap-4 flex flex-col gap-8 px-4">
              <h1 className={`text-6xl font-bold tracking-wide`}>
                Eat And Enjoy <br />
                With Youpi
              </h1>
              <span className={`text-lg`}>
                We believe that food is more than just sustenance; it’s a
                celebration of flavors, cultures, and moments shared with loved
                ones. Your trusted companion in food delivery and you can be on
                one of Youpers
              </span>
              <div className={`flex flex-row h-full`}>
                {/* Image */}
                <img
                  className={`w-3/6 h-full object-contain bg-green-100`}
                  src=""
                  alt="masukin image yg ada di line"
                />
                <div className={`px-auto mx-auto`}>
                  <button className={`bg-black text-white py-3 px-8 rounded`}>
                    Explore More
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full">
              <img
                className={`bg-green-100 h-4/5 w-4/5 mx-auto`}
                src=""
                alt="masukin image yang ada di line"
              />
            </div>
          </div>

          <div className={`w-full h-1/4 bg-red-100 flex flex-row px-20`}>
            {/* Left */}
            <div className={`w-2/5 h-full bg-blue-100`}></div>
            {/* Mid */}
            <div className={`w-1/5 h-full bg-blue-200 mx-12`}>
              <img
                className="w-full h-full"
                src=""
                alt="masukin gambar yang di line"
              />
            </div>
            {/* Right */}
            <div className={`w-2/5 h-full bg-blue-300`}>
              <h1 className={`text-3xl font-bold`}>Sustainability</h1>

              <span>
                Comitted to the triple bottom line people, planet, and profit,
                we do everuting we can to give an environment as healthy as
                possible.
              </span>
            </div>
          </div>

          {/* 2. Three Pillars*/}
          <div className={`flex flex-row w-full h-3/5 px-16 mt-8 bg-green-100`}>
            <div className={`w-1/2 h-full px-4 flex flex-col gap-y-10`}>
                {/* Left */}
                <h1 className={`text-5xl font-bold tracking-wide`}>Cook Faster<br/>Deliver Faster</h1>

                <p className={`text-lg`}>We know your time is valuable. We can quickly deliver the food cooked with love, to give the best experience and efficiency to everyone, so you can focus on your kitchen.</p>
                <div className={`flex flex-row gap-x-12`}>
                    <button className={`bg-black text-white py-3 px-8 rounded`}>Explore partner stories</button>
                    <button className={`border-2 border-black text-black bg-transparent py-3 px-8 rounded flex items-center`}>Contact Our Team <FaArrowRight className={`ml-2`}/></button>
                </div>
            </div>
            <div className={`w-1/2 h-full bg-black-100`}>
                {/* Right */}
                <PartnerContainer />
            </div>
          </div>
          <div>
            <h3 className={""}>Milestones</h3>
          </div>
          <div>Pillars</div>
          <div>How to use Youpi</div>
        </div>
      </MainLayout>
    </div>
  );
}
