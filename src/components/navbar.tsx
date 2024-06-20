import { useEffect, useState } from "react";
import logo from "@assets/logo/default-logo.png";
import blank from "@assets/logo/blankprofpic.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useAuth } from "@lib/hooks/useAuth";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
import { Skeleton } from "./ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GoPerson } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";
import { User } from "@lib/types/user-types";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Separator } from "./ui/separator";
import { IoMailOutline } from "react-icons/io5";

type Props = {
  className?: string;
  isLoading: boolean;
};

const Navbar = ({ className = "bg-transparent", isLoading }: Props) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const defaultStyles = { opacity: "0%", transform: "translateY(-10%)" };
  const [navStyles0, setNavStyles0] = useState(defaultStyles);
  const [navStyles1, setNavStyles1] = useState(defaultStyles);
  const [navStyles2, setNavStyles2] = useState(defaultStyles);
  const [navStyles3, setNavStyles3] = useState(defaultStyles);
  const [navStyles4, setNavStyles4] = useState(defaultStyles);
  const [navStyles5, setNavStyles5] = useState(defaultStyles);
  const [navStyles6, setNavStyles6] = useState(defaultStyles);
  const [navStyles7, setNavStyles7] = useState(defaultStyles);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const functionArrs = [
    setNavStyles0,
    setNavStyles1,
    setNavStyles2,
    setNavStyles3,
    setNavStyles4,
    setNavStyles5,
    setNavStyles6,
    setNavStyles7,
  ];
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const len = user && "isSender" in user  &&(user as User).isSender ? 8 : 7;
      for (let i = 0; i < len; i++) {
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

  return (
    <>
      <div
        className={`${className} font-nunito flex justify-between w-full shadow-md p-3 px-5 md:px-8 items-center h-14 z-1000`}
      >
        <div className="flex py-1 gap-8 items-center justify-center h-full z-10">
          <img
            src={logo}
            className="h-5"
            alt=""
            onClick={() => navigate("/")}
          />
          <div className="hidden md:flex gap-8 font-bold">
            <Link to="/order">Order</Link>
            <Link to="/about">About</Link>
            <Link to="/history">History</Link>
          </div>
        </div>
        <div className="gap-2 items-center justify-center h-full md:flex hidden">
          {user && !isLoading ? (
            <>
              <div
                className="hover:bg-gray-100 p-2 transition-all duration-300 rounded-md"
                onClick={() => navigate("/chat")}
              >
                <IoMailOutline className="h-7 w-7" />
              </div>
              <div className="w-[1px] bg-gray-300 h-full"></div>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition-all duration-300">
                    <img
                      className="w-7 h-7 object-cover rounded-3xl cursor-pointer"
                      src={blank}
                      alt=""
                    />
                    <p>{(user as User).firstName as React.ReactNode}</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="center"
                  className="w-52 mr-2"
                >
                  <div className="grid gap-1">
                    <div
                      className="hover:bg-gray-100 text-sm transition-all rounded-md p-2 duration-200 font-nunito font-bold flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      <GoPerson className="w-5 h-5" />
                      <p>Your Profile</p>
                    </div>
                    <Separator className="border-[0.5px] rounded-lg" />
                    <div className="hover:bg-gray-100 text-sm transition-all rounded-md p-2 duration-200 font-nunito font-bold flex items-center gap-2 cursor-pointer">
                      <MdOutlinePayment className="w-5 h-5" />
                      <p>Your Payment</p>
                    </div>

                    {user && "isSender" in user  &&(user as User).isSender && (
                      <>
                        <Separator className="border-[0.5px] rounded-lg" />
                        <div
                          className="hover:bg-gray-100 text-sm transition-all rounded-md p-2 duration-200 font-nunito font-bold flex items-center gap-2 cursor-pointer"
                          onClick={() => navigate("/sender/manage/order")}
                        >
                          <MdOutlineDeliveryDining className="w-5 h-5" />
                          <p>Sender Dashboard</p>
                        </div>
                      </>
                    )}
                    <Separator className="border-[0.5px] rounded-lg" />
                    <div
                      className="hover:bg-gray-100 text-sm transition-all rounded-md p-2 duration-200 font-nunito font-bold text-red-600"
                      onClick={async () => await logout()}
                    >
                      Log Out
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {isLoading ? (
                <Skeleton className="h-9 w-9 rounded-[50%] bg-gray-200"></Skeleton>
              ) : (
                <div className="flex gap-2">
                  <Button
                    className="rounded-md font-nunito font-bold"
                    onClick={() => navigate("/auth")}
                  >
                    Login
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
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
          className="absolute h-screen top-14 py-5 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden transition-all duration-500"
          style={{
            transform: isMobileMenuOpen
              ? "translateY(0%)"
              : "translateY(-100%)",
          }}
        >
          <Link
            to="/profile"
            className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl"
            style={navStyles0}
          >
            Profile
          </Link>
          <Link
            to="/order"
            className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl"
            style={navStyles1}
          >
            Order
          </Link>
          <Link
            to="/auth/sender"
            className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl flex items-center"
            style={navStyles2}
          >
            Partner with us <BiChevronDown />
          </Link>
          <Link
            to="/about"
            className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl"
            style={navStyles3}
          >
            About
          </Link>
          <Link
            to="/history"
            className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl"
            style={navStyles4}
          >
            History
          </Link>
          <Link
            to="/cart"
            className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl"
            style={navStyles5}
          >
            Cart
          </Link>
          {user ? (
            <>
              <Link
                to="/sender/manage/order"
                className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl"
                style={navStyles5}
              >
                Sender Dashboard
              </Link>
              <div
                className="p-5 w-full text-left transition-all duration-300"
                style={user && "isSender" in user  &&(user as User).isSender ? navStyles7 : navStyles6}
              >
                <div
                  onClick={async () => await logout()}
                  className="rounded-md font-bold text-2xl text-red-600"
                >
                  Log Out
                </div>
              </div>
            </>
          ) : (
            <div
              className="p-5 w-full text-left transition-all duration-300"
              style={navStyles6}
            >
              <Link
                to={"/auth"}
                className="rounded-md font-bold text-2xl orange-text-color"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
