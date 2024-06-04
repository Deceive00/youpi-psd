import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

export default function SwitchVendor({
  showDialog,
  setShowDialog,
  handleDialogResponse,
}: {
  showDialog: boolean;
  setShowDialog: any;
  handleDialogResponse: any;
}) {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Vendor</DialogTitle>
          <DialogDescription>
            You have items from another vendor in your cart. Do you want to
            replace them with items from this vendor?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-orange-300"
            onClick={() => handleDialogResponse(false)}
          >
            No
          </Button>
          <Button onClick={() => handleDialogResponse(true)}>Yes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
