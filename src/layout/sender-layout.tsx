import { Separator } from "@components/ui/separator";
import { ReactNode, useEffect, useState } from "react";
import logo from "@assets/logo/default-logo.png";
import { Button } from "@components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SenderMiddleware from "src/middleware/sender-middleware";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "@lib/hooks/useAuth";
import { SenderRoutes } from "@lib/routes/sender-routes";
import { Toaster } from "@components/ui/toaster";
interface SenderLayoutProps {
  children: ReactNode;
  menuName?: string;
  menuDescription?: string;
}
export default function SenderLayout({
  children,
  menuName,
  menuDescription,
}: SenderLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const defaultStyles = { opacity: "0%", transform: "translateY(-10%)" };
  const [navStyles0, setNavStyles0] = useState(defaultStyles);
  const [navStyles1, setNavStyles1] = useState(defaultStyles);
  const [navStyles2, setNavStyles2] = useState(defaultStyles);

  const functionArrs = [setNavStyles0, setNavStyles1, setNavStyles2];

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (isMobileMenuOpen) {
          functionArrs[i]({ opacity: "100%", transform: "translateY(0%)" });
        } else {
          functionArrs[i](defaultStyles);
        }
      }
    })();
  }, [isMobileMenuOpen]);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { logout } = useAuth();
  return (
    <SenderMiddleware>
      <div className="font-nunito bg-white w-full h-screen flex-col flex overflow-x-hidden overflow-y-hidden">
        <div className="w-full h-20 p-6 fixed">
          <div className="flex items-center justify-between gap-2 px-6 py-6 z-1000">
            <img src={logo} className="object-cover h-10 z-1000" alt="" />
            <div className="md:hidden flex justify-center items-center gap-3 z-10">
              <button
                onClick={toggleMobileMenu}
                className="focus:outline-none text-orange-500 transition-all duration-500"
              >
                {isMobileMenuOpen ? (
                  <RxCross2 size={24} />
                ) : (
                  <RxHamburgerMenu size={24} />
                )}
              </button>
            </div>
            <div
              className="absolute z-40 h-screen -top-2 py-5 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden transition-all duration-500"
              style={{
                transform: isMobileMenuOpen
                  ? "translateY(15%)"
                  : "translateY(-100%)",
              }}
            >
              <Link
                to="/sender/history"
                className={`p-6 px-12 w-full text-left transition-all duration-300 font-bold text-2xl ${
                  location.pathname === "/vendor/manage/menu"
                    ? "text-orange-500"
                    : ""
                }`}
                style={navStyles0}
              >
                History
              </Link>
              <Link
                to="/sender/manage/order"
                className="p-6 px-12 w-full text-left transition-all duration-300 font-bold text-2xl"
                style={navStyles1}
              >
                Manage Order
              </Link>
              <div
                className="cursor-pointer flex-start p-6 px-12 w-full text-left transition-all duration-300 font-bold text-2xl flex text-red-600"
                style={navStyles2}
                onClick={() => logout()}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>

        <div className="px-12 pt-24 pb-8 h-full w-full flex flex-col">
          <div className="mb-8" />
          <div className="w-full h-28 py-4 flex flex-col gap-2">
            <h1 className="text-3xl font-bold ">{menuName}</h1>
            <h1 className="text-base text-gray-400">{menuDescription}</h1>
            <Separator className="bg-gray-300" />
          </div>
          <div className="w-full h-full flex sm:gap-10 lg:gap-28 mt-4">
            <div className="w-[25%] h-full md:flex flex-col justify-between hidden">
              <div className="w-full h-fit flex flex-col gap-2">
                {SenderRoutes.map((menu) => {
                  return (
                    <Button
                      onClick={() => {
                        navigate(`${menu.path}`);
                      }}
                      key={menu.path}
                      variant={"secondary"}
                      className={`w-full justify-start text-base  ${
                        menu.path == location.pathname
                          ? "bg-orange-100 hover:bg-orange-100 font-bold"
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
                    logout();
                    window.location.reload();
                  }}
                  className="bg-transaparent w-full justify-start text-base hover:bg-orange-100 hover:text-red-600 text-red-600"
                  variant={"ghost"}
                >
                  Log Out
                </Button>
              </div>
            </div>
            <div className="w-full md:w-[75%] lg:w-full h-full">{children}</div>
          </div>
        </div>
      </div>
      <Toaster />
    </SenderMiddleware>
  );
}
