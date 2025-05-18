import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const setLabels = ["A", "B", "C", "D", "E", "F"];
const defaultSetDurations: Record<string, number> = {
  A: 25, // Update Set A to 25 min
  B: 50,
  C: 50,
  D: 50,
  E: 50,
  F: 50,
};

const ChapterSets = () => {
  const { subjectId, classId, chapterId } = useParams<{subjectId: string; classId: string; chapterId: string}>();
  const navigate = useNavigate();

  // Provide both "Cell: The Unit of Life" and "The Living World"
  const isBotany11 = subjectId === "botany" && classId === "11";
  const chapters = isBotany11
    ? [
        { id: "cell-bio", name: "Cell: The Unit of Life" },
        { id: "the-living-world", name: "The Living World" },
      ]
    : chapterId
    ? [{ id: chapterId, name: chapterId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }]
    : [];

  // Show sets cards for the specific chapter
  return (
    <div className="container mx-auto max-w-2xl pb-20 pt-2 px-3">
      <Button variant="ghost" className="mb-2 sm:mb-4 text-gray-500" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} className="mr-2" /> Back
      </Button>
      {chapters.map(chap => (
        <div key={chap.id}>
          <h1 className="text-2xl font-bold mb-2 sm:mb-4">{chap.name}</h1>
          <p className="mb-3 sm:mb-8 text-sm sm:text-md text-gray-500">Select a Practice Set</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            {setLabels.map((set) => {
              const unlocked = set === "A"; // Only unlock Set A for demo
              // Special: For Set A in The Living World, force 25 min/50 q, otherwise fallback defaults
              const showLivingWorldA = isBotany11 && chap.id === "the-living-world" && set === "A";
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
                    navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chap.id}/sets/${set}/prep`)
                  }
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl font-bold text-learnzy-purple">{set}</span>
                      <span className="text-xs text-gray-500 font-normal">Set</span>
                      {!unlocked && <Lock size={16} className="ml-2 text-gray-400" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm text-gray-700">
                        {showLivingWorldA ? "50 Questions" : "50 Questions"}
                      </span>
                      <span className="text-xs text-gray-400">
                        Duration: {showLivingWorldA ? 25 : defaultSetDurations[set]} min
                      </span>
                      {!unlocked && (
                        <span className="text-xs text-red-500 mt-1 sm:mt-2">
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
      ))}
    </div>
  );
};
export default ChapterSets;
