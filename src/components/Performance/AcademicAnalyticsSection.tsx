
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from "lucide-react";

function generateFakeTimeData() {
  // For demo: you can wire up real data
  return Array.from({ length: 50 }, (_, i) => ({
    name: `${i+1}`,
    yourTime: Math.floor(Math.random()*40+20),
    idealTime: 30
  }));
}
const FAKE_TIME_DATA = generateFakeTimeData();
const FAKE_AVG = Math.round(FAKE_TIME_DATA.reduce((t, q) => t+q.yourTime, 0)/FAKE_TIME_DATA.length);

export default function AcademicAnalyticsSection() {
  // Mistake pattern: demo empty state
  const mistakePatterns : {tag: string, count: number}[] = [];
  const tagBreakdown : {tag: string, accuracy: number, mastery: string}[] = [
    { tag: "Photosynthesis", accuracy: 35, mastery: "Needs Improvement" },
    { tag: "Locomotion", accuracy: 89, mastery: "Mastery" },
    { tag: "Ecosystem", accuracy: 50, mastery: "Average" },
  ];

  return (
    <div>
      {/* --- Section: Time Per Question --- */}
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-[#252733] mb-2">Time per Question</h2>
          <div className="flex gap-2">
            <button className="bg-[#F9F9FB] text-sm px-4 py-2 rounded font-medium text-gray-600 border border-gray-200">Zoom In</button>
            <button className="bg-[#F9F9FB] text-sm px-4 py-2 rounded font-medium text-gray-600 border border-gray-200">Review Questions</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={FAKE_TIME_DATA}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fontSize:12, fill:'#888'}} label={{ value: "Question Number", position: "insideBottom", offset: -5 }} />
            <YAxis tickLine={false} axisLine={false} label={{ value: "Time (seconds)", angle: -90, position: "insideLeft", offset: 18 }} domain={[0,80]} />
            <Tooltip />
            <Bar dataKey="yourTime" fill="#7356FF" />
            <Bar dataKey="idealTime" fill="#F8AE39" />
          </BarChart>
        </ResponsiveContainer>
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="py-3 rounded bg-[#FAFAFB]">
            <div className="text-gray-500 text-xs mb-0.5">Avg. Time per Question</div>
            <div className="font-bold text-lg">{FAKE_AVG}s</div>
          </div>
          <div className="py-3 rounded bg-[#FAFAFB]">
            <div className="text-gray-500 text-xs mb-0.5">Questions Slower Than Ideal</div>
            <div className="font-bold text-lg text-red-600">{FAKE_TIME_DATA.filter(d=>d.yourTime>30).length}</div>
          </div>
          <div className="py-3 rounded bg-[#FAFAFB]">
            <div className="text-gray-500 text-xs mb-0.5">Questions Faster Than Ideal</div>
            <div className="font-bold text-lg text-green-600">{FAKE_TIME_DATA.filter(d=>d.yourTime<=30).length}</div>
          </div>
        </div>
        {/* Most Significant Time Deviations */}
        <div className="mt-8">
          <div className="font-bold mb-2">Most Significant Time Deviations</div>
          {/* Show demo first slow then fast */}
          <div className="flex flex-col gap-3">
            <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <span className="font-bold">Question 12</span>: In a dihybrid cross... <span className="text-gray-400">(Preview)</span>
              </div>
              <span className="font-bold text-green-600">1m 10s faster</span>
            </div>
            <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <span className="font-bold">Question 40</span>: Light reaction... <span className="text-gray-400">(Preview)</span>
              </div>
              <span className="font-bold text-red-600">2m 0s slower</span>
            </div>
          </div>
        </div>
      </Card>

      {/* --- Section: Mistake Pattern Analysis --- */}
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="flex items-center gap-2 mb-2">
          <PieChart size={18} className="text-[#F8AE39]"/>
          <h2 className="text-lg font-bold text-[#252733]">Mistake Pattern Analysis</h2>
        </div>
        {mistakePatterns.length === 0 ? (
          <div className="flex flex-col items-center bg-[#F9FAFC] rounded-2xl py-16">
            <PieChart size={38} className="mb-3 text-gray-300" />
            <div className="text-gray-400 text-md font-medium">No mistake patterns identified yet</div>
          </div>
        ) : (
          <div>{/* TODO: mistake pattern content here */}</div>
        )}
      </Card>
      {/* --- Section: Tag/Topic breakdown --- */}
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="font-bold text-lg mb-3">Chapter/Topic Analysis</div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-1 text-left">Tag/Chapter</th>
              <th className="px-2 py-1">Accuracy</th>
              <th className="px-2 py-1">Mastery Level</th>
            </tr>
          </thead>
          <tbody>
            {tagBreakdown.map((t) =>
              <tr key={t.tag}>
                <td className="px-2 py-1">{t.tag}</td>
                <td className="px-2 py-1">{t.accuracy}%</td>
                <td className="px-2 py-1">
                  <span className={
                    t.mastery === "Mastery"
                    ? "py-1 px-2 rounded bg-green-100 text-green-700 text-xs"
                    : t.mastery === "Average"
                    ? "py-1 px-2 rounded bg-yellow-100 text-yellow-700 text-xs"
                    : "py-1 px-2 rounded bg-red-100 text-red-700 text-xs"
                  }>
                    {t.mastery}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
