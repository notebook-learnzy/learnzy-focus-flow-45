
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Watch, MoveUp, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from "@/lib/utils";

// Mock sedentary data
const sedentaryData = {
  totalSittingTime: 340, // minutes
  lastBreak: '2025-05-10T14:30:00',
  breakIntervals: [
    { time: '08:00', duration: 5 },
    { time: '09:30', duration: 8 },
    { time: '11:15', duration: 10 },
    { time: '14:30', duration: 7 },
  ],
  hourlyActivity: [
    { hour: '08:00', movementScore: 65, sittingMinutes: 42 },
    { hour: '09:00', movementScore: 30, sittingMinutes: 55 },
    { hour: '10:00', movementScore: 45, sittingMinutes: 49 },
    { hour: '11:00', movementScore: 75, sittingMinutes: 28 },
    { hour: '12:00', movementScore: 85, sittingMinutes: 20 },
    { hour: '13:00', movementScore: 35, sittingMinutes: 52 },
    { hour: '14:00', movementScore: 40, sittingMinutes: 50 },
    { hour: '15:00', movementScore: 50, sittingMinutes: 44 },
  ],
  activityIntensity: {
    low: 180,
    moderate: 90,
    high: 30
  }
};

const SedentaryActivity = () => {
  const [showBreakReminder, setShowBreakReminder] = React.useState(true);
  
  // Convert minutes to hours and minutes
  const hours = Math.floor(sedentaryData.totalSittingTime / 60);
  const minutes = sedentaryData.totalSittingTime % 60;
  
  // Determine color based on sitting time
  const getSittingTimeColor = () => {
    if (sedentaryData.totalSittingTime < 180) return "text-green-500"; // Less than 3h
    if (sedentaryData.totalSittingTime < 360) return "text-orange-500"; // 3-6h
    return "text-red-500"; // More than 6h
  };
  
  // Calculate time since last break
  const getTimeSinceLastBreak = () => {
    const lastBreak = new Date(sedentaryData.lastBreak);
    const now = new Date();
    const diffMs = now.getTime() - lastBreak.getTime();
    const diffMin = Math.round(diffMs / 60000);
    return diffMin;
  };
  
  const timeSinceLastBreak = getTimeSinceLastBreak();
  
  // Calculate break suggestion 
  const breakSuggestion = React.useMemo(() => {
    if (timeSinceLastBreak < 30) {
      return "Good job on taking breaks! Next suggested break in 30 minutes.";
    } else if (timeSinceLastBreak < 60) {
      return "You've been sitting for a while. Consider taking a 5-minute break soon.";
    } else {
      return "It's been over an hour since your last break! Time to stand up and stretch.";
    }
  }, [timeSinceLastBreak]);
  
  // Format percentage of sitting vs active time
  const totalTime = sedentaryData.totalSittingTime + 
    sedentaryData.activityIntensity.low + 
    sedentaryData.activityIntensity.moderate + 
    sedentaryData.activityIntensity.high;
  
  const sittingPercentage = Math.round((sedentaryData.totalSittingTime / totalTime) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Clock size={18} className="mr-2" />
          Sedentary Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showBreakReminder && timeSinceLastBreak > 45 && (
          <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <Watch className="h-5 w-5 text-orange-500 mr-2" />
              <p className="text-sm">
                <span className="font-medium">Break reminder: </span> 
                You've been sitting for {timeSinceLastBreak} minutes
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8"
              onClick={() => setShowBreakReminder(false)}
            >
              Dismiss
            </Button>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className={cn("text-2xl font-semibold", getSittingTimeColor())}>
              {hours}h {minutes}m
            </span>
            <p className="text-xs text-gray-500">Total sitting time today</p>
          </div>
          
          <div className="text-right">
            <span className="text-sm font-medium">
              Last break: {new Date(sedentaryData.lastBreak).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <p className="text-xs text-gray-500">
              {timeSinceLastBreak} min ago
            </p>
          </div>
        </div>
        
        <Progress 
          value={sittingPercentage} 
          className={cn("h-2", 
            sedentaryData.totalSittingTime < 180 ? "bg-green-500" : 
            sedentaryData.totalSittingTime < 360 ? "bg-orange-500" : 
            "bg-red-500"
          )}
        />
        
        <p className="text-sm text-gray-700">
          {breakSuggestion}
        </p>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Hourly Movement</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sedentaryData.hourlyActivity}
                  margin={{ top: 10, right: 0, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="hour"
                    tickFormatter={(hour) => hour.split(':')[0]}
                  />
                  <defs>
                    <linearGradient id="movementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="movementScore" 
                    stroke="#4CAF50" 
                    fillOpacity={1}
                    fill="url(#movementGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 p-2 rounded-md">
            <div className="text-sm font-medium">Low</div>
            <div className="text-xl font-semibold text-green-600">
              {Math.floor(sedentaryData.activityIntensity.low / 60)}h {sedentaryData.activityIntensity.low % 60}m
            </div>
          </div>
          <div className="bg-yellow-50 p-2 rounded-md">
            <div className="text-sm font-medium">Moderate</div>
            <div className="text-xl font-semibold text-yellow-600">
              {Math.floor(sedentaryData.activityIntensity.moderate / 60)}h {sedentaryData.activityIntensity.moderate % 60}m
            </div>
          </div>
          <div className="bg-red-50 p-2 rounded-md">
            <div className="text-sm font-medium">High</div>
            <div className="text-xl font-semibold text-red-600">
              {Math.floor(sedentaryData.activityIntensity.high / 60)}h {sedentaryData.activityIntensity.high % 60}m
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-100 flex justify-center">
          <Button variant="outline" className="w-full" size="sm">
            <Timer className="w-4 h-4 mr-2" />
            Start Break Timer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SedentaryActivity;
