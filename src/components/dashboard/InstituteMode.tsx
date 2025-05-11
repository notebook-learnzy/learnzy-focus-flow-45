
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import SuggestionBanner from "@/components/SuggestionBanner";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import SedentaryMetricsCard from "@/components/SedentaryMetricsCard";
import SleepMetricsCard from "@/components/SleepMetricsCard";
import CalendarWidget from "@/components/CalendarWidget";
import { Task, Suggestion, SedentaryMetrics, SleepMetrics } from "@/types";

interface InstituteModeProps {
  activeSuggestion: Suggestion;
  tasks: Task[];
  instituteAssignments: any[];
  announcements: any[];
  latestSleepMetric: SleepMetrics;
  sedentaryMetrics: SedentaryMetrics;
  handleOpenAssistant: () => void;
}

const InstituteMode = ({
  activeSuggestion,
  tasks,
  instituteAssignments,
  announcements,
  latestSleepMetric,
  sedentaryMetrics,
  handleOpenAssistant
}: InstituteModeProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Assignments Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {instituteAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" /> Due: {assignment.deadline}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-learnzy-purple">
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-gray-50 rounded-md p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{announcement.title}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <SuggestionBanner suggestion={activeSuggestion} />
        </div>
        
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-learnzy-purple/10 to-learnzy-purple/5 border-learnzy-purple/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-learnzy-purple" />
                Shiv Assistant
              </CardTitle>
              <CardDescription>Your personalized NEET guide</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Ask Shiv about your progress, revision tips, or study plans tailored for NEET preparation.</p>
              <Button onClick={handleOpenAssistant} className="w-full">
                Chat with Shiv
              </Button>
            </CardContent>
          </Card>
          
          <CalendarWidget tasks={tasks} />
          <div className="grid grid-cols-1 gap-4">
            <FocusScoreGauge />
            <SleepMetricsCard metrics={latestSleepMetric} />
            <SedentaryMetricsCard metrics={sedentaryMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteMode;
