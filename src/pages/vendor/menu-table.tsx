import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { ImgInput } from "@components/ui/vendor-image-input";
import { useAuth } from "@lib/hooks/useAuth";
import useUploadPhoto from "@lib/hooks/useUploadPhoto";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useToast } from "@components/ui/use-toast";
import { addMenu } from "@lib/services/vendor.service";
import { useMutation } from "react-query";
import LoadingCircle from "@components/ui/loading-circle";

interface props {
  menu: Menu[];
  categoryName: string;
}
export default function MenuTable({ menu, categoryName }: props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState<null | {
    title: string;
    description: string;
    variant: string;
  }>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { uploadPhoto } = useUploadPhoto();
  if (Object.keys(errors).length > 0 && errorMsg === null) {
    console.log('tes');
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

  const handleInsertMenu = async (data: any) => {
    const defaultPhoto =
      "https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/default.png?alt=media&token=429db833-8c08-4045-8122-ad42130f2883";
    let imageUrl: string = defaultPhoto;
    console.log(data);
    if (data.image) {
      console.log(user)
      const ext = data.image.name.split(".")[1];
      const fileName = `vendors/${(user as Vendor).campusName}/${(user as Vendor).name}/${
        data.name
      }.${ext}`;

      imageUrl = (await uploadPhoto(data.image, fileName)) as string;
      console.log(imageUrl)
    }
    await add({
      name: data.name,
      description: data.description,
      price: data.price,
      image: imageUrl,
    } as Menu)
  };

  const {mutate: add, isLoading} = useMutation(async (menu : Menu) => {
    if(user){
      return await addMenu((user as Vendor).campusName, (user as Vendor).id, menu, categoryName);
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
      window.location.reload();
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!menu ? (
            <TableRow className="">
              <TableCell colSpan={5}>No Data</TableCell>
            </TableRow>
          ) : (
            <>
              {menu.map((menu, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{`${menu.name}`}</TableCell>
                    <TableCell>{menu.description}</TableCell>
                    <TableCell>{menu.price as ReactNode}</TableCell>
                    <TableCell>
                      <img
                        src={menu.image}
                        alt={menu.image}
                        className="w-24 h-w-24 object-cover"
                      />
                    </TableCell>
                    <TableCell className="">
                      <div className="flex flex-row gap-1">
                        <CiEdit className="w-7 h-7 hover:bg-gray-100 p-1 transition-all rounded-md" />
                        <MdDeleteOutline className="w-7 h-7 text-red-500 p-1 hover:bg-gray-100 transition-all rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableCell>
            <DialogTrigger>
              <Button variant={"outline"}>+ Add Menu</Button>
            </DialogTrigger>
          </TableCell>
        </TableFooter>
      </Table>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Menu</DialogTitle>
          <DialogDescription>
            Insert new menus for your vendor. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleInsertMenu)}
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
              <Button type="submit" onClick={() => setOpen(false)}>{isLoading ? <LoadingCircle/> : 'Add Menu'}</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
