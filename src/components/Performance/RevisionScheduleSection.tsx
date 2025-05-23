
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSM2Data } from "@/hooks/useSM2Data";
import { accuracyToQuality, formatInterval } from "@/utils/sm2Algorithm";
import { useParams } from "react-router-dom";

export default function RevisionScheduleSection() {
  const { toast } = useToast();
  const { chapterId = "the-living-world" } = useParams();
  const { getAllChapterProgress, getNextSetData } = useSM2Data();
  const [showDialog, setShowDialog] = useState<{open: boolean, setId?: string, date?: string}>({open:false});

  // Get all progress for current chapter
  const chapterProgress = getAllChapterProgress(chapterId);
  const setSequence = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Determine current status for each set
  const setStatuses = setSequence.map(setId => {
    const sm2Data = chapterProgress[setId];
    const isCompleted = !!sm2Data;
    const isAvailable = setId === 'A' || chapterProgress[setSequence[setSequence.indexOf(setId) - 1]];
    
    return {
      setId,
      isCompleted,
      isAvailable,
      sm2Data,
      nextReview: sm2Data?.nextReview,
      quality: sm2Data?.quality,
      accuracy: sm2Data?.accuracy,
      interval: sm2Data?.interval
    };
  });

  // Find next set to be unlocked
  const nextSet = setStatuses.find(s => !s.isCompleted && s.isAvailable);
  const lastCompletedSet = setStatuses.filter(s => s.isCompleted).pop();

  const handleSchedule = (setId: string, targetDate: string) => {
    setShowDialog({open:true, setId, date: targetDate});
  };

  const confirmSchedule = async (setId: string, date: string, time: string) => {
    try {
      await supabase.from("scheduled_revisions").insert({
        subject: "Botany",
        chapter_id: chapterId,
        set_id: setId,
        scheduled_date: date,
        scheduled_time: time,
        status: "scheduled"
      });
      toast({
        title: "Revision Scheduled!",
        description: `Set ${setId} scheduled for ${date} at ${time}.`,
      });
      setShowDialog({open:false});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule revision. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6 bg-white shadow rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} />
          <span>SM2 Spaced Revision Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-sm text-gray-600">
          <div className="mb-2">
            {lastCompletedSet ? (
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span>
                  Last completed: <span className="font-semibold">Set {lastCompletedSet.setId}</span> 
                  {lastCompletedSet.accuracy && (
                    <span className="ml-1">({lastCompletedSet.accuracy}% accuracy, Quality {lastCompletedSet.quality})</span>
                  )}
                </span>
              </div>
            ) : (
              <div className="text-amber-600">No sets completed yet. Start with Set A!</div>
            )}
          </div>
          {nextSet && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              <span>Next available: <span className="font-semibold">Set {nextSet.setId}</span></span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-6 grid-cols-3 gap-3">
          {setStatuses.map((set) => (
            <div 
              key={set.setId} 
              className={`border rounded-xl p-3 flex flex-col items-center text-center ${
                set.isCompleted 
                  ? "border-green-400 bg-green-50" 
                  : set.isAvailable 
                    ? "border-blue-400 bg-blue-50" 
                    : "border-gray-300 bg-gray-100"
              }`}
            >
              <div className="font-bold text-lg mb-1">Set {set.setId}</div>
              
              {set.isCompleted ? (
                <>
                  <div className="text-xs text-green-600 mb-1">Completed</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {set.accuracy}% • Q{set.quality}
                  </div>
                  {set.nextReview && (
                    <>
                      <div className="text-xs text-gray-400 mb-2">
                        Next: {set.nextReview.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-blue-600">
                        {formatInterval(set.interval || 1)}
                      </div>
                    </>
                  )}
                </>
              ) : set.isAvailable ? (
                <>
                  <div className="text-xs text-blue-600 mb-2">Available</div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleSchedule(set.setId, new Date().toISOString().split('T')[0])}
                  >
                    Schedule
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-xs text-gray-400 mb-2">Locked</div>
                  <div className="text-xs text-gray-500">Complete previous sets</div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-sm text-blue-800 mb-2">SM2 Algorithm in Action</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <div>• Higher accuracy (90%+) = Quality 5 → Longer intervals</div>
            <div>• Lower accuracy (&lt;50%) = Quality 1-2 → Shorter intervals</div>
            <div>• Each set unlocks the next when completed</div>
            <div>• Algorithm adapts to your performance automatically</div>
          </div>
        </div>

        {/* Schedule Dialog */}
        {showDialog.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
              <h3 className="font-bold text-lg mb-1">Schedule Set {showDialog.setId}</h3>
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
                <Button variant="outline" className="flex-1" onClick={() => setShowDialog({open:false})}>
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 text-white"
                  onClick={() => {
                    const date = (document.getElementById("revision-date") as HTMLInputElement)?.value;
                    const time = (document.getElementById("revision-time") as HTMLInputElement)?.value;
                    confirmSchedule(showDialog.setId!, date, time || "18:00");
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
