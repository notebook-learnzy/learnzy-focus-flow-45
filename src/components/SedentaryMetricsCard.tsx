
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SedentaryMetrics } from "@/types";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SedentaryMetricsCardProps {
  metrics: SedentaryMetrics;
}

const SedentaryMetricsCard = ({ metrics }: SedentaryMetricsCardProps) => {
  // Convert minutes to hours and minutes
  const hours = Math.floor(metrics.totalSittingTime / 60);
  const minutes = metrics.totalSittingTime % 60;
  
  // Determine color based on sitting time
  const getColorClass = () => {
    if (metrics.totalSittingTime < 120) return "text-green-500"; // Less than 2h
    if (metrics.totalSittingTime < 240) return "text-orange-500"; // 2-4h
    return "text-red-500"; // More than 4h
  };
  
  // Determine progress color
  const getProgressColor = () => {
    if (metrics.totalSittingTime < 120) return "bg-green-500";
    if (metrics.totalSittingTime < 240) return "bg-orange-500";
    return "bg-red-500";
  };
  
  // Calculate progress percentage (capped at 100%)
  const progressPercentage = Math.min(100, (metrics.totalSittingTime / 480) * 100); // 8h is 100%
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Clock size={18} className="mr-2" />
          Sedentary Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger>
              <span className={cn("text-2xl font-semibold", getColorClass())}>
                {hours}h {minutes}m
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Time spent sitting today</p>
            </TooltipContent>
          </Tooltip>
          
          <span className="text-xs text-gray-500">
            Last break: {new Date(metrics.lastBreak).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2"
          indicatorClassName={getProgressColor()}
        />
        
        <p className="text-sm text-gray-700">
          {metrics.breakSuggestion}
        </p>
      </CardContent>
    </Card>
  );
};

export default SedentaryMetricsCard;
