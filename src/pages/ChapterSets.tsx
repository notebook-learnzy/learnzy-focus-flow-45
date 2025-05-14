
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
  const { subjectId, classId, chapterId } = useParams<{
    subjectId: string;
    classId: string;
    chapterId: string;
  }>();
  const navigate = useNavigate();

  // Mock chapter/subject names for display
  // You can wire this up to better data later as needed
  const chapterName = chapterId?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const subjectName = subjectId?.charAt(0).toUpperCase() + subjectId?.slice(1);

  return (
    <div className="container mx-auto max-w-2xl">
      <Button
        variant="ghost"
        className="mb-4 text-gray-500"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-4">{subjectName}: {chapterName}</h1>
      <p className="mb-8 text-md text-gray-500">Select a Practice Set</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {setLabels.map((set) => (
          <Card
            key={set}
            className={cn(
              "hover:shadow-md transition-shadow cursor-pointer bg-learnzy-purple/5 border-learnzy-purple/20"
            )}
            onClick={() => alert(`This would launch Set ${set} (50 questions, ${defaultSetDurations[set]} min timer) - To be implemented`)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl font-bold text-learnzy-purple">{set}</span>
                <span className="text-xs text-gray-500 font-normal">Set</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700">50 Questions</span>
                <span className="text-xs text-gray-400">Duration: {defaultSetDurations[set]} min</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterSets;
