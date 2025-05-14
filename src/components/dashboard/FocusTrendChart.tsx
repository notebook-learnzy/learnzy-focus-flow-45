
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for the last 7 days focus trend (replace with real queries or context if available)
const FOCUS_TREND = [
  { date: "Mon", focus: 82 },
  { date: "Tue", focus: 77 },
  { date: "Wed", focus: 81 },
  { date: "Thu", focus: 79 },
  { date: "Fri", focus: 74 },
  { date: "Sat", focus: 85 },
  { date: "Sun", focus: 88 },
];

interface FocusTrendChartProps {
  title?: string;
  data?: { date: string; focus: number }[];
}

const FocusTrendChart: React.FC<FocusTrendChartProps> = ({
  title = "Focus Trend (Last 7 Days)",
  data = FOCUS_TREND,
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={value => [`${value}`, "Focus"]} />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#9b87f5"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={{ r: 4, fill: "#9b87f5" }}
                name="Focus Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusTrendChart;
