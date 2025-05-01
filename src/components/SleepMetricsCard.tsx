
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SleepMetrics } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SleepMetricsCardProps {
  metrics: SleepMetrics;
}

const SleepMetricsCard = ({ metrics }: SleepMetricsCardProps) => {
  // Convert minutes to hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Determine color based on sleep score
  const getScoreColor = () => {
    if (metrics.score >= 80) return "text-green-500";
    if (metrics.score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  // Get progress color for the bar
  const getProgressColor = () => {
    if (metrics.score >= 80) return "bg-green-500";
    if (metrics.score >= 60) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Moon size={18} className="mr-2" />
          Sleep Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-2">
                <span className={cn("text-2xl font-semibold", getScoreColor())}>
                  {metrics.score}/100
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-2">
              <div className="space-y-1">
                <p><strong>Total:</strong> {formatTime(metrics.duration)}</p>
                <p><strong>REM:</strong> {formatTime(metrics.remSleep)}</p>
                <p><strong>Deep:</strong> {formatTime(metrics.deepSleep)}</p>
                <p><strong>Light:</strong> {formatTime(metrics.lightSleep)}</p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <span className="text-xs text-gray-500">
            {new Date(metrics.date).toLocaleDateString()}
          </span>
        </div>
        
        <Progress 
          value={metrics.score} 
          className={cn("h-2", getProgressColor())}
        />
        
        <p className="text-sm text-gray-700">
          {metrics.score < 70 ? 
            "Low sleep quality. Consider light revision today." : 
            "Good sleep quality. You're ready for focused study."}
        </p>
      </CardContent>
    </Card>
  );
};

export default SleepMetricsCard;
