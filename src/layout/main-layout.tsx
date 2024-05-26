import Navbar from "@components/navbar";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
  className?: String;
  navbarClassName?: string;
};

const MainLayout: React.FC<Props> = ({ children, className = "p-6" }) => {
  return (
    <>
      <div className={` fixed z-40 w-screen`}>
        <Navbar className="bg-white"/>
      </div>
      <div className={`${className} w-full min-h-screen`}>{children}</div>
      <p>footer</p>
    </>
  );
};

export default MainLayout;
