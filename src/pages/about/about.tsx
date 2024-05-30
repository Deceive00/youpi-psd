import { FaArrowRight } from "react-icons/fa";
import MainLayout from "src/layout/main-layout";
import PartnerContainer from "./partner-container";
import Timeline from "@components/ui/timeline";

const red = 'E71B1B'
const orange = 'E78D3A'

export default function About() {
  return (
    <MainLayout className={"pt-14 sm:pt-16 overflow-x-hidden"}>
    {/* Layout terluar */}  
    <div className={`w-screen-1 h-max font-nunito box-border overflow-x-hidden`}>
      {/* 1. Eat and Enjoy With Youpi */}
      <div
        className={`flex justify-between items-center w-full h-screen px-16 mt-8`}
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
          <div className={`flex flex-row h-full w-full overflow-x-hidden`}>
            {/* Image */}
            <div className="w-3/6 h-3/5">
              <img
                className={`w-full h-full object-cover`}
                src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2F72238845164.png?alt=media&token=d52c6093-6d74-426e-b7c4-276d7af28699"
                alt="masukin image yg ada di line"
              />
            </div>
            <div
              className={`px-auto mx-auto flex flex-col justify-start space-y-4`}
            >
              <button className={`bg-black text-white py-3 px-8 rounded`}>
                Explore More
              </button>
              <div className={`flex -space-x-4 rtl:space-x-reverse`}>
                <img
                  className={`w-10 h-10 border-2 border-white rounded-full dark:border-gray-800`}
                  src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2F72238845164.png?alt=media&token=d52c6093-6d74-426e-b7c4-276d7af28699"
                  alt=""
                />
                <img
                  className={`w-10 h-10 border-2 border-white rounded-full dark:border-gray-800`}
                  src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2F72238845164.png?alt=media&token=d52c6093-6d74-426e-b7c4-276d7af28699"
                  alt=""
                />
                <img
                  className={`w-10 h-10 border-2 border-white rounded-full dark:border-gray-800`}
                  src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2F72238845164.png?alt=media&token=d52c6093-6d74-426e-b7c4-276d7af28699"
                  alt=""
                />
                <a
                  className={`flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-black border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800`}
                  href="#"
                >
                  +99
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full">
          <img
            className={`bg-green-100 h-4/5 w-3/5 mx-auto`}
            src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2FIMG4.png?alt=media&token=964c6873-63d9-47ba-b469-81697310358d"
            alt="masukin image yang ada di line"
          />
        </div>
      </div>

      <div className={`w-screen h-72 flex flex-row px-20 mt-0`}>
        {/* Left */}
        <div className={`w-2/6 h-full flex flex-col gap-4`}>
          <h1 className={`text-3xl font-bold`}>Savor</h1>

          <span>
            Our mission is to serve great food while saving our users time.
            Serving delicious food is important, but we also prioritize
            providing valuable information about the food to our customers.
          </span>
        </div>
        {/* Mid */}
        <div className={`w-2/6 h-full bg-blue-200 mx-12`}>
          <img
            className="w-full h-full object-cover"
            src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2Fdownload.png?alt=media&token=b1d013f6-ac03-4add-88cb-ca671643265e"
            alt="masukin gambar yang di line"
          />
        </div>
        {/* Right */}
        <div className={`w-2/6 h-full flex flex-col gap-4`}>
          <h1 className={`text-3xl font-bold`}>Sustainability</h1>

          <span>
            Comitted to the triple bottom line people, planet, and profit,
            we do everuting we can to give an environment as healthy as
            possible.
          </span>
        </div>
      </div>
      {/* 2. Timeline */}
      <div className="px-16 my-16">
        <Timeline />
      </div>

      {/* 3. Three Pillars*/}
      <div className={`flex flex-row w-screen h-96 px-16 my-20`}>
        <div className={`w-1/2 h-full px-4 flex flex-col gap-y-10`}>
          {/* Left */}
          <h1 className={`text-5xl font-bold tracking-wide`}>
            Cook Faster
            <br />
            Deliver Faster
          </h1>

          <p className={`text-lg`}>
            We know your time is valuable. We can quickly deliver the food
            cooked with love, to give the best experience and efficiency to
            everyone, so you can focus on your kitchen.
          </p>
          <div className={`flex flex-row gap-x-12`}>
            <button className={`bg-black text-white py-3 px-8 rounded`}>
              Explore partner stories
            </button>
            <button
              className={`border-2 border-black text-black bg-transparent py-3 px-8 rounded flex items-center`}
            >
              Contact Our Team <FaArrowRight className={`ml-2`} />
            </button>
          </div>
        </div>
        <div className={`w-1/2 h-full overflow-hidden relative`}>
          {/* Right */}
          <div className={`w-full h-full flex flex-row`}>
            <PartnerContainer radius={300} top={10} />
            <PartnerContainer radius={300} top={5} />
            <PartnerContainer radius={300} top={0} />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
  );
}
