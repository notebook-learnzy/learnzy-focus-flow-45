
import React, { useState } from "react";
import SummaryMetrics from "@/components/dashboard/SummaryMetrics";
import FilterBar from "@/components/dashboard/FilterBar";
import ActivityCharts from "@/components/dashboard/ActivityCharts";
import ActionableInsights from "@/components/dashboard/ActionableInsights";
import StreakCard from "@/components/dashboard/StreakCard";
import { Bolt } from "lucide-react";
import {
  ChartPie,
  ChartBar,
  Clock,
  TrendingUp,
  User,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import SmartRingCard from "@/components/dashboard/SmartRingCard";
import FocusTrendChart from "@/components/dashboard/FocusTrendChart";

const getMockStats = (range: "week" | "month" | "custom") => ({
  summary: [
    { icon: <ChartPie size={26}/>, label: "Questions Attempted", value: range === "week" ? 42 : 148 },
    { icon: <ChartBar size={26}/>, label: "Revision Sessions", value: range === "week" ? 2 : 10 },
    { icon: <Clock size={26}/>, label: "Wellness Sessions", value: range === "week" ? 1 : 7 },
    { icon: <TrendingUp size={26}/>, label: "Accuracy", value: range === "week" ? "72%" : "74%" },
    { icon: <User size={26}/>, label: "Focus Score Avg", value: range === "week" ? 81 : 79 },
    { icon: <Calendar size={26}/>, label: "Practice Sessions", value: range === "week" ? 4 : 18 },
  ],
  questionsChart: Array(7).fill(0).map((_, i) => ({
    label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    value: Math.floor(Math.random() * 30) + 10
  })),
  revisionChart: Array(7).fill(0).map((_, i) => ({
    label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    value: Math.floor(Math.random() * 6)
  })),
  wellnessChart: Array(7).fill(0).map((_, i) => ({
    label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    value: Math.floor(Math.random() * 3) + 1
  })),
});

const mockAssignments = [
  {
    id: "1",
    title: "Physics Assignment - Motion in a Plane",
    deadline: "2025-05-16",
  },
  {
    id: "2",
    title: "Zoology Worksheet - Cell Structure",
    deadline: "2025-05-17",
  },
];
const mockAnnouncements = [
  {
    id: "a1",
    title: "Upcoming NEET Prep Session",
    date: "2025-05-15",
    content: "Join the special NEET revision class on Friday.",
  },
  {
    id: "a2",
    title: "Results Declared",
    date: "2025-05-13",
    content: "Mid-term marks are now available.",
  },
];

const Dashboard = () => {
  const [range, setRange] = useState<"week" | "month" | "custom">("week");
  const { mode } = useAppContext();

  const { summary, questionsChart, revisionChart, wellnessChart } = getMockStats(range);

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-full px-2 sm:px-4 md:px-8 mx-auto animate-fade-in bg-learnzy-background min-h-[100dvh] pb-28 pt-3">
      {/* Heading */}
      <h1 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 mt-2 pl-1 sm:pl-0 text-gray-900">
        Dashboard Overview
      </h1>
      
      {/* Streak + Motivation (mobile: stacked) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-3 sm:mb-6">
        <div className="w-full">
          <StreakCard days={range === "week" ? 6 : 21} />
        </div>
        <div className="rounded-xl bg-gradient-to-r from-violet-300 via-pink-300 to-orange-200 p-3 sm:p-5 flex flex-col justify-between shadow min-h-[90px] hover:scale-105 transition-transform animate-fade-in w-full">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-base sm:text-lg mb-1">
            <Bolt className="text-yellow-500 w-6 h-6" />
            Quick Motivation
          </div>
          <div className="text-[14px] sm:text-[15px] text-gray-700 mb-2">
            🌟 “Success is the sum of small efforts, repeated day in and day out.”
            <br />
            Ready to challenge yourself today?
          </div>
          <Button
            className="w-full sm:w-max bg-learnzy-purple text-white font-semibold mt-1"
            onClick={() => navigate("/practice")}
          >
            Try a Quiz
          </Button>
        </div>
      </div>

      {/* Focus + Ring (mobile: stacked) */}
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 mb-3 sm:mb-6">
        <div className="rounded-xl bg-white p-2 sm:p-4 shadow min-w-0 flex flex-col items-center justify-center w-full">
          <FocusTrendChart />
          <p className="mt-2 text-[15px] sm:text-base text-gray-700 font-medium text-center">Your Focus Over Time</p>
        </div>
        <div className="w-full">
          <SmartRingCard />
        </div>
      </div>

      {/* Institute stuff */}
      {mode === "institute" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-white shadow rounded-lg p-3 sm:p-4">
            <h2 className="font-semibold text-base sm:text-lg mb-2">Assignments Due</h2>
            <div className="space-y-2">
              {mockAssignments.map(a => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="font-medium text-sm">{a.title}</span>
                  <span className="text-xs text-gray-500">Due: {a.deadline}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-3 sm:p-4">
            <h2 className="font-semibold text-base sm:text-lg mb-2">Announcements</h2>
            <div className="space-y-2">
              {mockAnnouncements.map(ann => (
                <div key={ann.id} className="border-b last:border-b-0 pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{ann.title}</span>
                    <span className="text-xs text-gray-400">{ann.date}</span>
                  </div>
                  <div className="text-xs text-gray-600">{ann.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights, filter, summary, activity */}
      <div className="mb-3">
        <ActionableInsights summary={summary} />
      </div>
      <div className="mb-2">
        <FilterBar range={range} onChange={setRange} />
      </div>
      <div className="mb-3">
        <SummaryMetrics data={summary} />
      </div>
      <div className="mb-10">
        <ActivityCharts 
          questionsChart={questionsChart}
          revisionChart={revisionChart}
          wellnessChart={wellnessChart}
        />
      </div>
    </div>
  );
};

export default Dashboard;
