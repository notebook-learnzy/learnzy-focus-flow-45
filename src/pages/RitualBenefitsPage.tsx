
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ritualBenefits: Record<string, { title: string; benefit: string; emoji: string }> = {
  breath: {
    title: "Breathing Exercise Completed",
    benefit: "This activates your parasympathetic nervous system and helps reduce test anxiety.",
    emoji: "🧘",
  },
  gratitude: {
    title: "Gratitude Pause Completed",
    benefit: "Practicing gratitude lifts your mood and sets a positive mental tone for the test.",
    emoji: "😊",
  },
  bodyscan: {
    title: "Body Scan Completed",
    benefit: "Body scans help you gain awareness and control of your stress signals.",
    emoji: "🦶",
  },
};

const RitualBenefitsPage = () => {
  const { subjectId, classId, chapterId, setId, ritualType } = useParams();
  const navigate = useNavigate();

  const details = ritualBenefits[ritualType || "breath"];

  return (
    <div className="container mx-auto max-w-md flex items-center min-h-screen">
      <Card className="w-full p-8 my-20 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">{details.emoji} {details.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-md text-gray-700 mb-6">{details.benefit}</div>
          <Button
            className="bg-[#FFBD59] px-8"
            onClick={() => navigate(
              `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/test`
            )}
          >
            Start Test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RitualBenefitsPage;
