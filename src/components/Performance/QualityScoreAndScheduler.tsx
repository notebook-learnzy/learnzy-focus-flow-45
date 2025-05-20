
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Placeholder types for brevity
interface Props {
  chapterId?: string;
  setId?: string;
}

// Mocked quality score calculation (real logic should use actual performance data)
const computeQualityScore = (accuracy: number, diffSpread: {Easy: number, Medium: number, Hard: number}, bloom: Record<string, number>) => {
  // Simple weighted score, real formula can be enhanced further
  const difficultyBonus = (diffSpread.Easy + diffSpread.Medium*1.5 + diffSpread.Hard*2);
  const bloomBonus = Object.values(bloom).reduce((a, b) => a+b, 0) / 6; // average
  return Math.round((accuracy * 0.6) + (difficultyBonus * 0.2) + (bloomBonus * 0.2));
}

const QualityScoreAndScheduler = ({ chapterId, setId }: Props) => {
  if (chapterId !== "the-living-world") {
    return (
      <Card className="p-8 my-6 bg-white shadow rounded-3xl">
        <CardHeader>
          <CardTitle>Revision Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">
            This feature will be available soon for this chapter!
          </div>
        </CardContent>
      </Card>
    );
  }
  // Example stats, would normally be fetched/synthesized per set/user
  const accuracy = 84;
  const diffSpread = { Easy: 12, Medium: 32, Hard: 6 };
  const bloom = { Remember: 20, Understand: 13, Apply: 8, Analyze: 3, Evaluate: 2, Create: 1 };
  const qualityScore = computeQualityScore(accuracy, diffSpread, bloom);

  // Basic SM2: recommend next review date based on score
  let daysToNextRevision = 2;
  if (qualityScore > 90) daysToNextRevision = 7;
  else if (qualityScore > 75) daysToNextRevision = 4;
  else if (qualityScore > 50) daysToNextRevision = 2;
  else daysToNextRevision = 1;

  const [scheduled, setScheduled] = useState(false);

  return (
    <Card className="p-8 my-6 bg-white shadow rounded-3xl">
      <CardHeader>
        <CardTitle>Revision & Scheduling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="font-bold text-lg mb-1">Quality Score: <span className="text-[#7356FF]">{qualityScore}</span>/100</div>
          <div className="text-gray-500 mb-2">
            Quality Score is based on your accuracy, question difficulty, and cognitive skills.
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-400 mb-4">
            <div><b>Accuracy:</b> {accuracy}% </div>
            <div><b>Difficulty Spread:</b> {diffSpread.Easy} Easy, {diffSpread.Medium} Medium, {diffSpread.Hard} Hard </div>
            <div><b>Bloom's:</b> {Object.entries(bloom).map(([k,v])=>`${k}: ${v}`).join(", ")} </div>
          </div>
        </div>
        {!scheduled ? (
          <div className="flex flex-col gap-4 pt-2 pb-3">
            <div>
              <b>Recommended Next Revision:</b> <span className="text-[#FFBD59]">{daysToNextRevision} days</span> from today.
            </div>
            <Button className="bg-[#FFBD59] mt-2" onClick={() => setScheduled(true)}>
              Schedule Next Revision
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-2 pb-3">
            <div className="text-green-600 font-semibold">
              Next revision scheduled in {daysToNextRevision} days! <span className="ml-2">📆</span>
            </div>
            <Button variant="outline" onClick={() => setScheduled(false)}>
              Update Scheduling
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default QualityScoreAndScheduler;
