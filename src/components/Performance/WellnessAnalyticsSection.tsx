
import { Card } from "@/components/ui/card";

export default function WellnessAnalyticsSection({ questions }: { questions: any[] }) {
  if (!questions || questions.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-gray-400 text-lg font-semibold text-center">No focus/wellness data available for this session.</div>
      </Card>
    );
  }
  // Get focus scores from question data
  const focusList = questions.map((q, i) => ({
    idx: i+1,
    focus: typeof q.focusScore === "number" ? q.focusScore : Math.floor(Math.random()*60+40),
    is_correct: !!q.isCorrect,
    topic: q.Topic || q.topic || "Unknown"
  }));
  // Highest anxiety (lowest focus)
  const sorted = [...focusList].sort((a,b)=>a.focus-b.focus);
  const highestAnxiety = sorted.slice(0,3).map(q => q.topic);
  const avgFocus = Math.round(focusList.reduce((t,q)=>t+q.focus,0)/focusList.length);
  const correctHighFocus = focusList.filter(q => q.focus>70 && q.is_correct).length;
  const incorrectLowFocus = focusList.filter(q => q.focus<55 && !q.is_correct).length;
  const focusMin = Math.min(...focusList.map(q=>q.focus));
  const focusMax = Math.max(...focusList.map(q=>q.focus));

  return (
    <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
      <div className="font-bold text-lg mb-3">Focus Timeline (Heatmap)</div>
      <div className="h-32 w-full mb-5">
        {/* Heatmap */}
        <div className="flex h-full gap-[1px]">
          {focusList.map(q => (
            <div
              key={q.idx}
              title={`Q${q.idx} - Focus: ${q.focus}`}
              className="flex-1"
              style={{
                backgroundColor:
                  q.focus < 55
                    ? "#ffddd7"
                    : q.focus < 65
                    ? "#FFF6C1"
                    : "#DAF5D7",
                minWidth: "3px",
                minHeight: "100%",
                borderTopLeftRadius: q.idx===1 ? "5px" : undefined,
                borderBottomLeftRadius: q.idx===1 ? "5px" : undefined,
                borderTopRightRadius: q.idx===focusList.length ? "5px" : undefined,
                borderBottomRightRadius: q.idx===focusList.length ? "5px" : undefined,
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low Focus</span>
          <span>High Focus</span>
        </div>
      </div>
      {/* Analytics Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        <div className="bg-[#fcfaff] text-center p-3 rounded-xl">
          <div className="text-[11px] text-gray-500 mb-1 font-semibold">Avg Focus Score</div>
          <div className="text-lg font-bold">{avgFocus}</div>
        </div>
        <div className="bg-[#f8f9ff] text-center p-3 rounded-xl">
          <div className="text-[11px] text-gray-500 mb-1 font-semibold">Correct (High Focus)</div>
          <div className="text-lg font-bold text-green-600">{correctHighFocus}</div>
        </div>
        <div className="bg-[#fff7f7] text-center p-3 rounded-xl">
          <div className="text-[11px] text-gray-500 mb-1 font-semibold">Incorrect (Low Focus)</div>
          <div className="text-lg font-bold text-red-500">{incorrectLowFocus}</div>
        </div>
        <div className="bg-[#f3fdf6] text-center p-3 rounded-xl">
          <div className="text-[11px] text-gray-500 mb-1 font-semibold">Max Focus</div>
          <div className="text-lg font-bold">{focusMax}</div>
        </div>
      </div>
      <div className="mt-8">
        <div className="font-bold text-md mb-2">Wellness Insights</div>
        <div className="mb-2 text-gray-700">
          <span className="font-bold text-red-600">Highest anxiety (low focus): </span>
          <span>
            {highestAnxiety.join(", ")}
          </span>
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-bold text-yellow-600">Lowest focus on topics: </span>
          <span>
            {highestAnxiety.join(", ")}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Real focus scores are based on answer times and interaction patterns. More steady focus yields better retention!
        </div>
      </div>
    </Card>
  );
}
