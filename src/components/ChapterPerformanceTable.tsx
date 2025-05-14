
import React from "react";

interface Row {
  chapter: string;
  correct: boolean;
  time: number;
  // add more if needed, e.g. tags/subtopics
}

interface ChapterTableProps {
  tagMap: Row[];
}
const ChapterPerformanceTable: React.FC<ChapterTableProps> = ({tagMap}) => {
  // Example: Grouped by chapter/tag, show accuracy bar + mastery level
  const groups = tagMap.reduce((acc, cur) => {
    acc[cur.chapter] ??= { correct: 0, total: 0 };
    acc[cur.chapter].total += 1;
    if (cur.correct) acc[cur.chapter].correct += 1;
    return acc;
  }, {} as Record<string, {correct: number; total: number}>);

  return (
    <div className="bg-white rounded p-6">
      <h3 className="text-lg font-bold mb-3">Chapter Performance</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Chapter/Tag</th>
            <th className="px-2 py-1">Accuracy</th>
            <th className="px-2 py-1">Mastery Level</th>
            <th className="px-2 py-1">Questions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groups).map(([ch, v], i) => (
            <tr key={ch}>
              <td className="px-2 py-1">{ch}</td>
              <td className="px-2 py-1">{Math.round((v.correct/v.total)*100)}%</td>
              <td className="px-2 py-1">
                <span className={
                  v.correct / v.total > 0.8
                  ? "py-1 px-2 rounded bg-green-100 text-green-700 text-xs"
                  : v.correct/v.total > 0.5
                  ? "py-1 px-2 rounded bg-yellow-100 text-yellow-700 text-xs"
                  : "py-1 px-2 rounded bg-red-100 text-red-700 text-xs"
                }>
                  {v.correct / v.total > 0.8 ? "Mastery" : v.correct/v.total > 0.5 ? "Average" : "Needs Improvement"}
                </span>
              </td>
              <td className="px-2 py-1">{v.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ChapterPerformanceTable;
