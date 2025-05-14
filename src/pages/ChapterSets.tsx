
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const setLabels = ["A", "B", "C", "D", "E", "F"];
const defaultSetDurations: Record<string, number> = {
  A: 50,
  B: 50,
  C: 50,
  D: 50,
  E: 50,
  F: 50,
};

const ChapterSets = () => {
  const { subjectId, classId, chapterId } = useParams<{subjectId: string; classId: string; chapterId: string}>();
  const navigate = useNavigate();

  // Demo: Only set A unlocked, others locked
  const unlockedSets = ["A"];

  const chapterName = chapterId ? chapterId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  return (
    <div className="container mx-auto max-w-2xl">
      <Button variant="ghost" className="mb-4 text-gray-500" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} className="mr-2" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-4">{chapterName}</h1>
      <p className="mb-8 text-md text-gray-500">Select a Practice Set</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {setLabels.map((set) => {
          const unlocked = unlockedSets.includes(set);
          return (
            <Card
              key={set}
              className={cn(
                "transition-shadow cursor-pointer",
                unlocked
                  ? "hover:shadow-md bg-learnzy-purple/5 border-learnzy-purple/20"
                  : "opacity-60 bg-gray-100 border-gray-200 cursor-not-allowed"
              )}
              onClick={() =>
                unlocked &&
                navigate(
                  `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${set}/preritual`
                )
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-learnzy-purple">{set}</span>
                  <span className="text-xs text-gray-500 font-normal">Set</span>
                  {!unlocked && <Lock size={18} className="ml-2 text-gray-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">50 Questions</span>
                  <span className="text-xs text-gray-400">
                    Duration: {defaultSetDurations[set]} min
                  </span>
                  {!unlocked && (
                    <span className="text-xs text-red-500 mt-2">
                      Complete previous sets to unlock
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default ChapterSets;
