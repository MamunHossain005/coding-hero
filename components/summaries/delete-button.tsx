"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummaryAction } from "@/actions/summary-action";
import { toast } from "sonner";

interface IDeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: IDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId });

      if (!result.success) {
        toast.error("Error", {
          description: "Failed to delete summary",
        });
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Delete Summary</DialogTitle>
          <DialogDescription className="text-left">
            Are you sure you want to delete this summary? This action can't be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2 justify-end items-center">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="px-10 bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              size={"icon"}
              className="px-10 bg-gray-900 hover:bg-gray-600"
              onClick={handleDelete}
            >
              { isPending ? 'Deleting...': 'Delete'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
