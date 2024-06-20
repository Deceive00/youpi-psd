import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { buttonVariants } from "@components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@lib/hooks/useAuth";
import { SeedVendor } from "src/seeder/vendor-seeder";
import { useEffect, useState } from "react";
import { useToast } from "@components/ui/use-toast";
import { useMutation } from "react-query";
import LoadingCircle from "@components/ui/loading-circle";

interface LoginSubPageProps {
  changeMode: any;
}

export default function LoginSubPage({ changeMode }: LoginSubPageProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<null | {title : string, description : string, variant : string}>(null);

  if (Object.keys(errors).length > 0 && errorMsg === null) {
    Object.values(errors).forEach((error) => {
      if (error && error.message) {
        setErrorMsg({
          title: "Form Validation Error",
          description: error.message as string,
          variant: "error",
        })
      }
    });
  }

  useEffect(() => {
    if(errorMsg !== null) {
      // @ts-ignore
      let { id } = toast(errorMsg)
      
    }
  }, [errorMsg]);

  const submitLogin = async (data: any) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };
  const { status, mutate: submitMutate } = useMutation(submitLogin);

  return (
    <form
      onSubmit={handleSubmit((data)=>{submitMutate(data)})}
      className="mx-auto grid w-[350px] gap-6"
    >
      <div className="grid gap-2">
        {/* <Button onClick={() => SeedVendor()}>Seed Vendor</Button> */}
        <h1 className="text-4xl font-extrabold">Welcome Back !</h1>
        <p className="text-balance text-muted-foreground pb-4">
          Continue with Google or enter your credentials
        </p>
      </div>
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                required
                placeholder="Email"
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                type="password"
                required
                placeholder="Password"
              />
            )}
          />
        </div>
        <a
          href="/forgot-password"
          className="ml-auto inline-block text-sm orange-text-color font-semibold"
        >
          Forgot password?
        </a>
        <Button type="submit" className="w-full font-bold h-12" onClick={() => setErrorMsg(null)} disabled={status === 'loading'}>
          {status === 'loading' ? <LoadingCircle/> : "Log In"}
        </Button>
        <div className="flex flex-row items-center justify-between">
          <div className="bg-muted-foreground h-[1px] w-[30%]"></div>
          <p className="text-muted-foreground">or continue with</p>
          <div className="bg-muted-foreground h-[1px] w-[30%]"></div>
        </div>
        <Button
          className={`${buttonVariants({
            variant: "outline",
          })} w-full text-black h-12 flex flex-row gap-1`}
        >
          <FcGoogle className="w-6 h-6" />
          <p>Continue With Google</p>
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="orange-text-color font-semibold underline"
          onClick={() => changeMode("register")}
        >
          Sign up for free
        </a>
      </div>
    </form>
  );
}
