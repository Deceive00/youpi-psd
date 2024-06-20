import { useEffect, useState } from "react";
import MainLayout from "src/layout/main-layout";
import { Input } from "@components/ui/input";
import blank from "@assets/logo/blankprofpic.png";
import UserMiddleware from "src/middleware/user-middleware";
import { useMutation, useQuery } from "react-query";
import { User, UserType } from "@lib/types/user-types";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@components/ui/date-picker";
import { useAuth } from "@lib/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { updateUser } from "@lib/services/user.service";
import { convertTimestampToDate } from "@lib/services/formatter.service";
import AddAvatar from "@components/pictures/add-avatar";
import useUploadPhoto from "@lib/hooks/useUploadPhoto";
import { Button } from "@components/ui/button";
import Loader from "@components/loading/loader";
import { useToast } from "@components/ui/use-toast";
import { Toaster } from "@components/ui/toaster";

export default function ProfilePage() {
  const { user, userType, isLoading } = useAuth();
  const [load, setLoad] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const { toast } = useToast();
  const [errorMsg, setErrorMsg] = useState<null | {
    title: string;
    description: string;
    variant: "default" | "destructive" | "success" | "error";
  }>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (userType != UserType.USER) {
        navigate("/auth");
      }
    }
  }, [isLoading]);
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
      toast({
        title: errorMsg.title,
        description: errorMsg.description,
        variant: errorMsg.variant,
      });
    }
  }, [errorMsg]);

  const { uploadPhoto } = useUploadPhoto();
  const { mutate: update, isLoading: updateLoading } = useMutation(
    async (data: any) => {
      setLoad(true);
      const defaultPhoto =
        (user as User)?.profilePicture || "https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/default.png?alt=media&token=429db833-8c08-4045-8122-ad42130f2883";
      let profilePictureUrl: string = defaultPhoto;
      console.log(data);
      if (data.profilePicture && !data.profilePicture.length) {
        const ext = data.profilePicture.name.split(".")[1];
        const emailValue = data.email;
        const fileName = `users/${data.nim}/profilePicture/${emailValue}.${ext}`;

        profilePictureUrl =
          (await uploadPhoto(data?.profilePicture, fileName)) || defaultPhoto;
      }

      await updateUser({
        nim: data.nim,
        firstName: data.firstName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        profilePicture: profilePictureUrl,
        isSender: (user as User)?.isSender,
        lastName: data.lastName,
      })
    },
    {
      onSuccess: () => {
        window.location.reload();
      },
      onError: (error: Error) => {
        console.error(error.message);
        toast({
          title: error.message,
          variant: "error",
        })
      },
    }
  );
  const handleManualSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit((data) => update(data))();
    }
  };

  if (load) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <UserMiddleware>
        <div className="container pt-20 w-4/5 mx-auto">
          <div className="flex bg-center relative w-full h-68 rounded-2xl pb-8 pl-8 shadow-md">
            <div
              className="w-full absolute left-0 top-0 h-32 bg-slate-400 rounded-t-2xl z-0"
              style={{
                backgroundImage:
                  "url('https://images.axios.com/gIMCWO5TN6OlCsXW965xfSKSC9k=/0x0:1920x1080/1920x1080/2024/05/16/1715870547736.jpg')",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="flex">
              <div className="flex mt-20 relative align-bottom">
                <Controller
                  name="profilePicture"
                  control={control}
                  defaultValue={(user as User)?.profilePicture || null}
                  render={({ field }) => (
                    <AddAvatar
                      value={field.value}
                      onChange={field.onChange}
                      className="w-40 h-40 z-50 border-2 border-gray-300"
                      currentImg={(user as User)?.profilePicture || blank}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col pl-6 h-auto justify-end gap-4">
                <div className="mt-10">
                  <h1 className="text-2xl font-bold">
                    {isLoading
                      ? "Loading"
                      : (user as User).firstName +
                        " " +
                        (user as User).lastName}
                  </h1>
                  {/* <p className='text-gray-500 font-medium'>@goyounjung04</p> */}
                </div>
                <button className="bg-primary color hover:bg-primary/90 rounded-md w-20 h-8 text-sm text-white">
                  Log Out
                </button>
              </div>
            </div>
          </div>
          {/* <h1 className='text-2xl font-bold my-11'>Personal Info</h1> */}
          <form
            action=""
            onSubmit={handleSubmit((data) => {
              console.log("awdaw");
              update(data);
            })}
            className="flex flex-col my-11 gap-4"
          >
            <div className="flex flex-col w-full gap-4 md:gap-">
              <div className="flex gap-4 md:gap-12 md:flex-row flex-col w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={
                      isLoading ? "Loading" : (user as User).firstName
                    }
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="firstName"
                        type="text"
                        required
                        placeholder="First Name"
                        defaultValue={
                          isLoading ? "Loading" : (user as User).firstName
                        }
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={
                      isLoading ? "Loading" : (user as User).lastName
                    }
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="lastName"
                        type="text"
                        required
                        placeholder="Last Name"
                        defaultValue={
                          isLoading ? "Loading" : (user as User).lastName
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 md:gap-12 md:flex-row flex-col w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <Controller
                    name="nim"
                    control={control}
                    defaultValue={isLoading ? "Loading" : (user as User)?.nim || ''}
                    rules={{ required: "NIM is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="nim"
                        type="text"
                        required
                        placeholder="NIM"
                        defaultValue={isLoading ? "Loading" : (user as User)?.nim || ''}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={(user as User)?.email || ''}
                    render={({ field }) => (
                      <Input
                        type="text"
                        id="email"
                        defaultValue={
                          isLoading ? "Loading" : (user as User).email
                        }
                        placeholder="Email"
                        disabled
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 md:gap-12 md:flex-row flex-col w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue={
                      isLoading ? "Loading" : (user as User).phoneNumber
                    }
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
                        defaultValue={
                          isLoading ? "Loading" : (user as User).phoneNumber
                        }
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <Controller
                    name="dob"
                    control={control}
                    defaultValue={convertTimestampToDate((user as User)?.dob)}
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
              </div>
            </div>
            <div className="flex justify-start items-start">
              <Button type="submit" onClick={handleManualSubmit}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </UserMiddleware>
      <Toaster />
    </MainLayout>
  );
}
