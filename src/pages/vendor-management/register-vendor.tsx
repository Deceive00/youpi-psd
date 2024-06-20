import { useForm, Controller } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { UserType } from "@lib/types/user-types";
import { Combobox } from "@components/ui/combo-box";
import { VendorRegis } from "@lib/types/vendor-types";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@components/ui/toaster";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";
import { ImgInput } from "@components/ui/vendor-image-input";
import useUploadPhoto from "@lib/hooks/useUploadPhoto";
import { useMutation } from "react-query";
import LoadingCircle from "@components/ui/loading-circle";
import AuthMiddleware from "src/middleware/auth-middleware";

export default function VendorRegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState<string[] | null>(null);
  const { toast } = useToast();
  const { register } = useAuth();
  const [errorMsg, setErrorMsg] = useState<null | {
    title: string;
    description: string;
    variant: string;
  }>(null);
  const password = watch("password");
  const { uploadPhoto } = useUploadPhoto();
  
  const onSubmit = async (data: any) => {
    const defaultPhoto =
      "https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/default.png?alt=media&token=429db833-8c08-4045-8122-ad42130f2883";
    let coverImageUrl: string = defaultPhoto;
    if (data.coverImage) {
      const ext = data.coverImage.name.split(".")[1];
      console.log(data.coverImage.name);
      const emailValue = data.email;
      const fileName = `vendors/${data.campusName}/coverImage/${emailValue}.${ext}`;

      coverImageUrl =
        (await uploadPhoto(data.coverImage, fileName)) || defaultPhoto;
    }

    register({
      regisData: {
        campusName: data.campusName,
        email: data.email,
        name: data.vendorName,
        description: data.vendorDescription,
        coverImage: coverImageUrl,
        confirmationPassword: data.confirmationPassword,
        password: data.password,
      } as VendorRegis,
      userType: UserType.VENDOR,
    });
  };
  const { isLoading, mutate: submitMutate } = useMutation(onSubmit);

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

  async function getCampuses() {
    const snapshot = await getDocs(collection(db, "campus"));
    let campuses: string[] = [];
    if (!snapshot.empty) {
      snapshot.forEach((campus) => {
        campuses.push(campus.data().name);
      });
    }
    setCampuses(campuses);
  }

  useEffect(() => {
    if (errorMsg !== null) {
      // @ts-ignore
      let { id } = toast(errorMsg);
    }
  }, [errorMsg]);

  useEffect(() => {
    getCampuses();
  }, [campuses]);

  return (
    <AuthMiddleware>

      <div className="w-screen h-screen lg:items-start lg:justify-start font-nunito flex items-center justify-center">
        <div
          className={`hidden lg:block ${"lg:w-[55%]"} lg:p-7 lg:pr-0 h-full transition-all duration-300`}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/dg-travelohi.appspot.com/o/434228032_387590770791800_8682384244587217201_n.jpeg?alt=media&token=ec92f6c2-8871-4965-b1d3-346bd34fbf33"
            alt="Image"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale lg:rounded-[2rem]"
          />
        </div>
        <div
          className={`flex h-full w-full items-center justify-center overflow-y-scroll ${"lg:w-[45%]"} lg:p-[5%] h-full transition-all duration-300 ${"opacity-100"}`}
        >
          <form
            onSubmit={handleSubmit((data) => {submitMutate(data)})}
            className="mx-auto grid w-[350px] gap-6 lg:w-full lg:max-w-[700px] mt-6 overflow-scroll"
          >
            <div className="grid gap-2">
              <h1 className="text-4xl font-extrabold">Register as Vendor</h1>
              <p className="text-balance text-muted-foreground pb-4">
                Start selling your menus by filling the form below
              </p>
            </div>
            <Controller
              name="coverImage"
              control={control}
              defaultValue=""
              rules={{}}
              render={({ field }) => (
                <div >
                  <h2 className="text-lg font-semibold  mb-3">
                    <span className="text-orange-400">Cover Image</span>
                  </h2>
                  <div className="h-[9rem] sm:h-[10rem]">
                  <ImgInput value={field.value} onChange={field.onChange}  />

                  </div>
                </div>
              )}
            />
            <div className="lg:grid gap-5 flex flex-col lg:grid-cols-2 lg:gap-4">
              <Controller
                name="campusName"
                control={control}
                defaultValue=""
                rules={{ required: "Campus Name is required" }}
                render={({ field }) => (
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Campus Name"
                    itemTitle="Campus"
                    items={campuses}
                  />
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
            </div>
            <div className="lg:grid gap-5 flex flex-col lg:grid-cols-2 lg:gap-4">
              <Controller
                name="vendorName"
                control={control}
                defaultValue=""
                rules={{ required: "Vendor name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="vendorName"
                    type="text"
                    required
                    placeholder="Vendor Name"
                  />
                )}
              />  
              <Controller
                name="vendorDescription"
                control={control}
                defaultValue=""
                rules={{ required: "Vendor description is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="vendorDescription"
                    type="text"
                    required
                    placeholder="Vendor Description"
                  />
                )}
              />
            </div>
            <div className="lg:grid gap-5 flex flex-col lg:grid-cols-2 lg:gap-4">
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
                  validate: (value) =>
                    value === password || "Passwords do not match",
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
            </div>

            <Button
              type="submit"
              className="w-full font-bold h-12"
              onClick={() => setErrorMsg(null)}
              disabled = {isLoading}
            >
              {isLoading ? <LoadingCircle/> : "Register as Vendor"}
            </Button>
          </form>
        </div>
        <Toaster />
      </div>
    </AuthMiddleware>
  );
}
