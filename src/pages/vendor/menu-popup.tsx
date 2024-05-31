import { DialogHeader, DialogFooter } from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import LoadingCircle from "@components/ui/loading-circle";
import { ImgInput } from "@components/ui/vendor-image-input";
import { DialogContent, DialogTitle, DialogDescription, DialogClose } from "@components/ui/dialog";
import React from "react";
import { Button } from "react-day-picker";
import { Controller } from "react-hook-form";

interface MenuPopupProps {
  control: any;
  handleSubmit: any
  isLoading: boolean;
}
export default function MenuPopup({control, handleSubmit, isLoading} : MenuPopupProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Insert Menu</DialogTitle>
        <DialogDescription>
          Insert new menus for your vendor. Click add when you're done.
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 py-4"
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
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
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{
            required: "Menu description is required",
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="description"
              type="text"
              required
              placeholder="Menu Description"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue=""
          rules={{
            required: "Menu price is required",
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="price"
              type="number"
              required
              placeholder="Menu Price"
            />
          )}
        />
        <Controller
          name="image"
          control={control}
          defaultValue=""
          rules={{}}
          render={({ field }) => (
            <ImgInput value={field.value} onChange={field.onChange} />
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">
              {isLoading ? <LoadingCircle /> : "Add Menu"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
