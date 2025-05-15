
import React from "react";
import { Button } from "@/components/ui/button";

// Mock top priorities data
const topPriorities = [
  {
    topic: "Cell Biology",
    reason: "Foundation for Genetics - multiple NEET questions expected!",
    suggestion: "Finish by Friday evening to stay ahead of schedule.",
  },
  {
    topic: "Biomolecules",
    reason: "Recently missed; overlaps with Chemistry revision.",
    suggestion: "Pair with revision session this weekend.",
  },
  {
    topic: "Human Physiology",
    reason: "Crucial for mock test - next Monday.",
    suggestion: "1-hour catch-up suggested tomorrow.",
  },
];

const BacklogCenter = () => (
  <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
    <div className="bg-[#FFFDF7] rounded-2xl shadow-2xl border border-[#FFBD59]/30 w-full max-w-md mx-auto p-7 flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-3xl">🧠</span>
        <span className="text-lg font-bold text-gray-900">Shiv’s Backlog Center</span>
      </div>
      <div className="text-sm text-gray-600 mb-3">Your top 3 fix-now topics, prioritized by Shiv:</div>
      <div className="flex flex-col gap-3">
        {topPriorities.map((item, idx) => (
          <div key={idx} className="bg-[#FFF7EB] rounded-xl px-4 py-3 border border-[#FFBD59]/20 shadow-sm">
            <div className="font-medium text-gray-900">{item.topic}</div>
            <div className="text-[#ea384c] text-xs mb-1">{item.reason}</div>
            <div className="text-gray-700 text-xs mb-2">{item.suggestion}</div>
            <Button size="sm" className="rounded-full bg-[#22C55E] text-white hover:bg-[#16a34a] text-xs">Fix with Shiv</Button>
          </div>
        ))}
      </div>
      <Button className="rounded-full mt-2 font-semibold bg-[#FFBD59] text-gray-900 hover:bg-[#ffe29d]">Fix All with Shiv</Button>
    </div>
  </div>
);

export default BacklogCenter;
