
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bed, Clock } from "lucide-react";

function getSimulatedSleep(hours = 7): [number, string] {
  // Simulate sleep between 5.5 and 8 hours and recovery
  const sleep = 5.5 + Math.random() * 2.5;
  let recovery = sleep > 7.5 ? "Excellent" : sleep > 6.5 ? "Good" : "Poor";
  return [parseFloat(sleep.toFixed(1)), recovery];
}

const [lastSleep, recoveryQuality] = getSimulatedSleep();

export default function FatigueManagementCard() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex gap-2 items-center pb-1">
        <Bed className="text-learnzy-purple" size={20} />
        <CardTitle className="text-base font-semibold">Fatigue Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs">
          <span className="font-semibold">Last night’s sleep:</span>
          <span className="ml-2">{lastSleep} hours</span>
          <span className="ml-3 font-semibold">Recovery: </span>{recoveryQuality}
        </div>
        <div className="bg-learnzy-mint rounded-lg p-2 my-2 text-[13px]">
          <Clock size={15} className="inline-block text-learnzy-orange mr-1" />
          Micro-break suggested after 35 min<span className="text-gray-600"> of intense study.</span>
        </div>
        <div className="text-xs text-gray-500">Quality sleep + short breaks = increased focus & reduced fatigue risk.</div>
      </CardContent>
    </Card>
  );
}

