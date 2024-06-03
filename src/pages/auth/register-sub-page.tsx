import { useForm, Controller } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DatePicker } from "@components/ui/date-picker";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { UserRegis, UserType } from "@lib/types/user-types";
import { useMutation } from "react-query";
import LoadingCircle from "@components/ui/loading-circle";

interface RegisterSubPageProps {
  changeMode: (mode: string) => void;
}

export default function RegisterSubPage({ changeMode }: RegisterSubPageProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { toast } = useToast();
  const { register } = useAuth();
  const [errorMsg, setErrorMsg] = useState<null | {
    title: string;
    description: string;
    variant: string;
  }>(null);
  const password = watch("password");

  const onSubmit = async (data: any) => {
    console.log(data);
    await register(
      {
        regisData: {
          nim: data.nim,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          confirmationPassword: data.confirmationPassword,
          phoneNumber: data.phoneNumber,
          password: data.password,
        } as UserRegis,
        userType:UserType.USER

      }
    );
  };

  if (Object.keys(errors).length > 0 && errorMsg === null) {
    Object.values(errors).forEach((error) => {
      if (error && error.message) {
        setErrorMsg({
          title: "Form Validation Error",
          description: error.message as string,
          variant: "error",
        });
      }
    });
  }

  useEffect(() => {
    if (errorMsg !== null) {
      // @ts-ignore
      let { id } = toast(errorMsg);
    }
  }, [errorMsg]);
  const { status, mutate: submitMutate } = useMutation(onSubmit);

  return (
    <form
      onSubmit={handleSubmit((data)=>{submitMutate(data)})}
      className="mx-auto grid w-[350px] gap-6 lg:w-full lg:max-w-[700px] mt-16 overflow-scroll"
    >
      <div className="grid gap-2">
        <h1 className="text-4xl font-extrabold">Sign Up</h1>
        <p className="text-balance text-muted-foreground pb-4">
          Create an account by filling in the information below
        </p>
      </div>
      <div className="lg:grid gap-5 flex flex-col lg:grid-cols-2 lg:gap-4">
        <Controller
          name="nim"
          control={control}
          defaultValue=""
          rules={{ required: "NIM is required" }}
          render={({ field }) => (
            <Input {...field} id="nim" type="text" required placeholder="NIM" />
          )}
        />
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
        <Controller
          name="confirmationPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Confirmation password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="confirmationPassword"
              type="password"
              required
              placeholder="Confirmation Password"
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: "First name is required" }}
          render={({ field }) => (
            <Input
              {...field}
              id="firstName"
              type="text"
              required
              placeholder="First Name"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: "Last name is required" }}
          render={({ field }) => (
            <Input
              {...field}
              id="lastName"
              type="text"
              required
              placeholder="Last Name"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone number should only contain digits",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="phoneNumber"
              type="tel"
              required
              placeholder="Phone Number"
            />
          )}
        />
        <Controller
          name="dob"
          control={control}
          defaultValue={null}
          rules={{ required: "Date of birth is required" }}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="Date Of Birth"
              className="col-span-2 lg:col-span-1"
            />
          )}
        />
      </div>
      {status}
      <Button
        type="submit"
        className="w-full font-bold h-12"
        onClick={() => setErrorMsg(null)}
        disabled = {status === 'loading' || status === 'success'}
      >
        {status === 'loading' || status === 'success' ? <LoadingCircle/> : "Sign Up"}
      </Button>
      <div className="mb-4 text-center text-sm">
        Already have an account?{" "}
        <a
          href="#"
          className="orange-text-color font-semibold underline"
          onClick={() => changeMode("login")}
        >
          Log In
        </a>
      </div>
    </form>
  );
}
