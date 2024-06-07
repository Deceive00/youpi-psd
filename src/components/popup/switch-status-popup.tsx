import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

export default function SwitchStatus({
  showDialog,
  setShowDialog,
  handleDialogResponse,
  accept,
  newStatus
}: {
  showDialog: boolean;
  setShowDialog: any;
  handleDialogResponse: any;
  accept: boolean;
  newStatus: any;
}) {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Change Status</DialogTitle>
          <DialogDescription className="text-base">
            {accept
              ? "Are you sure you want to accept this order? "
              : "Are you sure you want to update the status of this order to " + newStatus + "?"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-orange-300"
            onClick={() => setShowDialog(false)}
          >
            No
          </Button>
          <Button onClick={() => handleDialogResponse(true)}>Yes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
