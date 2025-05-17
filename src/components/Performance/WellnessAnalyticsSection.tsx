
import { Card } from "@/components/ui/card";

// Fake data: focus per question, 1-50, focus 40-100, is_correct random
function getFakeFocusData() {
  return Array.from({length:50}, (_,i) => ({
    idx: i+1,
    focus: Math.floor(Math.random()*60+40),
    is_correct: Math.random() > 0.24, // 76% correct rate
    topic: ["Photosynthesis", "Cell Membrane", "Locomotion", "DNA", "Respiration", "Osmosis", "Diffusion", "Enzyme Action", "Transpiration", "Homeostasis"][i%10]
  }));
}
const FOCUS_DATA = getFakeFocusData();

function getSummaryData(focusData: typeof FOCUS_DATA) {
  // Find lowest focus questions and topics
  const sorted = [...focusData].sort((a,b)=>a.focus-b.focus);
  return {
    highestAnxiety: sorted.slice(0,3).map(q => q.topic),
    lowestFocus: sorted.slice(0,3).map(q => q.topic),
    avgFocus: Math.round(focusData.reduce((t,q)=>t+q.focus,0)/focusData.length),
    correctHighFocus: focusData.filter(q => q.focus>70 && q.is_correct).length,
    incorrectLowFocus: focusData.filter(q => q.focus<55 && !q.is_correct).length
  };
}

export default function WellnessAnalyticsSection() {
  const summary = getSummaryData(FOCUS_DATA);

  return (
    <div>
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="font-bold text-lg mb-3">Focus Timeline (Heatmap)</div>
        <div className="h-32 w-full mb-5">
          {/* Heatmap - colored bars for focus */}
          <div className="flex h-full gap-[1px]">
            {FOCUS_DATA.map((q) => (
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
                  borderTopRightRadius: q.idx===FOCUS_DATA.length ? "5px" : undefined,
                  borderBottomRightRadius: q.idx===FOCUS_DATA.length ? "5px" : undefined,
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
            <div className="text-lg font-bold">{summary.avgFocus}</div>
          </div>
          <div className="bg-[#f8f9ff] text-center p-3 rounded-xl">
            <div className="text-[11px] text-gray-500 mb-1 font-semibold">Correct (High Focus)</div>
            <div className="text-lg font-bold text-green-600">{summary.correctHighFocus}</div>
          </div>
          <div className="bg-[#fff7f7] text-center p-3 rounded-xl">
            <div className="text-[11px] text-gray-500 mb-1 font-semibold">Incorrect (Low Focus)</div>
            <div className="text-lg font-bold text-red-500">{summary.incorrectLowFocus}</div>
          </div>
          <div className="bg-[#f3fdf6] text-center p-3 rounded-xl">
            <div className="text-[11px] text-gray-500 mb-1 font-semibold">Max Focus</div>
            <div className="text-lg font-bold">{Math.max(...FOCUS_DATA.map(q=>q.focus))}</div>
          </div>
        </div>
        {/* Insights Table: Show lowest focus questions */}
        <div className="mt-8">
          <div className="font-bold text-md mb-2">Wellness Insights</div>
          <div className="mb-2 text-gray-700">
            <span className="font-bold text-red-600">Highest anxiety (low focus): </span>
            <span>
              {summary.highestAnxiety.join(", ")}
            </span>
          </div>
          <div className="mb-2 text-gray-700">
            <span className="font-bold text-yellow-600">Lowest focus on topics: </span>
            <span>
              {summary.lowestFocus.join(", ")}
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Focus scores are based on answer times and interaction patterns. More steady focus yields better retention!
          </div>
        </div>
        <div className="mt-8">
          <div className="font-semibold mb-2 text-gray-700">Question-wise Focus Breakdown</div>
          <div className="overflow-x-auto">
            <table className="text-xs min-w-[420px]">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1">Q#</th>
                  <th className="px-2 py-1">Focus</th>
                  <th className="px-2 py-1">Correct?</th>
                  <th className="px-2 py-1">Topic</th>
                </tr>
              </thead>
              <tbody>
                {FOCUS_DATA.slice(0,8).map(q => (
                  <tr key={q.idx}>
                    <td className="px-2 py-1 text-center">{q.idx}</td>
                    <td className={`px-2 py-1 font-semibold ${q.focus < 55 ? "text-red-500" : q.focus < 65 ? "text-yellow-500" : "text-green-600"}`}>{q.focus}</td>
                    <td className="px-2 py-1 text-center">
                      {q.is_correct ? "✔️" : "❌"}
                    </td>
                    <td className="px-2 py-1">{q.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
