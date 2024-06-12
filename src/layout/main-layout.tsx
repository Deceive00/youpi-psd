import Footer from "@components/footer";
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

  return (
    <>
      <div className={`fixed z-40 w-screen`}>
        <Navbar className="bg-white" isLoading={isLoading} />
      </div>
      <div className={`${className} w-full min-h-screen`}>{children}</div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default MainLayout;
