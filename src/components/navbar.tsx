import { useEffect, useState } from "react";
import logo from "@assets/logo/default-logo.png";
import blank from "@assets/logo/blankprofpic.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useAuth } from "@lib/hooks/useAuth";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { BiChevronDown } from "react-icons/bi";
type Props = {
  className?: string;
};

const Navbar = ({ className = "bg-transparent" }: Props) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const defaultStyles = {opacity: "0%", transform: "translateY(-10%)"}
  const [navStyles0, setNavStyles0] = useState(defaultStyles)
  const [navStyles1, setNavStyles1] = useState(defaultStyles)
  const [navStyles2, setNavStyles2] = useState(defaultStyles)
  const [navStyles3, setNavStyles3] = useState(defaultStyles)
  const [navStyles4, setNavStyles4] = useState(defaultStyles)
  const [navStyles5, setNavStyles5] = useState(defaultStyles)

  const functionArrs = [setNavStyles0, setNavStyles1, setNavStyles2, setNavStyles3, setNavStyles4, setNavStyles5]

  useEffect(() => {

    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 150))
      for(let i = 0; i < 6; i ++) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        if(isMobileMenuOpen) {
          functionArrs[i]({opacity: "100%", transform: "translateY(0%)"})
        }
        else {
          functionArrs[i](defaultStyles)
        }
      }
    })()
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`${className} font-nunito flex justify-between w-full shadow-md p-3 px-5 md:px-8 items-center h-14 z-1000`}
    >
      <div className="flex py-1 gap-8 items-center justify-center h-full z-10">
        <img src={logo} className="h-5" alt="" onClick={() => navigate('/')}/>
        <div className="hidden md:flex gap-8 font-bold">
          <Link to="/order">Order</Link>
          <Link to="/about">About</Link>
          <Link to="/history">History</Link>
        </div>
      </div>
      <div className="gap-8 items-center justify-center h-full md:flex hidden">
        {user ? (
          <>
            <img
              className="w-9 h-9 object-cover rounded-3xl"
              src={blank}
              alt=""
            />
            <Button
              className="rounded-md font-nunito font-bold"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          </>
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
      </div>
      <div className="md:hidden flex justify-center items-center gap-3 z-10">
        <button onClick={toggleMobileMenu} className="focus:outline-none text-orange-500 transition-all duration-500">
          {isMobileMenuOpen ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
      </div>
        <div 
          className="absolute h-screen top-14 py-5 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden transition-all duration-500"
          style={{transform: isMobileMenuOpen ? 'translateY(0%)' : 'translateY(-100%)'}}
        >
          <Link to="/" className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl" style={navStyles0}>
            Profile
          </Link>
          <Link to="/order" className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl" style={navStyles1}>
            Order
          </Link>
          <Link to="/" className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl flex items-center" style={navStyles2}>
            Partner with us <BiChevronDown/>
          </Link>
          <Link to="/about" className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl" style={navStyles3}>
            About
          </Link>
          <Link to="/history" className="p-5 w-full text-left transition-all duration-300 font-bold text-2xl" style={navStyles4}>
            History
          </Link>
          {user ? (
            <div className="p-5 w-full text-left transition-all duration-300" style={navStyles5}>
              <div
                onClick={() => logout()}
                className="rounded-md font-bold text-2xl text-red-600"
              >
                Log Out
              </div>
            </div>
          ) : (
            <div className="p-5 w-full text-left transition-all duration-300" style={navStyles5}>
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
  );
};

export default Navbar;
