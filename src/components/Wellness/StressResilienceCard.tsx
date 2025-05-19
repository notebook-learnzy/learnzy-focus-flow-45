
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function StressResilienceCard() {
  // Simulate a peer average for stress/HRV (for demo)
  const myAvg = 71 + Math.round(Math.random()*4);
  const cohortAvg = 73;
  return (
    <Card className="mb-4">
      <CardHeader className="flex gap-2 items-center pb-1">
        <Activity className="text-learnzy-orange" size={20} />
        <CardTitle className="text-base font-semibold">Stress-Resilience Strength</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-1">
          <b>Your average HRV:</b> <span className="text-learnzy-purple font-bold">{myAvg}</span>
          <br/>
          <b>Peers (matched):</b> <span className="font-bold">{cohortAvg}</span>
        </div>
        <div className="text-xs text-muted-foreground mb-2">
          Short HRV biofeedback exercises can improve your stress resilience by up to 27%.
        </div>
        <div className="bg-learnzy-mint rounded-lg p-2 mb-2">
          <span className="font-bold">Tip:</span> Try a 5-minute "coherence breathing" session when you feel stress rising to boost your recovery curve.
        </div>
        <div className="text-xs text-gray-500 mb-1">
          Detect HRV dips early during quizzes to build exam resilience.
        </div>
      </CardContent>
    </Card>
  );
}
