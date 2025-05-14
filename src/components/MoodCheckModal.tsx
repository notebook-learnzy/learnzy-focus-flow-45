
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppContext } from "@/contexts/AppContext";
import { MoodState } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

const MoodCheckModal = () => {
  const { showMoodCheck, setShowMoodCheck, setCurrentMood } = useAppContext();
  const [selectedMood, setSelectedMood] = useState<MoodState | null>(null);

  const moodOptions: { value: MoodState; label: string; emoji: string; color: string }[] = [
    { value: "calm", label: "Calm", emoji: "😌", color: "bg-blue-100 border-blue-300 hover:bg-blue-200" },
    { value: "focused", label: "Focused", emoji: "🧠", color: "bg-purple-100 border-purple-300 hover:bg-purple-200" },
    { value: "stressed", label: "Stressed", emoji: "😰", color: "bg-red-100 border-red-300 hover:bg-red-200" },
    { value: "tired", label: "Tired", emoji: "😴", color: "bg-gray-100 border-gray-300 hover:bg-gray-200" },
    { value: "energetic", label: "Energetic", emoji: "⚡", color: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200" },
  ];

  const handleMoodSelect = (mood: MoodState) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      setCurrentMood(selectedMood);
      setShowMoodCheck(false);
      // In a real app, this would also save the mood to the user's history
    }
  };

  // Auto-close after 10 minutes of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showMoodCheck) {
        setShowMoodCheck(false);
      }
    }, 10 * 60 * 1000); // 10 minutes
    
    return () => clearTimeout(timer);
  }, [showMoodCheck, setShowMoodCheck]);

  return (
    <Dialog open={showMoodCheck} onOpenChange={setShowMoodCheck}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2 py-4">
          {moodOptions.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              className={cn(
                "flex flex-col h-24 border-2",
                mood.color,
                selectedMood === mood.value ? "ring-2 ring-offset-2 ring-learnzy-purple" : ""
              )}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            className="w-full bg-learnzy-purple"
            disabled={!selectedMood}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoodCheckModal;
