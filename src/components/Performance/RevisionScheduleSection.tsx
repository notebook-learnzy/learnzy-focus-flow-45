
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
const SETS = getNextRevisionSets();

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
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          {SETS.map((set) => (
            <div className="border rounded-xl p-4 flex flex-col items-center bg-[#f8fafb]" key={set.id}>
              <div className="font-bold text-lg mb-1">Set {set.id}</div>
              <div className="text-xs text-gray-400 mb-2">Due: {set.date}</div>
              <Button className="mt-auto" size="sm" onClick={()=>handleSchedule(set.id)}>
                Schedule
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
