
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart, User, Calendar, PieChart, Clock } from "lucide-react";

type SummaryMetric = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subLabel?: string;
  accent?: string;
};

interface SummaryMetricsProps {
  data: SummaryMetric[];
}

const colors = [
  "bg-learnzy-purple text-white",
  "bg-learnzy-orange text-white",
  "bg-sky-500 text-white",
  "bg-green-500 text-white",
  "bg-pink-400 text-white",
  "bg-blue-400 text-white"
];

const SummaryMetrics: React.FC<SummaryMetricsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {data.map((metric, idx) => (
        <Card key={metric.label} className="shadow-none border-0 bg-transparent p-0">
          <CardContent className="flex items-center gap-3 p-4 sm:p-6 rounded-lg bg-white shadow-sm">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${colors[idx % colors.length]}`}>
              {metric.icon}
            </div>
            <div>
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="text-xs font-medium text-gray-500">
                {metric.label}
              </div>
              {metric.subLabel && (
                <div className="text-[11px] text-gray-400">{metric.subLabel}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
};

export default SummaryMetrics;
