import Loader from "@components/loading/loader";
import { useAuth } from "@lib/hooks/useAuth";
import { ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserMiddlewareProps {
  children: ReactNode;
}
export default function UserMiddleware({ children }: UserMiddlewareProps) {
  const { user, userType, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/");
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
