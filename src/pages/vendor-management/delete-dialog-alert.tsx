import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@components/ui/alert-dialog'
import { Button } from '@components/ui/button'
import LoadingCircle from '@components/ui/loading-circle';
import { Menu } from '@lib/types/vendor-types';

interface DeleteDialogAlertProps{
  open: boolean;
  setOpen: any;
  menu: Menu | null;
  handleDelete: any;
  isLoading: boolean;
}
export default function DeleteDialogAlert({ open, setOpen, menu, handleDelete, isLoading } : DeleteDialogAlertProps) {
  const changeOpen = (opened: boolean) => {
    if (!isLoading) {
      setOpen(opened);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={changeOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete {menu?.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            menu and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={'destructive'} onClick={handleDelete}>{isLoading ? <LoadingCircle/> : 'Continue'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
