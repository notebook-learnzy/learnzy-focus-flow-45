import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

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
  const handleSchedule = (id: string) => {
    toast({
      title: "Added to calendar!",
      description: `Revision Set ${id} scheduled.`,
    });
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
                onClick={()=>!set.reviewed && handleSchedule(set.id)}
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
      </CardContent>
    </Card>
  );
}
