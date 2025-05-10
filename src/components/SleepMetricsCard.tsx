
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SleepMetrics } from "@/types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SleepMetricsCardProps {
  metrics: SleepMetrics;
}

const SleepMetricsCard = ({ metrics }: SleepMetricsCardProps) => {
  // Convert minutes to hours and minutes
  const hours = Math.floor(metrics.duration / 60);
  const minutes = metrics.duration % 60;
  
  // Calculate percentages for sleep stages
  const remPercentage = (metrics.remSleep / metrics.duration) * 100;
  const deepPercentage = (metrics.deepSleep / metrics.duration) * 100;
  const lightPercentage = (metrics.lightSleep / metrics.duration) * 100;
  
  // Determine score color
  const getScoreColor = () => {
    if (metrics.score >= 80) return "text-green-500";
    if (metrics.score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Moon size={18} className="mr-2" />
          Sleep Quality
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger>
              <span className={cn("text-2xl font-semibold", getScoreColor())}>
                {metrics.score}/100
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sleep quality score</p>
            </TooltipContent>
          </Tooltip>
          
          <span className="text-right">
            <span className="font-medium">{hours}h {minutes}m</span>
            <p className="text-xs text-gray-500">
              {new Date(metrics.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </span>
        </div>
        
        <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
          <div 
            className="bg-blue-900"
            style={{ width: `${deepPercentage}%` }}
          />
          <div 
            className="bg-blue-500"
            style={{ width: `${remPercentage}%` }}
          />
          <div 
            className="bg-blue-200"
            style={{ width: `${lightPercentage}%` }}
          />
        </div>
        
        <div className="grid grid-cols-3 text-xs">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-900 rounded-full mr-1" /> 
            <span className="text-gray-600">Deep</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1" /> 
            <span className="text-gray-600">REM</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-blue-200 rounded-full mr-1" /> 
            <span className="text-gray-600">Light</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 pt-1">
          {metrics.quality === "Excellent" 
            ? "You had excellent sleep quality last night. Keep it up!" 
            : metrics.quality === "Good" 
              ? "Good sleep quality. Your body is well-rested."
              : "Average sleep quality. Try to get more deep sleep."}
        </p>
      </CardContent>
    </Card>
  );
};

export default SleepMetricsCard;
