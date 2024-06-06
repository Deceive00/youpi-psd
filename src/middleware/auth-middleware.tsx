import Loader from "@components/loading/loader";
import { useAuth } from "@lib/hooks/useAuth";
import { AuthState } from "@lib/types/user-types";
import { ReactNode, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthMiddlewareProps {
  children: ReactNode;
}
export default function AuthMiddleware({ children }: AuthMiddlewareProps) {
  const { authState, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      console.log(authState);
      
      if(authState === AuthState.Authenticated || user){
        navigate('/');
      }
    }
  }, [authState, isLoading]);

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Loader/>
      </div>
    );
  }

  return <Suspense fallback={<Loader/>}>{children}</Suspense>;
}
