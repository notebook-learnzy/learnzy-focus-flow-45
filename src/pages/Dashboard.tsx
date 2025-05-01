
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { subjects, chapters, tasks, suggestions, instituteAssignments, announcements } from "@/data/mockData";
import SubjectCard from "@/components/SubjectCard";
import ChapterCard from "@/components/ChapterCard";
import CalendarWidget from "@/components/CalendarWidget";
import SuggestionBanner from "@/components/SuggestionBanner";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ChevronRight, Clock } from "lucide-react";

const Dashboard = () => {
  const { mode } = useAppContext();
  const [activeSuggestion] = useState(suggestions[0]);
  
  const renderInstituteMode = () => (
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
          <CalendarWidget tasks={tasks} />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Focus Status</CardTitle>
              <CardDescription>Your current focus level</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <FocusScoreGauge />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
  
  const renderSelfStudyMode = () => (
    <div className="space-y-6 animate-fade-in">
      <SuggestionBanner suggestion={activeSuggestion} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Subjects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
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
        </div>
        
        <div className="space-y-6">
          <CalendarWidget tasks={tasks} />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Focus Status</CardTitle>
              <CardDescription>Your current focus level</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <FocusScoreGauge />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {mode === "institute" ? renderInstituteMode() : renderSelfStudyMode()}
    </div>
  );
};

export default Dashboard;
