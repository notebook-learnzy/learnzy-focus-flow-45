
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ritualDetails: Record<string, { title: string; desc: string; emoji: string; time: number }> = {
  breath: {
    title: "Breathing Exercise",
    desc: "Breathe slowly for 4 in, hold 4, exhale 4. Repeat until time runs out.",
    emoji: "🧘",
    time: 45,
  },
  gratitude: {
    title: "Gratitude Pause",
    desc: "Think of 3 things you’re grateful for. Smile as you count them out.",
    emoji: "😊",
    time: 30,
  },
  bodyscan: {
    title: "Body Scan",
    desc: "Notice how each part of your body feels. Move from toes to head.",
    emoji: "🦶",
    time: 40,
  },
};

function getValidRitualType(ritualType?: string): string {
  if (ritualType && ritualDetails[ritualType]) {
    return ritualType;
  }
  return "breath";
}

const RitualExperiencePage = () => {
  const { subjectId, classId, chapterId, setId, ritualType } = useParams();
  const validRitualType = getValidRitualType(ritualType);
  const ritual = ritualDetails[validRitualType];
  const [timeLeft, setTimeLeft] = useState(() => ritual.time);
  const isDone = timeLeft <= 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (isDone) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isDone]);

  const handleContinue = () => {
    navigate(
      `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/prep/${validRitualType}/benefits`
    );
  };

  return (
    <div className="container mx-auto max-w-md flex items-center min-h-screen">
      <Card className="w-full p-8 my-20 bg-[#FEF9F1]">
        <h1 className="text-2xl font-bold mb-2 text-center">{ritual.emoji} {ritual.title}</h1>
        <p className="mb-6 text-center text-gray-600">{ritual.desc}</p>
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl mb-2">{timeLeft}s</div>
          <span className="text-xs text-gray-400 mb-2 text-center">{isDone ? "Done!" : "Begin now..."}</span>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleContinue} disabled={!isDone}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RitualExperiencePage;

