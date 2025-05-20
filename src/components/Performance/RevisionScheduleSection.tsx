import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Simple SM2 demo: next 5 sets spaced by 2, 4, 7, 15, 30 days from today; replace with real algo as you like!
function getNextRevisionSets() {
  const today = new Date();
  return [
    { id: "A", day: 2 },
    { id: "B", day: 4 },
    { id: "C", day: 7 },
    { id: "D", day: 15 },
    { id: "E", day: 30 }
  ].map((s) => ({
    ...s,
    date: new Date(today.getTime() + s.day * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
  }));
}

// Simulate last review for Set A as today, rest in the future
function getFakeSetState() {
  const today = new Date();
  return [
    { id: "A", day: 0, reviewed: true },
    { id: "B", day: 4, reviewed: false },
    { id: "C", day: 7, reviewed: false },
    { id: "D", day: 15, reviewed: false },
    { id: "E", day: 30, reviewed: false }
  ].map((s) => ({
    ...s,
    date: new Date(today.getTime() + s.day * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
  }));
}
const SETS = getFakeSetState();

export default function RevisionScheduleSection() {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState<{open: boolean, setId?: string, date?: string}>({open:false});

  const handleSchedule = (id: string, targetDate: string) => {
    setShowDialog({open:true, setId: id, date: targetDate});
  };

  const confirmSchedule = async (setId: string, date: string, time: string) => {
    // Push to Supabase scheduled_revisions (assume subject & chapter are "Botany" & "the-living-world" as demo)
    await supabase.from("scheduled_revisions").insert({
      subject: "Botany", // You may want to make dynamic
      chapter_id: "the-living-world",
      set_id: setId,
      scheduled_date: date,
      scheduled_time: time,
      status: "scheduled"
    });
    toast({
      title: "Revision Scheduled!",
      description: `Revision Set ${setId} scheduled for ${date} at ${time}.`,
    });
    setShowDialog({open:false});
  };

  return (
    <Card className="p-6 bg-white shadow rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} />
          <span>Recommended Revision Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-gray-600">
          {SETS[0].reviewed 
            ? <div><span className="font-semibold">Set A</span> was last reviewed <span className="text-green-600">today</span>.</div> 
            : <div>Set A is awaiting review.</div>}
          <div>
            Based on your last session performance, Schulte’s SM2 algorithm recommends these next revision dates.
          </div>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          {SETS.map((set) => (
            <div className={`border rounded-xl p-4 flex flex-col items-center bg-[#f8fafb] ${set.reviewed ? "border-green-400" : ""}`} key={set.id}>
              <div className="font-bold text-lg mb-1">Set {set.id}</div>
              <div className="text-xs text-gray-400 mb-2">{set.reviewed ? "Reviewed Today" : `Due: ${set.date}`}</div>
              <Button
                className={`mt-auto ${set.reviewed ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed" : ""}`}
                size="sm"
                onClick={()=>!set.reviewed && handleSchedule(set.id, new Date(new Date().getTime() + Number(set.day)*24*60*60*1000).toISOString().split('T')[0])}
                disabled={set.reviewed}
              >
                {set.reviewed ? "Scheduled" : "Schedule"}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Sticking to this revision plan boosts retention, reduces stress, and makes you NEET-ready!
        </div>

        {/* Schedule Dialog */}
        {showDialog.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
              <h3 className="font-bold text-lg mb-1">Schedule Revision Set {showDialog.setId}</h3>
              <label className="block text-sm mt-2 mb-1">Date</label>
              <input
                type="date"
                defaultValue={showDialog.date}
                className="border rounded px-2 py-1 w-full mb-2"
                id="revision-date"
              />
              <label className="block text-sm mt-2 mb-1">Time</label>
              <input
                type="time"
                defaultValue="18:00"
                className="border rounded px-2 py-1 w-full mb-3"
                id="revision-time"
              />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={()=>setShowDialog({open:false})}>Cancel</Button>
                <Button className="flex-1 bg-learnzy-purple text-white"
                  onClick={()=>{
                    const date = (document.getElementById("revision-date") as HTMLInputElement)?.value;
                    const time = (document.getElementById("revision-time") as HTMLInputElement)?.value;
                    confirmSchedule(showDialog.setId!, date, time || "18:00");
                  }}
                >Confirm</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
