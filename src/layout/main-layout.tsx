import Footer from "@components/footer";
import Loader from "@components/loading/loader";
import Navbar from "@components/navbar";
import { useAuth } from "@lib/hooks/useAuth";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: String;
  navbarClassName?: string;
};

const MainLayout: React.FC<Props> = ({ children, className = "p-6" }) => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className={`fixed z-40 w-screen`}>
        <Navbar className="bg-white" />
      </div>
      <div className={`${className} w-full min-h-screen`}>{children}</div>

      {/* Footer */}
      <Footer/>
    </>
  );
};

export default MainLayout;
