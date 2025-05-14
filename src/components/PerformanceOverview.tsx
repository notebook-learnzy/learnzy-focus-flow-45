
import React from "react";

interface PerformanceOverviewProps {
  score: number;
  accuracy: number;
  totalScore: number;
  timeSpent: number;
  correct: number;
  incorrect: number;
  unattempted: number;
}
const timeString = (sec: number) =>
  `${Math.floor(sec/60)}h ${sec%60}m`;

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  score, accuracy, totalScore, timeSpent, correct, incorrect, unattempted
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded shadow p-5 text-center">
        <div className="text-sm text-gray-400 mb-1">Total Score</div>
        <div className="text-3xl font-bold mb-1">{score} <span className="text-gray-400">/ {totalScore}</span></div>
      </div>
      <div className="bg-white rounded shadow p-5 text-center">
        <div className="text-sm text-gray-400 mb-1">Accuracy</div>
        <div className="text-3xl font-bold mb-1">{accuracy}%</div>
      </div>
      <div className="bg-white rounded shadow p-5 text-center">
        <div className="text-sm text-gray-400 mb-1">Time Spent</div>
        <div className="text-2xl font-semibold">{timeString(timeSpent || 0)}</div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="rounded p-4 text-center bg-green-100">
        <div className="text-md text-green-700 font-semibold">Correct</div>
        <div className="text-2xl">{correct}</div>
      </div>
      <div className="rounded p-4 text-center bg-red-100">
        <div className="text-md text-red-700 font-semibold">Incorrect</div>
        <div className="text-2xl">{incorrect}</div>
      </div>
      <div className="rounded p-4 text-center bg-gray-100">
        <div className="text-md text-gray-700 font-semibold">Unattempted</div>
        <div className="text-2xl">{unattempted}</div>
      </div>
    </div>
  </div>
);

export default PerformanceOverview;
