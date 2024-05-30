import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";
import { addCategory } from "@lib/services/vendor.service";
import { Vendor } from "@lib/types/vendor-types";
import { useState } from "react";
import { useMutation } from "react-query";

export default function AddCategoryPopup({
  vendor,
}: {
  vendor: Vendor | null;
}) {
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const [newCategory, setNewCategory] = useState<string>("");
  const {mutate: add, isLoading} = useMutation(async () => {
    if (newCategory && vendor) {
      return addCategory(vendor.campusName, vendor.id, {
        name: newCategory,
        menus: [],
      });
    }

  }, {
    onError: (error : Error) => {
      toast({
        title: error.message,
        variant: "error",
      })
    },
    onSuccess: (msg: string | undefined) => {
      if(msg){
        toast({
          title: msg,
          variant: "success",
        })
      }
      setOpen(false);
      setNewCategory('');
      window.location.reload();
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add new food category. Click add category when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            placeholder="Category Name"
            className="col-span-3 w-full"
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => add()}>
            {
              isLoading ? "Loading" : "Add Category"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
