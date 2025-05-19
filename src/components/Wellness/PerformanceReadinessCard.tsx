import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";

function getPerformanceScore() {
  // Simulated readiness (0-100)
  return 75 + Math.round(Math.random()*18)  // 75-93
}
const perfScore = getPerformanceScore();

export default function PerformanceReadinessCard() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex gap-2 items-center pb-1">
        <BarChart className="text-learnzy-purple" size={20} />
        <CardTitle className="text-base font-semibold">Performance Readiness Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-semibold mb-1">
          <span>Readiness Score:&nbsp;</span>
          <span className="text-learnzy-orange">{perfScore}</span>
          <span className="text-gray-500">/100</span>
        </div>
        <div className="text-xs text-muted-foreground mb-2">
          Based on HRV, sleep, and practice metrics. A score above 85 suggests readiness for exams or major study sessions.
        </div>
        <div className="text-xs text-blue-600">
          <b>Did you know?</b> Students showing &gt;10pt drop in HRV over 3 weeks are 23% more likely to see performance decline!
        </div>
      </CardContent>
    </Card>
  );
}
