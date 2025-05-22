
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { PieChart, ChevronDown, ChevronUp, Circle } from "lucide-react";

// UI-inspired tag colors
const TAG_COLORS = [
  "#FDB45C", // orange
  "#FF7043", // deep orange
  "#7e57c2", // purple
  "#ab47bc", // violet
  "#42a5f5", // blue
  "#66bb6a", // green
  "#ef5350", // red
  "#26a69a", // teal
  "#ec407a", // pink
  "#d4e157", // lime
  "#ff7043", // orangered
];

export default function AcademicAnalyticsSection({ questions }: { questions: any[] }) {
  // Metrics
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

  // Pie chart for tag patterns
  const pieData = tagStats.map((item, idx) => ({
    name: item.tag,
    value: item.count,
    fill: TAG_COLORS[idx % TAG_COLORS.length],
  }));

  // Bar chart data
  const barData = questions.map((q, i) => ({
    name: (i + 1).toString(),
    yourTime: q.timeTaken ?? 0,
    idealTime: 30,
    chapter: q.Chapter_name || q.chapter_name || "",
    isCorrect: q.isCorrect,
    topic: q.Topic || q.topic || "",
  }));

  // Accordion/collapse state for chapters
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const toggleChapter = (ch: string) => {
    setOpenChapters(prev => ({ ...prev, [ch]: !prev[ch] }));
  };

  // Unique chapters
  const chapters = [...new Set(barData.map(q => q.chapter))].filter(Boolean);

  return (
    <div>
      {/* Time per Question Section */}
      <Card className="p-0 mb-8 bg-white shadow rounded-3xl border-0">
        <div className="p-6 pb-2 border-b flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#f8ae3933] rounded-full p-1.5">
              <PieChart size={20} className="text-[#F8AE39] opacity-90" />
            </span>
            <h2 className="text-xl font-bold text-[#252733]">Time per Question</h2>
          </div>
          <div className="flex gap-2 items-center">
            {/* Optionally: future Zoom in/Review buttons */}
          </div>
        </div>
        <div className="px-6 py-4">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fontSize:12, fill:'#888'}} />
              <YAxis tickLine={false} axisLine={false} label={{ value: "Time (s)", angle: -90, position: "insideLeft", offset: 18 }} domain={[0,80]} />
              <Tooltip
                contentStyle={{ borderRadius: 16, fontSize: 13, boxShadow: "0 8px 24px 0 #E0D0F780" }}
                formatter={v => v + "s"}
              />
              <Bar dataKey="yourTime" fill="#7356FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="idealTime" fill="#F8AE39" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="py-3 rounded-lg bg-[#FAFAFB] border">
              <div className="text-gray-500 text-xs mb-0.5">Avg. Time per Question</div>
              <div className="font-bold text-lg">{avgTime}s</div>
            </div>
            <div className="py-3 rounded-lg bg-[#FAFAFB] border">
              <div className="text-gray-500 text-xs mb-0.5">Accuracy</div>
              <div className="font-bold text-lg text-green-600">{total ? Math.round((correct/total)*100) : 0}%</div>
            </div>
            <div className="py-3 rounded-lg bg-[#FAFAFB] border">
              <div className="text-gray-500 text-xs mb-0.5">Questions</div>
              <div className="font-bold text-lg">{total}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Mistake Patterns by Tag - with Pie Chart */}
      <Card className="p-0 mb-8 bg-[#FFF8F0] shadow rounded-3xl border-0">
        <div className="p-6 pb-2 border-b flex items-center gap-2">
          <span className="bg-[#fff2d5] rounded-full p-1.5">
            <PieChart size={20} className="text-[#FDB45C] opacity-90" />
          </span>
          <h2 className="text-xl font-bold text-[#32323a]">Mistake Pattern Analysis</h2>
        </div>
        <div className="px-6 py-6">
          {pieData.length === 0 ? (
            <div className="flex flex-col items-center bg-[#F9FAFC] rounded-2xl py-16">
              <PieChart size={38} className="mb-3 text-gray-300" />
              <div className="text-gray-400 text-md font-medium">No tags assigned yet</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-44 h-44 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={82}
                      stroke="#fff"
                      paddingAngle={1}
                      labelLine={false}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {pieData.map((item, idx) => (
                  <span key={item.name} className="flex items-center gap-1 text-sm">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="opacity-80">{item.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {pieData.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 text-center">
              This chart shows the most common reasons you got questions wrong based on your selected tags.
            </div>
          )}
        </div>
      </Card>

      {/* Chapter/Topic breakdown - enhanced UI */}
      <Card className="p-0 mb-8 bg-white shadow rounded-3xl border-0">
        <div className="px-6 pt-6 pb-2 flex items-center gap-2 border-b">
          <span className="bg-[#E3DEFA] rounded-full p-1.5">
            <Circle size={18} className="text-[#7356FF] opacity-80" />
          </span>
          <div className="font-bold text-xl text-[#32323a]">Chapter &amp; Topic Performance</div>
        </div>
        <div className="px-2 sm:px-4 py-4">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="border-b text-gray-500 bg-[#fafaff]">
                <th className="px-2 py-3 text-left font-semibold">Chapter</th>
                <th className="px-2 py-3 font-semibold">Accuracy</th>
                <th className="px-2 py-3 font-semibold">Questions</th>
                <th className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((ch) => {
                const chapterQs = barData.filter(q => q.chapter === ch);
                const correctCount = chapterQs.filter(q => q.isCorrect).length;
                const acc = chapterQs.length ? Math.round((correctCount/chapterQs.length)*100) : 0;
                // topic breakdown
                const topics = [...new Set(chapterQs.map(q => q.topic).filter(Boolean))];

                return (
                  <>
                    <tr
                      key={ch}
                      className={`border-b group transition-all duration-200 ${
                        openChapters[ch] ? "bg-[#f5f6fb]" : "hover:bg-[#faf6ff]"
                      }`}
                    >
                      <td className="px-2 py-2 font-medium flex items-center">
                        <button
                          className={`mr-2 rounded focus:outline-none ${openChapters[ch] ? "bg-[#7356FF22]" : ""} transition-all`}
                          onClick={() => toggleChapter(ch)}
                          aria-label={openChapters[ch] ? "Collapse" : "Expand"}
                        >
                          {openChapters[ch] ? (
                            <ChevronUp size={18} className="text-gray-500" />
                          ) : (
                            <ChevronDown size={18} className="text-gray-500" />
                          )}
                        </button>
                        <span className="text-lg">{ch || <span className="italic text-gray-400">Unknown</span>}</span>
                      </td>
                      <td className="px-2 py-2 font-semibold text-center">{acc}%</td>
                      <td className="px-2 py-2 font-semibold text-center">{chapterQs.length}</td>
                      <td />
                    </tr>

                    {openChapters[ch] && topics.length > 0 && (
                      <tr>
                        <td colSpan={4} className="pb-4 bg-[#f9faff]">
                          <div className="rounded-xl px-2 py-2 ml-8 shadow border bg-white">
                            <div className="text-xs font-semibold mb-2 text-gray-600">Topic-wise Analysis</div>
                            <table className="text-xs md:text-sm w-full">
                              <thead>
                                <tr className="text-[13px] text-gray-500 border-b">
                                  <th className="px-2 py-2 text-left">Topic</th>
                                  <th className="px-2 py-2">Accuracy</th>
                                  <th className="px-2 py-2">Questions</th>
                                  <th className="px-2 py-2">Avg Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {topics.map(topic => {
                                  const topicQs = chapterQs.filter(q => q.topic === topic);
                                  const correctTopic = topicQs.filter(q => q.isCorrect).length;
                                  const avgTopicTime = topicQs.length
                                    ? Math.round(topicQs.reduce((t, q) => t + (q.yourTime ?? 0), 0) / topicQs.length)
                                    : 0;
                                  return (
                                    <tr key={topic} className="hover:bg-[#F8F7FF]">
                                      <td className="px-2 py-2">{topic || <span className="italic text-gray-400">Unknown</span>}</td>
                                      <td className="px-2 py-2 text-center">{topicQs.length ? Math.round((correctTopic/topicQs.length)*100) : 0}%</td>
                                      <td className="px-2 py-2 text-center">{topicQs.length}</td>
                                      <td className="px-2 py-2 text-center">{avgTopicTime}s</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
