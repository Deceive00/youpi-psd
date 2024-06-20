import { useForm, Controller } from "react-hook-form";
import { Button } from "@components/ui/button";
import { DatePicker } from "@components/ui/date-picker";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { useEffect, useState } from "react";
import { useAuth } from "@lib/hooks/useAuth";
import { AuthState, UserType, User } from "@lib/types/user-types";
import { Combobox } from "@components/ui/combo-box";
import { VendorRegis } from "@lib/types/vendor-types";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@components/ui/toaster";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";
import { ImgInput } from "@components/ui/vendor-image-input";
import useUploadPhoto from "@lib/hooks/useUploadPhoto";
import { Checkbox } from "@components/ui/checkbox";
import { useMutation } from "react-query";
import LoadingCircle from "@components/ui/loading-circle";

export default function SenderRegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, authState, isLoading, user, userType } = useAuth();
  useEffect(() => {
    if (!isLoading) {
      if (
        !(authState === AuthState.Authenticated) ||
        userType != UserType.USER || (user as User).isSender  == true
      ) {
        navigate("/auth");
      }
    }
  }, [authState, isLoading]);
  const [errorMsg, setErrorMsg] = useState<null | {
    title: string;
    description: string;
    variant: string;
  }>(null);
  const { uploadPhoto } = useUploadPhoto();
  const onSubmit = async (data: any) => {
    const defaultPhoto =
      "https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/default.png?alt=media&token=429db833-8c08-4045-8122-ad42130f2883";
    let ktpImageUrl: string = defaultPhoto;
    console.log(data);
    if (data.ktpImage) {
      const ext = data.ktpImage.name.split(".")[1];
      console.log(data.ktpImage.name);
      const fileName = `users/${auth?.currentUser?.email}/images/ktpImage.${ext}`;

      ktpImageUrl =
        (await uploadPhoto(data.ktpImage, fileName)) || defaultPhoto;
    }
    console.log(ktpImageUrl);
    const userRef = doc(db, "users", auth?.currentUser?.uid as string);
    const user = await getDoc(userRef);
    if (user.exists()) {

      await updateDoc(userRef, {
        isSender: true,
        identityImage: ktpImageUrl
      });
      navigate("/");

      return;
    } else {
      throw new Error("User document not found");
    }
  };
  const { status, mutate: submitMutate } = useMutation(onSubmit);

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


  return (
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
          onSubmit={handleSubmit((data) => submitMutate(data))}
          className="mx-auto grid w-[350px] gap-6 lg:w-full lg:max-w-[700px] mt-6 overflow-scroll"
        >
          <div className="grid gap-2">
            <h1 className="text-4xl font-extrabold">Register as Sender</h1>
            <p className="text-balance text-muted-foreground pb-3">
              Start sending orders by filling the form below
            </p>
          </div>

          <Controller
            name="ktpImage"
            control={control}
            defaultValue=""
            rules={{ required: "You must upload your identity card" }}
            render={({ field }) => (
              <div>
                <h2 className="text-lg mb-3 font-semibold">
                  Please upload your{" "}
                  <span className="text-orange-400">Identity Card</span> below
                </h2>
                <div className="h-[11rem] sm:h-[12rem]">
                  <ImgInput value={field.value} onChange={field.onChange} />
                </div>
              </div>
            )}
          />
          <Controller
            name="checkBox"
            control={control}
            defaultValue={""}
            rules={{ required: "You must accept the terms and conditions" }}
            render={({ field }) => (
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="terms"
                  className="h-4 w-4"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-base text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full font-bold h-12 flex items-center justify-center"
            onClick={() => setErrorMsg(null)}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <LoadingCircle/>
            ) : (
              "Register as Vendor"
            )}
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
