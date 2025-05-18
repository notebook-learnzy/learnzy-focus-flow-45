
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, ReferenceLine } from "recharts";
import { HeartPulse, Smile, AlertCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

// Fix 1: Add getRandom helper
function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Simulate per-question data
const FOCUS_MOMENTS = [
  "calm", "focused", "stressed", "relaxed", "tired", "energized", "anxious", "neutral"
] as const;

const SAMPLE_TOPICS = [
  { topic: "Botanical Nomenclature", subtopic: "ICBN Rules" },
  { topic: "Plant Kingdom", subtopic: "Bryophyta" },
  { topic: "Living World", subtopic: "Characteristics" },
  { topic: "Biomolecules", subtopic: "Proteins" },
  { topic: "Cell Theory", subtopic: "Schleiden & Schwann" },
  { topic: "Cell Organelles", subtopic: "Mitochondria" },
];

function getRandomTopicSubtopic() {
  return SAMPLE_TOPICS[getRandom(0, SAMPLE_TOPICS.length - 1)];
}

// Fix 2: All math is on numbers, not on possibly undefined/unknown
function generateWellnessData(qCount = 50) {
  let wellness = [];
  for (let i = 1; i <= qCount; i++) {
    const hrv = getRandom(62, 105);
    const focus = Math.round(hrv * 0.85 + getRandom(-10, 8));
    const ts = getRandomTopicSubtopic();
    wellness.push({
      q_no: i,
      focus,
      hrv,
      state:
        focus > 80
          ? "focused"
          : focus < 55
          ? "anxious"
          : FOCUS_MOMENTS[getRandom(0, FOCUS_MOMENTS.length - 1)],
      correct: getRandom(0, 1) === 1,
      topic: ts.topic,
      subtopic: ts.subtopic,
    });
  }
  return wellness;
}

const WELLNESS = generateWellnessData(50);

// dip analysis
const focusDips = WELLNESS.filter((q) => typeof q.focus === "number" && q.focus < 60);
const dipTopicMap: Record<string, number> = {};
focusDips.forEach((q) => {
  const key = `${q.topic} >> ${q.subtopic}`;
  dipTopicMap[key] = (dipTopicMap[key] || 0) + 1;
});
const dipRank = Object.entries(dipTopicMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);

const focusAvg =
  WELLNESS.length > 0
    ? Math.round(WELLNESS.reduce((t, q) => t + (typeof q.focus === "number" ? q.focus : 0), 0) / WELLNESS.length)
    : 0;
const hrvAvg =
  WELLNESS.length > 0
    ? Math.round(WELLNESS.reduce((t, q) => t + (typeof q.hrv === "number" ? q.hrv : 0), 0) / WELLNESS.length)
    : 0;
const focusMin = Math.min(...WELLNESS.map((q) => (typeof q.focus === "number" ? q.focus : 999)));
const focusMax = Math.max(...WELLNESS.map((q) => (typeof q.focus === "number" ? q.focus : 0)));
const lowestMoments = WELLNESS.slice().sort((a, b) => (a.focus as number) - (b.focus as number)).slice(0, 3);
const highestMoments = WELLNESS.slice().sort((a, b) => (b.focus as number) - (a.focus as number)).slice(0, 3);

const FOCUS_COLOR = "#8884d8";
const HRV_COLOR = "#4ade80";

const STATE_TO_EMOJI: Record<string, React.ReactNode> = {
  calm: <Smile className="text-cyan-400 inline-block" size={18} />,
  focused: <Smile className="text-blue-500 inline-block" size={18} />,
  stressed: <AlertCircle className="text-red-400 inline-block" size={18} />,
  relaxed: <Smile className="text-green-400 inline-block" size={18} />,
  tired: <HeartPulse className="text-amber-500 inline-block" size={18} />,
  energized: <Smile className="text-yellow-500 inline-block" size={18} />,
  anxious: <AlertCircle className="text-orange-500 inline-block" size={18} />,
  neutral: <Smile className="text-gray-400 inline-block" size={18} />,
};

const WellnessPerformanceSection: React.FC = () => {
  return (
    <div>
      {/* Top-level insight for focus dips by topic/subtopic */}
      {focusDips.length > 0 && (
        <div className="mb-5">
          <div className="text-base font-semibold text-rose-600 flex items-center gap-2">
            🌧️ Focus Dips Detected!
          </div>
          <div className="text-[15px] text-gray-700 mt-1 mb-1">
            Your lowest focus moments often occurred in these topics:
          </div>
          <ul className="list-disc pl-6 text-[15px]">
            {dipRank.length === 0 ? (
              <li className="text-gray-500">No major focus dips detected!</li>
            ) : (
              dipRank.map(([k, count], idx) => (
                <li key={k} className="text-rose-700 font-semibold">
                  {k} <span className="text-gray-600 font-normal">({count} dip{count > 1 ? "s" : ""})</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Smart summary header */}
      <div className="mb-6 grid md:grid-cols-3 gap-3">
        <Card className="flex-1 bg-[#FFFDFA] border-0 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <HeartPulse className="text-pink-500" size={22} />
              <CardTitle className="text-lg font-semibold">Your Focus Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-[15px] mb-2 font-medium">
              Average focus: <span className="font-bold text-blue-700">{focusAvg}/100</span>,
              HRV: <span className="font-bold text-green-700">{hrvAvg} ms</span>
            </div>
            <div className="flex gap-2 text-xs mb-1">
              <span className="bg-green-50 px-2 py-1 rounded text-green-800 font-semibold">Peak: {focusMax}</span>
              <span className="bg-orange-50 px-2 py-1 rounded text-orange-800 font-semibold">Lowest: {focusMin}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {focusAvg > 80
                ? "Fantastic focus! Maintain gentle breathing and keep using rituals before study."
                : focusAvg > 65
                ? "Good focus, but notice dips. Short breaks and deep breaths can help prolong high focus."
                : "You had a few stressed moments. Try more frequent short rituals or calming breaks between studies."
              }
            </div>
          </CardContent>
        </Card>
        {/* Moment highlight */}
        <Card className="flex-1 bg-[#FFF7EB] border-0 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Award className="text-amber-400" size={21} />
              <CardTitle className="text-base font-semibold">Top Wellness Moments</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="ml-2 list-disc text-[15px] space-y-0.5 pl-2">
              {highestMoments.map((m, i) => (
                <li key={i}>
                  <span className="font-medium text-green-800">
                    Q{m.q_no} - {STATE_TO_EMOJI[m.state as keyof typeof STATE_TO_EMOJI]} {m.state.charAt(0).toUpperCase() + m.state.slice(1)}</span>{" "}
                    at focus {m.focus}
                </li>
              ))}
            </ul>
            <div className="mt-2 text-xs text-gray-500">
              These were your best moments of calm and attention!
            </div>
          </CardContent>
        </Card>
        {/* Actionable insights */}
        <Card className="flex-1 bg-[#F2FCE2] border-0 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-orange-400" size={21} />
              <CardTitle className="text-base font-semibold">Focus Opportunities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="ml-2 list-disc text-[15px] space-y-0.5 pl-2">
              {lowestMoments.map((m, i) => (
                <li key={i}>
                  <span className="font-medium text-orange-800">
                    Q{m.q_no} - {STATE_TO_EMOJI[m.state as keyof typeof STATE_TO_EMOJI]} {m.state.charAt(0).toUpperCase() + m.state.slice(1)}</span>{" "}
                    at focus {m.focus}
                </li>
              ))}
            </ul>
            <div className="mt-2 text-xs text-gray-500">
              Brief loss of focus around these—try a quick stretch or breath if you spot this next time.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Focus & HRV over time chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HeartPulse className="text-pink-500" size={22} />
            Focus &amp; HRV Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={WELLNESS}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="q_no" tickFormatter={(tick) => "Q" + tick} />
              <YAxis yAxisId="focus" domain={[0, 100]} tickCount={6} axisLine={false} />
              <YAxis yAxisId="hrv" orientation="right" domain={[55, 110]} hide />
              <RechartsTooltip
                formatter={(value: any, key: string) => {
                  if (key === "focus") return [`${value}`, "Focus Score"];
                  if (key === "hrv") return [`${value}ms`, "HRV"];
                  return [value, key];
                }}
                labelFormatter={(label) => `Question ${label}`}
              />
              <Legend />
              <ReferenceLine y={focusAvg} yAxisId="focus" label="Avg Focus" stroke="#9b87f5" strokeDasharray="3 3"/>
              <Line yAxisId="focus" type="monotone" dataKey="focus" stroke={FOCUS_COLOR} strokeWidth={2} activeDot={{ r: 7 }} name="Focus"/>
              <Line yAxisId="hrv" type="monotone" dataKey="hrv" stroke={HRV_COLOR} strokeDasharray="5 2" name="HRV"/>
            </LineChart>
          </ResponsiveContainer>
          <div className="text-xs mt-2 text-gray-500">
            <span className="inline-flex items-center gap-1 mr-6"><span className="h-2 w-3 bg-[#8884d8] inline-block rounded"></span> Focus</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-3 bg-[#4ade80] inline-block rounded"></span> HRV</span>
          </div>
        </CardContent>
      </Card>

      {/* Actionable insight table with new Topic/Subtopic columns and focus dip highlight */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex gap-2 items-center">Per-Question Wellness Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="min-w-[750px] w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Q#</th>
                  <th className="text-left py-2 px-2">Focus Score</th>
                  <th className="text-left py-2 px-2">HRV</th>
                  <th className="text-left py-2 px-2">Feeling</th>
                  <th className="text-left py-2 px-2">Topic</th>
                  <th className="text-left py-2 px-2">Subtopic</th>
                  <th className="text-left py-2 px-2">Correct?</th>
                </tr>
              </thead>
              <tbody>
                {WELLNESS.map((row) => (
                  <tr
                    key={row.q_no}
                    className={
                      "border-b " +
                      (row.focus < 60
                        ? "bg-rose-50"
                        : row.focus >= 80
                        ? "bg-green-50"
                        : "")
                    }
                  >
                    <td className="py-2 px-2 font-mono font-bold">Q{row.q_no}</td>
                    <td className={
                      "py-2 px-2 font-semibold " +
                      (row.focus < 60
                        ? "text-rose-600 animate-pulse font-extrabold"
                        : row.focus >= 80
                        ? "text-green-600"
                        : "text-blue-800")
                    }>
                      {row.focus}
                      {row.focus < 60 && (
                        <span className="block text-xs text-rose-700 mt-1 font-normal">Focus Dip!</span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-blue-700 font-medium">{row.hrv} ms</td>
                    <td className="py-2 px-2">
                      {STATE_TO_EMOJI[row.state as keyof typeof STATE_TO_EMOJI]} <span className="ml-1 capitalize">{row.state}</span>
                    </td>
                    <td className={"py-2 px-2 " + (row.focus < 60 ? "font-bold text-rose-700" : "")}>{row.topic}</td>
                    <td className={"py-2 px-2 " + (row.focus < 60 ? "font-bold text-rose-700" : "")}>{row.subtopic}</td>
                    <td className="py-2 px-2">
                      {row.correct
                        ? <Badge className="bg-green-100 text-green-800">✔️</Badge>
                        : <Badge className="bg-orange-100 text-orange-700">❌</Badge>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessPerformanceSection;
