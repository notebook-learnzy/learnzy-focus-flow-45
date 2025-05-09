
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { format, addDays } from "date-fns";

const PracticeReport = () => {
  const { subjectId, classId, chapterId, setId } = useParams<{ 
    subjectId: string; 
    classId: string; 
    chapterId: string; 
    setId: string;
  }>();
  
  const navigate = useNavigate();
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  
  // Mock data for the report
  const academicData = {
    accuracy: 75,
    avgTimePerQuestion: 32,
    totalTime: 1440,
    tagBreakdown: [
      { tag: "Cell Structure", score: 90 },
      { tag: "Cell Membrane", score: 65 },
      { tag: "Mitochondria", score: 80 },
      { tag: "Nucleus", score: 70 },
      { tag: "Cytoplasm", score: 85 }
    ],
    bloomLevels: [
      { level: "Remember", score: 85 },
      { level: "Understand", score: 75 },
      { level: "Apply", score: 60 },
      { level: "Analyze", score: 50 },
      { level: "Evaluate", score: 30 },
      { level: "Create", score: 20 }
    ]
  };
  
  const mentalData = {
    averageFocus: 78,
    highAnxietyQuestions: [7, 8, 9],
    lowestFocusQuestion: 15,
    focusTimeline: Array(20).fill(0).map((_, i) => ({
      question: i + 1,
      focus: Math.floor(Math.random() * 40) + 60
    }))
  };
  
  // Generate scheduled dates for Sets B-E
  const generateScheduleDates = () => {
    const schedules = [
      { setId: "B", days: 7 },
      { setId: "C", days: 14 },
      { setId: "D", days: 21 },
      { setId: "E", days: 49 }
    ];
    
    const today = new Date();
    return schedules.map(schedule => ({
      setId: schedule.setId,
      date: addDays(today, schedule.days),
      dateStr: format(addDays(today, schedule.days), "EEEE, MMMM d, yyyy")
    }));
  };
  
  const scheduledDates = generateScheduleDates();
  
  const handleBackToHome = () => {
    setShowScheduleDialog(true);
  };
  
  const handleAddToCalendar = () => {
    // In a real app, we would call an API to add events to the calendar
    // addEventsToCalendar(scheduledDates);
    
    // Navigate back to dashboard
    setShowScheduleDialog(false);
    navigate("/dashboard");
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate(`/subject/${subjectId}/class/${classId}`)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Chapters
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Performance Report: Set {setId}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
            <CardDescription>Your score and time metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-learnzy-purple">
                  {academicData.accuracy}%
                </div>
                <div className="text-sm text-gray-500">Accuracy</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-learnzy-purple">
                  {academicData.avgTimePerQuestion}s
                </div>
                <div className="text-sm text-gray-500">Avg Time/Question</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Tag Breakdown</h4>
              <div className="space-y-2">
                {academicData.tagBreakdown.map(tag => (
                  <div key={tag.tag}>
                    <div className="flex justify-between text-sm">
                      <span>{tag.tag}</span>
                      <span>{tag.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-learnzy-purple h-2 rounded-full" 
                        style={{ width: `${tag.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Bloom's Taxonomy Mastery</h4>
              <div className="space-y-2">
                {academicData.bloomLevels.map(level => (
                  <div key={level.level}>
                    <div className="flex justify-between text-sm">
                      <span>{level.level}</span>
                      <span>{level.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-learnzy-orange h-2 rounded-full" 
                        style={{ width: `${level.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mental Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Mental Performance</CardTitle>
            <CardDescription>Your focus and mindfulness metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
              <div className="text-3xl font-bold text-learnzy-purple">
                {mentalData.averageFocus}%
              </div>
              <div className="text-sm text-gray-500">Average Focus Score</div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Focus Timeline</h4>
              <div className="h-32 bg-gray-50 rounded-lg p-2">
                <div className="flex h-full items-end">
                  {mentalData.focusTimeline.map((point, i) => (
                    <div 
                      key={i} 
                      className="flex-1 mx-0.5"
                      style={{ height: `${point.focus}%` }}
                    >
                      <div 
                        className={`w-full h-full rounded-sm ${
                          point.focus > 80 ? 'bg-green-500' : 
                          point.focus > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Q1</span>
                <span>Q10</span>
                <span>Q20</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-sm font-medium text-amber-800">
                  Highest anxiety detected on questions 7-9
                </p>
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm font-medium text-red-800">
                  Lowest focus detected on question 15
                </p>
              </div>
              {mentalData.averageFocus < 70 && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    Try a 2-minute breathing exercise before your next session
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button size="lg" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </div>
      
      {/* Revision Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your next revision is scheduled!</DialogTitle>
            <DialogDescription>
              We've created a spaced revision schedule to help you retain what you've learned.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium mb-3">Upcoming practice sessions:</h3>
            <div className="space-y-3">
              {scheduledDates.map((schedule) => (
                <div key={schedule.setId} className="flex items-center p-2 bg-gray-50 rounded-md">
                  <div className="w-8 h-8 bg-learnzy-purple text-white rounded-full flex items-center justify-center mr-3">
                    {schedule.setId}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Set {schedule.setId}</p>
                    <p className="text-xs text-gray-500">{schedule.dateStr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Later
            </Button>
            <Button onClick={handleAddToCalendar} className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Add to Calendar</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PracticeReport;
