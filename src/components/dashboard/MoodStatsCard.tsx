
import React from "react";

// Dummy mood snapshot data
const moodLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const moodScores = [4, 2, 3, 1, 5, 4, 3]; // 1=bad, 5=awesome

const moodEmoji = [
  "😞", // 1
  "😕", // 2
  "😐", // 3
  "🙂", // 4
  "😄", // 5
];

const getInsight = (scores: number[]): string => {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg >= 4.5) return "You're feeling great this week! Keep it up 👏";
  if (avg >= 3.5) return "Mostly good mood, some dips. Maintain your positive habits.";
  if (avg >= 2.5) return "Some ups and downs. Try to notice patterns and address stressors.";
  return "It's been a tough week. Consider self-care or talking to Shiv for support!";
};

const MoodStatsCard = () => (
  <div className="bg-learnzy-purple/10 rounded-xl p-4 shadow-md">
    <h3 className="font-semibold text-lg mb-2">How are you feeling?</h3>
    <div className="flex items-center space-x-2 mb-2">
      {moodScores.map((score, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-xl">{moodEmoji[score-1]}</span>
          <span className="text-xs text-gray-500">{moodLabels[i]}</span>
        </div>
      ))}
    </div>
    <div className="w-full h-1 rounded-full overflow-hidden bg-gray-200 mb-1">
      <div
        className="h-full bg-learnzy-purple rounded-full transition-all"
        style={{width: `${(moodScores.reduce((a,b)=>a+b,0)/moodScores.length/5)*100}%`}}
      ></div>
    </div>
    <div className="text-xs text-gray-600 mt-2">{getInsight(moodScores)}</div>
  </div>
);

export default MoodStatsCard;
