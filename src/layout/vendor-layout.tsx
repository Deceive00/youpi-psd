import { Separator } from "@components/ui/separator";
import { ReactNode } from "react";
import logo from "@assets/logo/default-logo.png";
import { VendorRoutes } from "@lib/routes/vendor-routes";
import { Button } from "@components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import VendorMiddleware from "src/middleware/vendor-middleware";
interface VendorLayoutProps {
  children: ReactNode;
  menuName: string;
  menuDescription: string;
}
export default function VendorLayout({
  children,
  menuName,
  menuDescription,
}: VendorLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <VendorMiddleware>
      <div className="bg-white w-screen h-screen flex-col flex">
        <div className="w-full h-20 p-6 fixed">
          <div className="flex items-center gap-2 px-6 py-6">
            <img src={logo} className="object-cover h-10" alt="" />
            <div
              className={`text-3xl font-[500] overflow-hidden duration-500 `}
            ></div>
          </div>
        </div>

        <div className="px-12 pt-24 pb-8 h-full w-full flex flex-col">
          <div className="mb-8" />
          <div className="w-full h-28 py-4 flex flex-col gap-2">
            <h1 className="text-3xl font-medium ">{menuName}</h1>
            <h1 className="text-base text-gray-400">{menuDescription}</h1>
            <Separator className="bg-gray-300" />
          </div>
          <div className="w-full h-full flex gap-28 mt-4">
            <div className="w-[25%] h-full flex flex-col justify-between">
              <div className="w-full h-fit flex flex-col gap-2">
                {VendorRoutes.map((menu) => {
                  return (
                    <Button
                      onClick={() => {
                        navigate(`${menu.path}`);
                      }}
                      variant={"secondary"}
                      className={`w-full justify-start text-base  ${
                        menu.path == location.pathname
                          ? "bg-orange-100 hover:bg-orange-100"
                          : "bg-white"
                      }`}
                    >
                      {menu.name}
                    </Button>
                  );
                })}
              </div>

              <div className="w-full h-fit">
                <Button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="bg-transaparent w-full justify-start text-base hover:bg-orange-100"
                  variant={"ghost"}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      </div>
    </VendorMiddleware>
  );
}
