
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PreTestRitual = () => {
  const { subjectId, classId, chapterId, setId } = useParams<{
    subjectId: string;
    classId: string;
    chapterId: string;
    setId: string;
  }>();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); // 1 min ritual

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  const handleComplete = () => {
    // Here you could log a ritual completion and increment counter
    navigate(
      `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/test`
    );
  };
  const handleSkip = () => {
    // Here you could log as skipped and increment counter
    navigate(
      `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/test`
    );
  };
  return (
    <div className="container mx-auto max-w-md flex items-center min-h-screen">
      <Card className="w-full p-8 my-20">
        <h1 className="text-2xl font-bold mb-2 text-center">Pre-Test Ritual</h1>
        <p className="mb-6 text-center text-gray-500">
          Take a minute to do this simple breathing exercise before you start!
        </p>
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl mb-2">{timeLeft}s</div>
          <span className="text-xs text-gray-400 mb-2 text-center">Breathe slowly in and out...</span>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSkip}>Skip</Button>
          <Button onClick={handleComplete} disabled={timeLeft > 0}>
            Start Test
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default PreTestRitual;
