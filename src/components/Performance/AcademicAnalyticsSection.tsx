
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from "lucide-react";

// Accepts real `questions` prop
export default function AcademicAnalyticsSection({ questions }: { questions: any[] }) {
  // Prepare data metrics
  const total = questions.length;
  const correct = questions.filter(q => q.isCorrect).length;
  const timeList = questions.map(q => q.timeTaken ?? 0);
  const avgTime = timeList.length ? Math.round(timeList.reduce((a, b) => a + b) / timeList.length) : 0;
  const tagsFlat = questions.flatMap(q => q.tags ?? []);
  const tagCount: Record<string, number> = {};
  tagsFlat.forEach(tag => {
    tagCount[tag] = (tagCount[tag] || 0) + 1;
  });
  const tagStats = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  // Bar chart data
  const barData = questions.map((q, i) => ({
    name: (i + 1).toString(),
    yourTime: q.timeTaken ?? 0,
    idealTime: 30, // Could compute better later
    chapter: q.Chapter_name || q.chapter_name || "",
    isCorrect: q.isCorrect,
    // Add other analytics if needed
  }));

  return (
    <div>
      {/* --- Section: Time Per Question --- */}
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-[#252733] mb-2">Time per Question</h2>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fontSize:12, fill:'#888'}} />
            <YAxis tickLine={false} axisLine={false} label={{ value: "Time (s)", angle: -90, position: "insideLeft", offset: 18 }} domain={[0,80]} />
            <Tooltip />
            <Bar dataKey="yourTime" fill="#7356FF" />
            <Bar dataKey="idealTime" fill="#F8AE39" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="py-3 rounded bg-[#FAFAFB]">
            <div className="text-gray-500 text-xs mb-0.5">Avg. Time per Question</div>
            <div className="font-bold text-lg">{avgTime}s</div>
          </div>
          <div className="py-3 rounded bg-[#FAFAFB]">
            <div className="text-gray-500 text-xs mb-0.5">Accuracy</div>
            <div className="font-bold text-lg text-green-600">{Math.round((correct/total)*100)}%</div>
          </div>
          <div className="py-3 rounded bg-[#FAFAFB]">
            <div className="text-gray-500 text-xs mb-0.5">Questions</div>
            <div className="font-bold text-lg">{total}</div>
          </div>
        </div>
      </Card>

      {/* --- Section: Tag Frequency --- */}
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="flex items-center gap-2 mb-2">
          <PieChart size={18} className="text-[#F8AE39]"/>
          <h2 className="text-lg font-bold text-[#252733]">Mistake Patterns by Tag</h2>
        </div>
        {tagStats.length === 0 ? (
          <div className="flex flex-col items-center bg-[#F9FAFC] rounded-2xl py-16">
            <PieChart size={38} className="mb-3 text-gray-300" />
            <div className="text-gray-400 text-md font-medium">No tags assigned yet</div>
          </div>
        ) : (
          <ul className="pl-4 mb-2">
            {tagStats.map(({ tag, count }) =>
              <li key={tag}>{tag}: <span className="font-bold">{count}</span></li>
            )}
          </ul>
        )}
      </Card>

      {/* --- Section: Chapter/Topic breakdown --- */}
      <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
        <div className="font-bold text-lg mb-3">Chapter/Topic Analysis</div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-1 text-left">Tag/Chapter</th>
              <th className="px-2 py-1">Accuracy</th>
              <th className="px-2 py-1">Questions</th>
            </tr>
          </thead>
          <tbody>
            {[...new Set(barData.map(q=>q.chapter))].map((ch) => {
              const chapterQs = barData.filter(q => q.chapter === ch);
              const correctCount = chapterQs.filter(q => q.isCorrect).length;
              const acc = chapterQs.length ? Math.round((correctCount/chapterQs.length)*100) : 0;
              return (
                <tr key={ch}>
                  <td className="px-2 py-1">{ch}</td>
                  <td className="px-2 py-1">{acc}%</td>
                  <td className="px-2 py-1">{chapterQs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
