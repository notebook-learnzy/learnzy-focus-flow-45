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
    <div className="container mx-auto max-w-7xl animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-6">
        <StreakCard days={range === "week" ? 6 : 21} />
        <div className="rounded-xl bg-gradient-to-r from-violet-300 via-pink-300 to-orange-200 p-5 flex flex-col justify-between shadow-md min-h-[100px] hover:scale-105 transition-transform animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-1">
            <Bolt className="text-yellow-500 w-6 h-6" />
            Quick Motivation
          </div>
          <div className="text-[15px] text-gray-700 mb-2">
            🌟 “Success is the sum of small efforts, repeated day in and day out.”
            <br />
            Ready to challenge yourself today?
          </div>
          <Button
            className="w-max bg-learnzy-purple text-white font-semibold mt-1 hover:scale-105"
            onClick={() => navigate("/practice")}
          >
            Try a Quiz
          </Button>
        </div>
      </div>

      {/* New Row: Focus Visualizer + Smart Ring Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-white p-4 shadow flex flex-col items-center justify-center">
          <FocusTrendChart />
          <p className="mt-2 text-base text-gray-700 font-medium">Your Focus Over Time</p>
        </div>
        <SmartRingCard />
      </div>

      {/* Show different dashboard based on mode */}
      {mode === "institute" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">Assignments Due</h2>
            <div className="space-y-2">
              {mockAssignments.map(a => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="font-medium">{a.title}</span>
                  <span className="text-xs text-gray-500">Due: {a.deadline}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">Announcements</h2>
            <div className="space-y-2">
              {mockAnnouncements.map(ann => (
                <div key={ann.id} className="border-b last:border-b-0 pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{ann.title}</span>
                    <span className="text-xs text-gray-400">{ann.date}</span>
                  </div>
                  <div className="text-xs text-gray-600">{ann.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ActionableInsights summary={summary} />
      <FilterBar range={range} onChange={setRange} />
      <SummaryMetrics data={summary} />
      <ActivityCharts 
        questionsChart={questionsChart}
        revisionChart={revisionChart}
        wellnessChart={wellnessChart}
      />
    </div>
  );
};

export default Dashboard;
