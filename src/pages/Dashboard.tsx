
import React, { useState } from "react";
import SummaryMetrics from "@/components/dashboard/SummaryMetrics";
import FilterBar from "@/components/dashboard/FilterBar";
import ActivityCharts from "@/components/dashboard/ActivityCharts";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ActionableInsights from "@/components/dashboard/ActionableInsights";
import {
  ChartPie,
  ChartBar,
  Clock,
  TrendingUp,
  User,
  Calendar
} from "lucide-react";

// Placeholder for future: hook/query to real data.
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
  activities: [
    { id: '1', type: "practice", title: "120 Questions Attempted", date: new Date().toISOString(), description: "Great practice in Physics!" },
    { id: '2', type: "wellness", title: "Meditation Session", date: new Date(Date.now() - 86400000).toISOString(), description: "Completed 10 min meditation." },
    { id: '3', type: "revision", title: "Revision on Ecology", date: new Date(Date.now() - 2 * 86400000).toISOString(), description: "Reviewed all key concepts." }
  ] as {
    id: string;
    type: "practice" | "wellness" | "revision";
    title: string;
    date: string;
    description: string;
  }[],
});

const Dashboard = () => {
  const [range, setRange] = useState<"week" | "month" | "custom">("week");

  // Use placeholder/mock data (replace with data query as needed)
  const { summary, questionsChart, revisionChart, wellnessChart, activities } = getMockStats(range);

  return (
    <div className="container mx-auto max-w-7xl animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      {/* Actionable insights section */}
      <ActionableInsights summary={summary} />

      <FilterBar range={range} onChange={setRange} />
      <SummaryMetrics data={summary} />
      <ActivityCharts 
        questionsChart={questionsChart}
        revisionChart={revisionChart}
        wellnessChart={wellnessChart}
      />
      <div className="my-8">
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;
