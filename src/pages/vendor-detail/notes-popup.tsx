import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export default function NotesPopup({
  open,
  onOpenChange,
  notesMenu,
  handleDialogResponseNotes,
}: {
  open: any;
  onOpenChange: any;
  notesMenu: any;
  handleDialogResponseNotes: any;
}) {
  const [newNote, setNewNote] = useState(notesMenu?.notes || "");

  useEffect(() => {
    setNewNote(notesMenu?.notes || "");
  }, [notesMenu]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notes</DialogTitle>
          <DialogDescription>
            Add notes for {notesMenu?.name}. Click add notes when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            placeholder="Notes"
            className="col-span-3 w-full"
            value={newNote}
            onChange={(e) => {
              setNewNote(e.target.value);
            }}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => handleDialogResponseNotes(true, newNote)}>
            Add Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
