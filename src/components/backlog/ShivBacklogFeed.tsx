
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Timer } from "lucide-react";

// Example mock Shiv suggestion (would be dynamic later)
const suggestion = {
  topic: "Biomolecules",
  daysOverdue: 3,
  recommendedSlot: "Tomorrow evening",
  note: "This topic is high-yield—try to finish before the weekend!",
};

const ShivBacklogFeed = ({
  onAccept,
  onReschedule,
  onSkip,
}: {
  onAccept?: () => void;
  onReschedule?: () => void;
  onSkip?: () => void;
}) => {
  return (
    <div className="rounded-2xl mb-6 bg-[#FFFDFA] border border-[#FFBD59]/20 shadow-sm px-5 py-6 flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <div className="bg-[#FFBD59] rounded-full w-11 h-11 flex items-center justify-center text-3xl select-none" aria-label="Shiv">
          🧠
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-900 mb-1">
            ⚠️ You’re behind on <b>{suggestion.topic}</b> — missed <b>{suggestion.daysOverdue} days ago</b>.
          </div>
          <div className="text-gray-600 text-sm">
            Want to do it <b>{suggestion.recommendedSlot}</b>?<br />
            <span className="text-[#ea384c]">{suggestion.note}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" className="rounded-full bg-[#22C55E] text-white hover:bg-[#16a34a]" onClick={onAccept}>
          ✔️ Accept Suggestion
        </Button>
        <Button size="sm" variant="outline" className="rounded-full border-[#FFBD59] text-[#FFBD59] hover:bg-[#FFF7EB]" onClick={onReschedule}>
          <Timer className="w-4 h-4 mr-1" /> Reschedule
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full text-gray-400 hover:text-gray-800" onClick={onSkip}>
          ❌ Skip for now
        </Button>
      </div>
    </div>
  );
};

export default ShivBacklogFeed;
