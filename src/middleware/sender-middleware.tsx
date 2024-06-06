import Loader from "@components/loading/loader";
import { useAuth } from "@lib/hooks/useAuth";
import { UserType } from "@lib/types/user-types";
import { ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SenderMiddlewareProps {
  children: ReactNode;
}
export default function SenderMiddleware({ children }: SenderMiddlewareProps) {
  const { user, userType, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user || userType === UserType.VENDOR) {
        navigate("/");
      } else if (userType === UserType.USER) {
        if (user && "isSender" in user && !user.isSender) {
          navigate("/");
        }
      }
    }
    console.log(user);
  }, [userType, isLoading, user]);

  if (isLoading) {
    return (
      <div className="w-[100vw] h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
