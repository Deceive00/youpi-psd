import logo from "@assets/logo/default-logo.png";
import blank from "@assets/logo/blankprofpic.png";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";
import { AuthContext } from "src/context/auth-context";
import { useContext } from "react";

type props = {
  className?: string;
};

const Navbar = ({ className = "bg-transparent" }: props) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`${className} flex justify-between w-full shadow-md p-3 px-8 items-center h-14`}
    >
      <div className="flex py-1 gap-8 items-center justify-center h-full">
        <img src={logo} className="h-5" alt="" />
        <Link to="">Order</Link>
        <Link to="">About</Link>
        <Link to="">History</Link>
      </div>
      {/* <div className="flex py-1 gap-5 items-center justify-center">
      </div> */}
      <div className="flex gap-8 items-center justify-center h-full">
        {user ? (
          <img
            className="w-9 h-9 object-cover rounded-3xl"
            src={blank}
            alt=""
          />
        ) : (
          <div className="flex gap-2">
            <Button>Login</Button>
            <Button>Register</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
