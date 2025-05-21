import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";

const randomRituals = [
  {
    title: "Breathing Exercise",
    desc: "Breathe in slowly for 4 seconds, hold for 4, exhale for 4. Repeat during the timer.",
    emoji: "🧘",
  },
  {
    title: "Gratitude Pause",
    desc: "Think of 3 things you're grateful for. Smile as you count them out.",
    emoji: "😊",
  },
  {
    title: "Quick Body Scan",
    desc: "Start at your toes and notice how each part of your body feels all the way to your head.",
    emoji: "🦶",
  }
];

const PreTestRitual = () => {
  const { subjectId, classId, chapterId, setId } = useParams<{
    subjectId: string;
    classId: string;
    chapterId: string;
    setId: string;
  }>();
  const navigate = useNavigate();
  const { incrementRitual, logRitualResult } = useAppContext?.() ?? {};
  const custom = useCustomPracticeTest();
  const isCustom =
    window.location.pathname.includes("/sets/custom/preritual");

  const [timeLeft, setTimeLeft] = useState(60);
  const [ritualIdx] = useState(Math.floor(Math.random() * randomRituals.length));
  const isDone = timeLeft <= 0;

  useEffect(() => {
    if (isDone) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isDone]);
  
  const handleComplete = () => {
    incrementRitual?.();
    logRitualResult?.({ result: "completed", date: new Date() });
    toast({
      title: "Pre-ritual completed!",
      description: "Great! You're now ready to start your test in a calm state. This was logged for your progress tracking.",
    });

    if (isCustom) {
      window.location.assign(`/academics/custom/test`);
    } else {
      navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/test`);
    }
  };
  const handleSkip = () => {
    logRitualResult?.({ result: "skipped", date: new Date() });
    toast({
      title: "Ritual skipped",
      description: "Try completing next time for better focus! It was logged to your calendar.",
      variant: "destructive",
    });
    if (isCustom) {
      window.location.assign(`/academics/custom/test`);
    } else {
      navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/test`);
    }
  };
  const ritual = randomRituals[ritualIdx];
  return (
    <div className="container mx-auto max-w-md flex items-center min-h-screen">
      <Card className={`w-full p-8 my-20 bg-${isDone ? "green" : "red"}-50 transition-colors`}>
        <h1 className="text-2xl font-bold mb-2 text-center">{ritual.emoji} {ritual.title}</h1>
        <p className="mb-6 text-center text-gray-500">{ritual.desc}</p>
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl mb-2">{timeLeft}s</div>
          <span className="text-xs text-gray-400 mb-2 text-center">{isDone ? "Ritual complete!" : "Breathe slow & focus..."}</span>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSkip}>Skip</Button>
          <Button onClick={handleComplete} disabled={!isDone}>
            Start Test
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PreTestRitual;
