
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ShivPlanDialogProps = {
  open: boolean;
  onClose: () => void;
  topic: string;
  planText?: string;
  onAcceptPlan?: () => void;
};

const ShivPlanDialog: React.FC<ShivPlanDialogProps> = ({
  open,
  onClose,
  topic,
  planText,
  onAcceptPlan,
}) => {
  // Show a static plan for now; can later vary by topic/overdue days/type
  const staticPlan = planText ||
    `Let's fix "${topic}" together! 
1. Revise for 20 minutes using your notes this evening.
2. Tomorrow afternoon, practice 30 questions from the chapter.
3. The next day, review any weak spots Shiv finds.
By Saturday, you'll be back on track!`;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🧠 Shiv’s Plan for "{topic}"</DialogTitle>
          <DialogDescription>
            Here’s how you can clear this backlog:
          </DialogDescription>
        </DialogHeader>
        <div className="bg-orange-50 rounded-lg p-4 my-2 text-gray-700 whitespace-pre-line">
          {staticPlan}
        </div>
        <Button
          className="w-full bg-[#FFBD59] text-gray-900 hover:bg-[#ffe29d] mt-2 font-semibold"
          onClick={() => {
            if (onAcceptPlan) onAcceptPlan();
            onClose();
          }}
        >
          👍 Is this good? Schedule it!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShivPlanDialog;
