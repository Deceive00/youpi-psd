import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { useAuth } from "@lib/hooks/useAuth";
import useUploadPhoto from "@lib/hooks/useUploadPhoto";
import { Menu, Vendor } from "@lib/types/vendor-types";
import { ReactNode, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useToast } from "@components/ui/use-toast";
import { addMenu, deleteMenu, updateMenu } from "@lib/services/vendor.service";
import { useMutation } from "react-query";
import MenuPopup from "./menu-popup";
import DeleteDialogAlert from "./delete-dialog-alert";

interface props {
  menu: Menu[];
  categoryName: string;
}
export default function MenuTable({ menu, categoryName }: props) {
  const [insertMenuOpen, setInsertMenuOpen] = useState(false);
  const [updateMenuOpen, setUpdateMenuOpen] = useState(false);
  const [deleteMenuOpen, setDeleteMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { uploadPhoto } = useUploadPhoto();
  const [chosenMenu, setChosenMenu] = useState<Menu | undefined>();


  const { mutate: add, isLoading: insertLoading } = useMutation(
    async (data: any) => {
      const defaultPhoto =
        "https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/default.png?alt=media&token=429db833-8c08-4045-8122-ad42130f2883";
      let imageUrl: string = defaultPhoto;
      if (data.image) {
        console.log(user);
        const ext = data.image.name.split(".")[1];
        const fileName = `vendors/${(user as Vendor).campusName}/${
          (user as Vendor).name
        }/${data.name}.${ext}`;

        imageUrl = (await uploadPhoto(data.image, fileName)) as string;
        console.log(imageUrl);
      }
      if (user) {
        return await addMenu(
          (user as Vendor).campusName,
          (user as Vendor).id,
          {
            name: data.name,
            description: data.description,
            price: data.price,
            image: imageUrl,
          } as Menu,
          categoryName
        );
      }
    },
    {
      onError: (error: Error) => {
        toast({
          title: error.message,
          variant: "error",
        });
      },
      onSuccess: (msg: string | undefined) => {
        if (msg) {
          toast({
            title: msg,
            variant: "success",
          });
          window.location.reload();
        }
      },
    }
  );
  const { mutate: update, isLoading: updateLoading } = useMutation(
    async (data: any) => {

      if (chosenMenu) {
        const defaultPhoto = chosenMenu?.image;
        let imageUrl: string = defaultPhoto;
        if (data.image.name) {
          console.log(user);
          const ext = data.image.name.split(".")[1];
          const fileName = `vendors/${(user as Vendor).campusName}/${
            (user as Vendor).name
          }/${data.name}.${ext}`;
  
          imageUrl = (await uploadPhoto(data.image, fileName)) as string;
          console.log(imageUrl);
        }

        const updatedData: Menu = {
          name: data.name,
          description: data.description,
          price: data.price,
          uid: chosenMenu?.uid,
          image: imageUrl,
          quantity:0,
          notes:''
        };
        if (user) {
          return await updateMenu(
            (user as Vendor).campusName,
            (user as Vendor).id,
            updatedData,
            categoryName
          );
        }
      }
    },
    {
      onError: (error: Error) => {
        toast({
          title: error.message,
          variant: "error",
        });
      },
      onSuccess: (msg: string | undefined) => {
        if (msg) {
          toast({
            title: msg,
            variant: "success",
          });
          window.location.reload();
        }
      },
    }
  );
  const { mutate: deleteData, isLoading: deleteLoading } = useMutation(
    async () => {
      if (chosenMenu) {
        if (user) {
          return await deleteMenu(
            (user as Vendor).campusName,
            (user as Vendor).id,
            chosenMenu,
            categoryName
          );
        }
      }
    },
    {
      onError: (error: Error) => {
        toast({
          title: error.message,
          variant: "error",
        });
      },
      onSuccess: (msg: string | undefined) => {
        if (msg) {
          toast({
            title: msg,
            variant: "success",
          });
          window.location.reload();
        }
      },
    }
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-1">No.</TableHead> */}
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
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
                    {/* <TableCell className="w-1">{i + 1}</TableCell> */}
                    <TableCell>
                      <img
                        src={menu.image}
                        alt={menu.image}
                        className="w-28 h-w-28 object-cover"
                      />
                    </TableCell>
                    <TableCell>{`${menu.name}`}</TableCell>
                    <TableCell>{menu.description}</TableCell>
                    <TableCell>{menu.price as ReactNode}</TableCell>

                    <TableCell className="">
                      <div className="flex flex-row gap-1">
                        <CiEdit
                          className="w-7 h-7 hover:bg-gray-100 p-1 transition-all rounded-md pointer-events-auto cursor-pointer"
                          onClick={() => {
                            setChosenMenu(menu);
                            setUpdateMenuOpen(true);
                          }}
                        />
                        <MdDeleteOutline className="w-7 h-7 text-red-500 p-1 hover:bg-gray-100 transition-all rounded-md pointer-events-auto cursor-pointer" 
                          onClick={() => {
                            setChosenMenu(menu);
                            setDeleteMenuOpen(true);
                          }}/>
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
            <Button
              variant={"outline"}
              onClick={() => {
                setInsertMenuOpen(true);
              }}
            >
              + Add Menu
            </Button>
          </TableCell>
        </TableFooter>
      </Table>
      <MenuPopup
        isLoading={insertLoading}
        onSubmit={add}
        open={insertMenuOpen}
        setOpen={setInsertMenuOpen}
        title="Add Menu"
        description="Insert new menus for your vendor. Click add when you're done."
      />
      <MenuPopup
        isLoading={updateLoading}
        onSubmit={update}
        open={updateMenuOpen}
        setOpen={setUpdateMenuOpen}
        defaultValue={chosenMenu}
        title="Update Menu"
        description="Update menus for your vendor. Click update when you're done."
      />
      <DeleteDialogAlert handleDelete={deleteData} isLoading={deleteLoading} menu={chosenMenu || null} open={deleteMenuOpen} setOpen={setDeleteMenuOpen}/>
    </>
  );
}
