
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const rituals = [
  {
    type: "breath",
    title: "Breathing Exercise",
    desc: "Calm your mind with gentle breathing before your test.",
    emoji: "🧘",
  },
  {
    type: "gratitude",
    title: "Gratitude Pause",
    desc: "Boost positivity by thinking of 3 things you’re grateful for.",
    emoji: "😊",
  },
  {
    type: "bodyscan",
    title: "Body Scan",
    desc: "Notice your body's sensations for a mindful reset.",
    emoji: "🦶",
  },
];

const RitualSelectionPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();

  const goToRitual = (ritualType: string) => {
    navigate(
      `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/prep/${ritualType}`
    );
  };

  return (
    <div className="container mx-auto max-w-lg flex items-center min-h-screen">
      <Card className="w-full p-8 my-20">
        <CardHeader>
          <CardTitle className="text-2xl text-center mb-1">Choose Your Pre-Test Ritual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {rituals.map((ritual) => (
              <div
                key={ritual.type}
                className="flex items-center border rounded-xl px-4 py-3 hover:bg-[#FEF9F1] cursor-pointer gap-4 transition"
                onClick={() => goToRitual(ritual.type)}
                tabIndex={0}
                onKeyDown={e => { if(e.key === "Enter" || e.key === " ") goToRitual(ritual.type); }}
              >
                <span className="text-3xl">{ritual.emoji}</span>
                <div>
                  <div className="font-semibold text-lg">{ritual.title}</div>
                  <div className="text-sm text-gray-500">{ritual.desc}</div>
                </div>
                <Button className="ml-auto" size="sm" variant="ghost">
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RitualSelectionPage;
