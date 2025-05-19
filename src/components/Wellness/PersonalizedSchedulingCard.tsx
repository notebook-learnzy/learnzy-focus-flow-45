
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

function getSimulatedPeakHour(): {hour: number, meridiem: string} {
  // Simulate a 10am or 4pm peak randomly for demo
  const hour = Math.random() > 0.5 ? 10 : 16;
  return { hour: hour > 12 ? hour - 12 : hour, meridiem: hour >= 12 ? "PM" : "AM" };
}

const { hour, meridiem } = getSimulatedPeakHour();

export default function PersonalizedSchedulingCard() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex gap-2 items-center pb-1">
        <Clock className="text-learnzy-purple" size={20} />
        <CardTitle className="text-base font-semibold">Personalized Study Scheduling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-1">
          <span className="font-semibold ">Peak Focus Window: </span>
          <span className="text-learnzy-orange font-bold">{hour}:00 {meridiem}</span>
        </div>
        <div className="text-xs text-muted-foreground mb-2">
          We recommend scheduling your most demanding tasks during this time for optimal learning.
        </div>
        <div className="p-2 rounded-lg bg-learnzy-mint text-[13px] max-w-xs">
          Example: Try starting your hardest revision or test practice around <b>{hour}:00 {meridiem}</b>.
        </div>
      </CardContent>
    </Card>
  );
}
