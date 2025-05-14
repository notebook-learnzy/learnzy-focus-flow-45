
import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface TimePerQuestionChartProps {
  focusTimeline: {time_spent: number}[];
  avgTime: number;
  slowerCount: number;
  fasterCount: number;
  deviations: {question: number, description: string, diff: string, slower: boolean}[];
}
const TimePerQuestionChart: React.FC<TimePerQuestionChartProps> = ({
  focusTimeline, avgTime, slowerCount, fasterCount, deviations
}) => {
  const data = focusTimeline.map((q, idx) => ({
    name: (idx + 1).toString(),
    "Your Time": q.time_spent,
    "Ideal Time": avgTime
  }));
  return (
    <div className="bg-white p-6 mb-6 rounded">
      <h3 className="text-lg font-bold mb-2">Time per Question</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Your Time" fill="#6366f1" />
            <Bar dataKey="Ideal Time" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 my-4">
        <div className="text-center">
          <div className="font-semibold text-gray-500 text-xs">Avg. Time / Q</div>
          <div className="text-xl font-bold">{avgTime}s</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-500 text-xs">Slower Questions</div>
          <div className="text-xl font-bold">{slowerCount}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-500 text-xs">Faster Questions</div>
          <div className="text-xl font-bold">{fasterCount}</div>
        </div>
      </div>
      <div className="mt-6">
        <div className="font-bold mb-3">Most Significant Time Deviations</div>
        <div className="space-y-2">
          {deviations.map((d, idx) => (
            <div key={idx} className={`p-2 rounded ${d.slower ? "bg-red-100" : "bg-green-100"} flex justify-between`}>
              <div>
                <span className="font-semibold">Question {d.question}</span> - <span>{d.description}</span>
              </div>
              <span className={`font-bold ${d.slower ? "text-red-600" : "text-green-600"}`}>{d.diff}{d.slower ? " slower" : " faster"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TimePerQuestionChart;
