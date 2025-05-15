
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, ListMinus, List, CalendarCheck, X, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockBacklogs = [
  {
    id: 1,
    topic: "Biomolecules",
    scheduled: "2025-05-10",
    daysOverdue: 1,
    urgency: "High",
    status: "Backlog",
    weightage: "8%",
    suggestion: "Reschedule for tomorrow morning. Shift Genetics to Day 7.",
  },
  {
    id: 2,
    topic: "Cell Biology",
    scheduled: "2025-05-08",
    daysOverdue: 3,
    urgency: "Critical",
    status: "Critical",
    weightage: "10%",
    suggestion: "Complete ASAP. Schedule 15 min revision.",
  },
  {
    id: 3,
    topic: "Human Physiology",
    scheduled: "2025-05-13",
    daysOverdue: 0,
    urgency: "None",
    status: "On Track",
    weightage: "15%",
    suggestion: "Stay consistent. Join the catch-up challenge!",
  },
];

const BacklogStatusBadge = ({ status }: { status: string }) => {
  let color = "bg-[#33C3F0] text-white"; // On Track (Blue default)
  if (status === "Backlog") color = "bg-[#F97316] text-white";
  else if (status === "Critical") color = "bg-[#ea384c] text-white";
  return (
    <span className={`px-2 py-0.5 text-xs rounded font-semibold ${color}`}>{status}</span>
  );
};

const ShivHint = ({
  icon,
  message,
  suggestion,
}: { icon: React.ReactNode; message: string; suggestion?: string }) => (
  <div className="flex items-center bg-gradient-to-r from-purple-100 via-orange-50 to-pink-100 border border-purple-200/50 rounded-lg p-3 gap-3 shadow mb-3">
    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#33C3F0]/20">
      {icon}
    </div>
    <div>
      <div className="font-semibold text-md">{message}</div>
      {suggestion && <div className="text-xs text-gray-500 mt-1">{suggestion}</div>}
    </div>
  </div>
);

const BacklogTable = () => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Topic</TableHead>
          <TableHead>Scheduled</TableHead>
          <TableHead>Days Overdue</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Urgency</TableHead>
          <TableHead>Weightage</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockBacklogs.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <span className="font-semibold">{item.topic}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item.scheduled}</span>
            </TableCell>
            <TableCell className={item.status !== "On Track" ? "text-orange-600 font-bold" : "text-gray-400"}>
              {item.status === "On Track" ? "-" : `${item.daysOverdue}d`}
            </TableCell>
            <TableCell>
              <BacklogStatusBadge status={item.status} />
            </TableCell>
            <TableCell>
              <span
                className={`text-xs px-2 py-0.5 rounded
                  ${item.status === "Critical" ? "bg-[#ea384c]/10 text-[#ea384c] font-bold"
                    : item.status === "Backlog" ? "bg-[#F97316]/10 text-[#F97316]" 
                    : "bg-[#33C3F0]/10 text-[#33C3F0]"}`}
              >
                {item.urgency || "-"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-xs">{item.weightage}</span>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline" className="mr-1 text-xs" disabled>
                Reschedule
              </Button>
              <Button size="sm" variant="ghost" className="text-xs text-muted-foreground" disabled>
                Mark as Done
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const ProgressSummary = () => {
  // Example progress stats
  const onTrack = mockBacklogs.filter((b) => b.status === "On Track").length;
  const backlog = mockBacklogs.filter((b) => b.status === "Backlog").length;
  const critical = mockBacklogs.filter((b) => b.status === "Critical").length;
  const total = mockBacklogs.length;
  const percentCleared = (onTrack / total) * 100;

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
      <Card className="bg-white border-[#33C3F0]/20">
        <CardHeader className="flex items-center flex-row gap-2 pb-1">
          <Check className="text-[#33C3F0] w-5 h-5" />
          <CardTitle className="text-sm font-bold">On Track</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="font-semibold text-xl text-[#33C3F0]">{onTrack}</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#F97316]/20">
        <CardHeader className="flex items-center flex-row gap-2 pb-1">
          <ListMinus className="text-[#F97316] w-5 h-5" />
          <CardTitle className="text-sm font-bold">Backlog</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="font-semibold text-xl text-[#F97316]">{backlog}</div>
        </CardContent>
      </Card>
      <Card className="bg-white border-[#ea384c]/20">
        <CardHeader className="flex items-center flex-row gap-2 pb-1">
          <X className="text-[#ea384c] w-5 h-5" />
          <CardTitle className="text-sm font-bold">Critical</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="font-semibold text-xl text-[#ea384c]">{critical}</div>
        </CardContent>
      </Card>
    </div>
  );
};

const CalendarLegend = () => (
  <div className="flex items-center gap-4 mt-3">
    <span className="flex items-center gap-1">
      <span className="inline-block w-3 h-3 rounded-full bg-[#33C3F0]"></span>
      <span className="text-xs text-gray-700">On track</span>
    </span>
    <span className="flex items-center gap-1">
      <span className="inline-block w-3 h-3 rounded-full bg-[#F97316]"></span>
      <span className="text-xs text-gray-700">Backlog</span>
    </span>
    <span className="flex items-center gap-1">
      <span className="inline-block w-3 h-3 rounded-full bg-[#ea384c]"></span>
      <span className="text-xs text-gray-700">Critical</span>
    </span>
  </div>
);

const SocialWidget = () => (
  <div className="rounded-lg bg-gradient-to-br from-purple-100 via-orange-50 to-pink-100 border border-purple-200/50 p-4 flex gap-2 items-center shadow hover:scale-105 transition-transform">
    <Users className="w-6 h-6 text-[#33C3F0]" />
    <div>
      <span className="font-semibold text-sm text-gray-800">You're 2 days behind class average</span>
      <div className="text-xs text-gray-600">80% of your peers cleared Human Physiology. Catch up in the Biochemistry Marathon!</div>
    </div>
  </div>
);

const Backlog = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-1 sm:px-4 pt-4 pb-28 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-0">Backlog Tracker</h1>
          <div className="text-gray-500 text-sm">
            Stay on top of your NEET journey. Track missed topics and get Shiv's help to stay on track.
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
          <Button size="sm" variant="outline" disabled>
            Switch Plan (6/12 months)
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <ProgressSummary />

      {/* Shiv Suggestions */}
      <ShivHint
        icon={<AlertTriangle className="text-[#F97316] w-6 h-6" />}
        message="You missed Biomolecules yesterday."
        suggestion="Shiv: Reschedule it today at 4 PM and shift Genetics to Day 7."
      />
      <ShivHint
        icon={<CalendarCheck className="text-[#33C3F0] w-6 h-6" />}
        message="High-weightage backlog detected!"
        suggestion="Complete Human Physiology soon (15% of NEET questions come from it)."
      />

      {/* Table/List */}
      <div className="my-5">
        <BacklogTable />
      </div>

      {/* Calendar preview (static for now) */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <List className="w-5 h-5 text-[#33C3F0]" />
            Backlog Calendar Preview
            <span className="ml-2 text-xs text-muted-foreground font-normal">(Drag &amp; Drop coming soon!)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <div className="bg-[#33C3F0]/30 text-[#33C3F0] px-3 py-1 rounded text-xs font-semibold">
              May 10: Biomolecules <span className="ml-2">Backlog</span>
            </div>
            <div className="bg-[#ea384c]/30 text-[#ea384c] px-3 py-1 rounded text-xs font-semibold">
              May 8: Cell Biology <span className="ml-2">Critical</span>
            </div>
            <div className="bg-[#33C3F0]/30 text-[#33C3F0] px-3 py-1 rounded text-xs font-semibold">
              May 13: Human Physiology <span className="ml-2">On Track</span>
            </div>
          </div>
          <CalendarLegend />
        </CardContent>
      </Card>

      {/* Social Widget */}
      <div className="mt-2 mb-4">
        <SocialWidget />
      </div>
    </div>
  );
};
export default Backlog;
