
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronRight, GraduationCap } from "lucide-react";
import { Subject, Chapter, Task, Suggestion, SedentaryMetrics, SleepMetrics } from "@/types";
import SubjectCard from "@/components/SubjectCard";
import ChapterCard from "@/components/ChapterCard";
import MistakeNotebook from "@/components/MistakeNotebook";
import SocialLearning from "@/components/SocialLearning";
import CalendarWidget from "@/components/CalendarWidget";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import SleepMetricsCard from "@/components/SleepMetricsCard";
import SedentaryMetricsCard from "@/components/SedentaryMetricsCard";
import SuggestionBanner from "@/components/SuggestionBanner";
import ShivAssistant from "@/components/ShivAssistant";

interface SelfStudyModeProps {
  subjects: Subject[];
  chapters: Chapter[];
  tasks: Task[];
  activeSuggestion: Suggestion;
  latestSleepMetric: SleepMetrics;
  sedentaryMetrics: SedentaryMetrics;
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  handleOpenAssistant: () => void;
  handleAssistantFullPage: () => void;
  handleViewSubject: (subjectId: string) => void;
}

const SelfStudyMode = ({
  subjects,
  chapters,
  tasks,
  activeSuggestion,
  latestSleepMetric,
  sedentaryMetrics,
  assistantOpen,
  setAssistantOpen,
  handleOpenAssistant,
  handleAssistantFullPage,
  handleViewSubject
}: SelfStudyModeProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <SuggestionBanner suggestion={activeSuggestion} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Subjects</h2>
              <Button onClick={() => handleViewSubject('botany')} className="bg-learnzy-purple">
                View Botany <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject} 
                  onClick={() => handleViewSubject(subject.id)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Practice</h2>
              <Button className="bg-learnzy-orange hover:bg-learnzy-orange/90">
                Start Practice
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {chapters
                .sort((a, b) => new Date(b.lastPracticed || "").getTime() - new Date(a.lastPracticed || "").getTime())
                .slice(0, 6)
                .map((chapter) => (
                  <ChapterCard key={chapter.id} chapter={chapter} />
                ))}
            </div>
          </div>
          
          <MistakeNotebook />
          
          <SocialLearning />
        </div>
        
        <div className="space-y-4">
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
          <FocusScoreGauge />
          <SleepMetricsCard metrics={latestSleepMetric} />
          <SedentaryMetricsCard metrics={sedentaryMetrics} />
        </div>
      </div>
      
      {/* Assistant Dialog */}
      <Dialog open={assistantOpen} onOpenChange={setAssistantOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <ShivAssistant onClose={() => setAssistantOpen(false)} />
          <div className="mt-2 text-center">
            <Button variant="link" onClick={handleAssistantFullPage}>
              Open in full page
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelfStudyMode;
