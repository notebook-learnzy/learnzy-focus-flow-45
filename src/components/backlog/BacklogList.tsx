
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Timer, ListCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ShivPlanDialog from "./ShivPlanDialog";

// Mock data — in real usage, provide as props
const mockBacklogs = [
  {
    id: 1,
    topic: "Biomolecules",
    status: "Backlog",
    statusColor: "#ea384c",
    daysOverdue: 3,
    weightage: "8%",
    minutes: 40,
    dueDate: "2025-05-10",
  },
  {
    id: 2,
    topic: "Cell Biology",
    status: "Due soon",
    statusColor: "#FFBD59",
    daysOverdue: 0,
    weightage: "10%",
    minutes: 30,
    dueDate: "2025-05-14",
  },
  {
    id: 3,
    topic: "Human Physiology",
    status: "On Track",
    statusColor: "#22C55E",
    daysOverdue: 0,
    weightage: "15%",
    minutes: 60,
    dueDate: "2025-05-16",
  },
];

const statusIcon = (status: string) => {
  if (status === "Backlog") return <span className="text-[#ea384c] mr-1">🔴</span>;
  if (status === "Due soon") return <span className="text-[#FFBD59] mr-1">🟡</span>;
  if (status === "On Track") return <span className="text-[#22C55E] mr-1">🟢</span>;
  return null;
};

const BacklogList = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [planDialog, setPlanDialog] = useState<{
    open: boolean;
    topic: string;
  }>({ open: false, topic: "" });

  return (
    <div className="bg-[#FFF7EB] border border-[#FFBD59]/30 rounded-2xl shadow-sm p-0 sm:p-2">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-lg font-semibold text-gray-900 flex gap-2 items-center">
          <ListCheck className="w-5 h-5 text-[#FFBD59]" /> Your Backlog List
        </div>
      </div>
      <div className="divide-y divide-[#FFBD59]/20">
        {mockBacklogs.map((item) => (
          <div key={item.id} className="flex flex-col">
            <button
              className="w-full hover:bg-[#FFE9C6]/60 transition-colors flex items-center px-4 py-4 cursor-pointer text-left"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <span className="w-7 h-7 flex items-center justify-center text-xl mr-3">{statusIcon(item.status)}</span>
              <span className="font-medium flex-1">{item.topic}</span>
              <span className={`text-xs font-semibold ${item.status === "Backlog" ? "text-[#ea384c]" : item.status === "Due soon" ? "text-[#FFBD59]" : "text-[#22C55E]"}`}>
                {item.status} {item.daysOverdue > 0 ? `· ${item.daysOverdue} days overdue` : item.status === "Due soon" ? "· due soon" : ""}
              </span>
              {expandedId === item.id ? (
                <ChevronUp className="ml-2 w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="ml-2 w-4 h-4 text-gray-400" />
              )}
            </button>
            {expandedId === item.id && (
              <div className="bg-[#FFF7EB] px-7 py-2 border-t border-[#FFBD59]/15">
                <div className="text-sm text-gray-700 mb-2">NEET Weightage: <b>{item.weightage}</b></div>
                <div className="text-sm text-gray-700 mb-2">Time Required: <b>{item.minutes} mins</b></div>
                <div className="text-sm text-gray-700 mb-2">Original Due: <b>{item.dueDate}</b></div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="rounded-full bg-[#FFBD59] text-white hover:bg-[#fbbf24] text-xs font-semibold cursor-pointer opacity-90">
                    📅 Add to Calendar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[#22C55E] text-[#22C55E] hover:bg-[#e9ffed] text-xs font-semibold cursor-pointer opacity-90"
                    onClick={() =>
                      setPlanDialog({ open: true, topic: item.topic })
                    }
                  >
                    Let Shiv Plan It
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 text-xs text-gray-500 text-center">Tap a topic for more details and quick actions.</div>
      {/* Shiv Plan Dialog Modal */}
      <ShivPlanDialog
        open={planDialog.open}
        topic={planDialog.topic}
        onClose={() => setPlanDialog({ open: false, topic: "" })}
        onAcceptPlan={() => {
          toast({
            title: "Plan Scheduled",
            description: `Shiv's plan for "${planDialog.topic}" has been added to your calendar!`
          });
        }}
      />
    </div>
  );
};
export default BacklogList;
