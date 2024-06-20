import { DialogHeader, DialogFooter, Dialog } from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import LoadingCircle from "@components/ui/loading-circle";
import { ImgInput } from "@components/ui/vendor-image-input";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Menu } from "@lib/types/vendor-types";
import { useToast } from "@components/ui/use-toast";

interface MenuPopupProps {
  onSubmit: any;
  isLoading: boolean;
  open: boolean;
  defaultValue?: Menu;
  setOpen: any;
  description: string;
  title: string;
}
export default function MenuPopup({
  onSubmit,
  isLoading,
  open,
  defaultValue,
  setOpen,
  description,
  title,
}: MenuPopupProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { toast } = useToast();
  const [errorMsg, setErrorMsg] = useState<null | {
    title: string;
    description: string;
    variant: "default" | "destructive" | "success" | "error";
  }>(null);
  useEffect(() => {
    if (open && defaultValue && !isLoading) {
      reset(defaultValue);
    }
  }, [open, defaultValue, reset]);

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
  const changeOpen = (opened: boolean) => {
    if (!isLoading) {
      setOpen(opened);
    }
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <Controller
            name="name"
            control={control}
            defaultValue={defaultValue?.name || ""}
            rules={{
              required: "Menu name is required",
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                type="text"
                required
                placeholder="Menu Name"
                defaultValue={defaultValue?.name || ""}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Menu description is required",
            }}
            defaultValue={defaultValue?.description || ""}
            render={({ field }) => (
              <Input
                {...field}
                id="description"
                type="text"
                required
                placeholder="Menu Description"
                defaultValue={defaultValue?.description || ""}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Menu price is required",
            }}
            defaultValue={defaultValue?.price as number}
            render={({ field }) => (
              <Input
                {...field}
                id="price"
                type="number"
                required
                placeholder="Menu Price"
                defaultValue={defaultValue?.price as number}
              />
            )}
          />
          <div className="w-full max-h-72">
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{}}
              render={({ field }) => (
                <ImgInput
                  defaultImage={defaultValue?.image}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

          </div>
          <DialogFooter>
            <Button type="submit">
              {isLoading ? <LoadingCircle /> : title}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
