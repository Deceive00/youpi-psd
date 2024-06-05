import Loader from "@components/loading/loader";
import { useAuth } from "@lib/hooks/useAuth";
import { UserType } from "@lib/types/user-types";
import { ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface VendorMiddlewareProps {
  children: ReactNode;
}
export default function VendorMiddleware({ children }: VendorMiddlewareProps) {
  const { userType, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if(userType !== UserType.VENDOR){
        navigate('/');
      }
    }
  }, [userType, isLoading]);

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Loader/>
      </div>
    );
  }

  return <Suspense fallback={<Loader/>}>{children}</Suspense>;
}
