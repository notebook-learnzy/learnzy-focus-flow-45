
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Moon, Activity, Clock, Heart } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from "@/components/ui/badge";

// Mock sleep data
const sleepData = {
  score: 80,
  quality: "Good",
  timeAsleep: { hours: 7, minutes: 52 },
  efficiency: 92,
  date: "2025-05-08",
  deepSleep: 92,
  remSleep: 108,
  lightSleep: 272,
  awake: 15,
  stressScore: {
    beforeSleep: 49,
    duringSleep: 39
  },
  heartRateData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: 55 + Math.floor(Math.random() * 30)
  })),
  sleepStages: [
    { time: "00:00", stage: "awake" },
    { time: "00:15", stage: "light" },
    { time: "00:45", stage: "deep" },
    { time: "01:30", stage: "light" },
    { time: "02:00", stage: "rem" },
    { time: "02:30", stage: "light" },
    { time: "03:00", stage: "deep" },
    { time: "03:45", stage: "light" },
    { time: "04:30", stage: "rem" },
    { time: "05:00", stage: "light" },
    { time: "05:30", stage: "deep" },
    { time: "06:15", stage: "light" },
    { time: "07:00", stage: "rem" },
    { time: "07:30", stage: "light" },
    { time: "08:00", stage: "awake" }
  ]
};

// Map sleep stages to colors
const getSleepStageColor = (stage: string) => {
  switch(stage) {
    case 'deep': return '#3949AB';
    case 'rem': return '#8167F8';
    case 'light': return '#A594FF';
    case 'awake': return '#E0E0E0';
    default: return '#E0E0E0';
  }
};

const SleepVisualization = () => {
  const [timeRange, setTimeRange] = React.useState("week");
  
  // Convert sleepStages to chart data
  const sleepStageData = sleepData.sleepStages.map((stage, index) => {
    const hourMinute = stage.time.split(':');
    const hour = parseInt(hourMinute[0]);
    const minute = parseInt(hourMinute[1]);
    const position = hour + minute/60;
    
    return {
      position,
      displayTime: stage.time,
      stage: stage.stage,
      value: stage.stage === 'deep' ? 3 : stage.stage === 'rem' ? 2 : stage.stage === 'light' ? 1 : 0
    };
  });
  
  // Calculate total sleep time
  const formatSleepTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const totalSleepMinutes = sleepData.deepSleep + sleepData.remSleep + sleepData.lightSleep;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Moon size={18} className="mr-2" />
            Sleep Analysis
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-28 h-7 text-xs">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last Night</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="relative">
              <svg className="w-28 h-28">
                <circle
                  className="text-gray-200"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="56"
                  cy="56"
                />
                <circle
                  className="text-learnzy-purple"
                  strokeWidth="6"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (sleepData.score / 100) * 251.2}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="56"
                  cy="56"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-learnzy-purple">
                  {sleepData.score}
                </span>
                <span className="text-sm text-learnzy-purple">
                  {sleepData.quality}
                </span>
              </div>
            </div>
            <div className="mt-1 text-sm">Sleep Score</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center text-xl font-semibold">
                <Clock size={16} className="mr-1 text-learnzy-orange" />
                <span>
                  {sleepData.timeAsleep.hours}
                  <span className="text-sm font-normal">h </span>
                  {sleepData.timeAsleep.minutes}
                  <span className="text-sm font-normal">m</span>
                </span>
              </div>
              <div className="text-xs mt-1 text-gray-500">Time Asleep</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center text-xl font-semibold">
                <Activity size={16} className="mr-1 text-green-500" />
                <span>
                  {sleepData.efficiency}
                  <span className="text-sm font-normal">%</span>
                </span>
              </div>
              <div className="text-xs mt-1 text-gray-500">Sleep Efficiency</div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="stages">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="stages">Sleep Stages</TabsTrigger>
            <TabsTrigger value="heart">Heart Rate</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stages" className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sleepStageData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis 
                      dataKey="position" 
                      type="number"
                      domain={[0, 24]}
                      ticks={[0, 2, 4, 6, 8]}
                      tickFormatter={(tick) => `${tick}:00`}
                    />
                    <defs>
                      <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3949AB" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3949AB" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="rem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8167F8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8167F8" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="light" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A594FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#A594FF" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="stepAfter"
                      dataKey="value"
                      stroke="none"
                      fill="url(#deep)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-4 gap-1 mt-2">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full bg-[#E0E0E0] mr-1"></div>
                  <span>Awake</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full bg-[#A594FF] mr-1"></div>
                  <span>Light</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full bg-[#8167F8] mr-1"></div>
                  <span>REM</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 rounded-full bg-[#3949AB] mr-1"></div>
                  <span>Deep</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-sm font-medium">Deep Sleep</div>
                <div className="text-xl font-semibold text-[#3949AB]">
                  {formatSleepTime(sleepData.deepSleep)}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((sleepData.deepSleep / totalSleepMinutes) * 100)}%
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-sm font-medium">REM Sleep</div>
                <div className="text-xl font-semibold text-[#8167F8]">
                  {formatSleepTime(sleepData.remSleep)}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((sleepData.remSleep / totalSleepMinutes) * 100)}%
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-sm font-medium">Light Sleep</div>
                <div className="text-xl font-semibold text-[#A594FF]">
                  {formatSleepTime(sleepData.lightSleep)}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((sleepData.lightSleep / totalSleepMinutes) * 100)}%
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="heart">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-lg font-medium">
                    {sleepData.heartRateData[sleepData.heartRateData.length - 1].value}
                  </span>
                  <span className="text-xs ml-1">bpm</span>
                </div>
                <span className="text-xs text-gray-600">
                  Avg: {Math.round(sleepData.heartRateData.reduce((acc, item) => acc + item.value, 0) / sleepData.heartRateData.length)} bpm
                </span>
              </div>
              
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sleepData.heartRateData}>
                    <XAxis 
                      dataKey="hour"
                      tickFormatter={(hour) => `${hour}:00`}
                      interval={3}
                    />
                    <YAxis domain={[40, 110]} hide />
                    <RechartsTooltip
                      formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                      labelFormatter={(hour) => `${hour}:00`}
                    />
                    <defs>
                      <linearGradient id="heartRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4081" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF4081" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#FF4081" 
                      strokeWidth={2}
                      fill="url(#heartRate)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stress">
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <div className="text-sm">Before Sleep</div>
                  <div className="flex items-center">
                    <span className="font-medium text-blue-600">{sleepData.stressScore.beforeSleep}</span>
                    <Badge variant="outline" className="ml-1 py-0 h-5 bg-blue-50">Good</Badge>
                  </div>
                </div>
                <Progress value={sleepData.stressScore.beforeSleep} className="h-2 bg-gray-200" />
                
                <div className="flex text-xs text-gray-500 justify-between mt-1">
                  <span>Relaxed</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <div className="text-sm">During Sleep</div>
                  <div className="flex items-center">
                    <span className="font-medium text-green-600">{sleepData.stressScore.duringSleep}</span>
                    <Badge variant="outline" className="ml-1 py-0 h-5 bg-green-50">Good</Badge>
                  </div>
                </div>
                <Progress value={sleepData.stressScore.duringSleep} className="h-2 bg-gray-200" />
                
                <div className="flex text-xs text-gray-500 justify-between mt-1">
                  <span>Relaxed</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SleepVisualization;
