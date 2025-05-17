
import { ResponsiveContainer, Heatmap, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

// Simple fake data for 50 questions: lower scores = stress/anxiety
function getFakeFocusData() {
  return Array.from({length:50}, (_,i) => ({
    idx: i+1,
    focus: Math.floor(Math.random()*60+40)
  }));
}
const FOCUS_DATA = getFakeFocusData();

function getSummaryData() {
  // fake breakdown
  return [
    { topic: "Photosynthesis", focus: 42 },
    { topic: "Cell Membrane", focus: 56 },
    { topic: "Locomotion", focus: 67 }
  ];
}

export default function WellnessAnalyticsSection() {
  const summary = getSummaryData();
  return (
    <div>
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="font-bold text-lg mb-3">Focus Timeline (Heatmap)</div>
        <div className="h-32 w-full mb-5">
          {/* FAKE: Vertical bars for focus */}
          <div className="flex h-full gap-[1px]">
            {FOCUS_DATA.map((q) => (
              <div
                key={q.idx}
                title={"Q" + q.idx + " - Focus: " + q.focus}
                className="flex-1"
                style={{
                  backgroundColor: q.focus < 55 
                    ? "#ffddd7" : q.focus<65 ? "#FFF6C1" : "#DAF5D7",
                  minWidth: "3px",
                  minHeight: "100%"
                }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low Focus</span>
            <span>High Focus</span>
          </div>
        </div>
        {/* Summary */}
        <div className="mt-8">
          <div className="font-bold text-md mb-2">Wellness Insights</div>
          <div className="mb-2 text-gray-700">
            <span className="font-bold text-red-600">Highest anxiety:</span> {summary[0].topic}
          </div>
          <div className="mb-2 text-gray-700">
            <span className="font-bold text-yellow-600">Lowest focus:</span> {summary[1].topic}
          </div>
        </div>
      </Card>
      {/* You can add more detailed wellness analytics as needed */}
    </div>
  )
}
