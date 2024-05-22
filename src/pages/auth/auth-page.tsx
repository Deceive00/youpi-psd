import { Input } from "@components/ui/input";
import { useAuth } from "@lib/hooks/useAuth";

export default function AuthPage() {

  const {register} = useAuth();
  return (
    <div className='font-restart w-screen h-screen flex'>
      <div className="w-[55%] h-[100%] bg-slate-400 rounded-e-3xl">
      </div>
      <div className="w-[45%] h-[100%]">
        <div className="">
          <p className="text-3xl font-normal text-center">Hello Again!</p>
          <p className="font-light text-sm text-center text-gray-600">Welcome back you've been missed</p>
    
        </div>
      </div>
    </div>
  )
}
