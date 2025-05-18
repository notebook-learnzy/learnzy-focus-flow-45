import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Check, Clock, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { biologyChapters, questionSets } from "@/data/mockData";
import ProgressRing from "@/components/ProgressRing";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import SpacedRevisionSchedule from "@/components/SpacedRevisionSchedule";
import { format, addDays } from "date-fns";
import { QuestionSet } from "@/types";

const BiologyChapterDetail = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduledSets, setScheduledSets] = useState<QuestionSet[]>([]);
  
  const chapter = biologyChapters.find(ch => ch.id === chapterId);
  
  // Find the question sets for this chapter
  const chapterSets = questionSets.filter(set => set.chapter_id === chapterId);
  
  if (!chapter) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Chapter not found</h2>
        <Button onClick={() => navigate("/biology")}>Return to Biology</Button>
      </div>
    );
  }
  
  const handleStartSet = (setType: string) => {
    navigate(`/practice/biology/${chapter.id}/set/${setType}/ritual`);
  };
  
  const handleScheduleRevision = () => {
    // Schedule spaced revision for sets B, C, D, E
    const today = new Date();
    
    const newScheduledSets: QuestionSet[] = [
      {
        id: `${chapterId}-B`,
        chapter_id: chapterId!,
        set_type: "B",
        completed_date: null,
        scheduled_date: format(addDays(today, 7), 'yyyy-MM-dd'),
        questions: [], // Would be populated from database
        interval_adjusted: false
      },
      {
        id: `${chapterId}-C`,
        chapter_id: chapterId!,
        set_type: "C", 
        completed_date: null,
        scheduled_date: format(addDays(today, 14), 'yyyy-MM-dd'),
        questions: [], // Would be populated from database
        interval_adjusted: false
      },
      {
        id: `${chapterId}-D`,
        chapter_id: chapterId!,
        set_type: "D",
        completed_date: null,
        scheduled_date: format(addDays(today, 21), 'yyyy-MM-dd'),
        questions: [], // Would be populated from database
        interval_adjusted: false
      },
      {
        id: `${chapterId}-E`,
        chapter_id: chapterId!,
        set_type: "E",
        completed_date: null,
        scheduled_date: format(addDays(today, 35), 'yyyy-MM-dd'),
        questions: [], // Would be populated from database
        interval_adjusted: false
      }
    ];
    
    setScheduledSets(newScheduledSets);
    setShowScheduleDialog(true);
  };
  
  const handleConfirmSchedule = () => {
    toast({
      title: "Revision schedule created!",
      description: "We'll remind you before each scheduled revision session.",
    });
    setShowScheduleDialog(false);
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate(`/biology/class/${chapter.classId}`)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Chapters
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="bg-learnzy-purple/10 p-3 rounded-full mr-4">
            <BookOpen className="h-6 w-6 text-learnzy-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{chapter.name}</h1>
            <p className="text-gray-500">Biology - Class {chapter.classId}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ProgressRing progress={chapter.progress} size={60} />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Question Sets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["A", "B", "C", "D", "E"].map((setType) => {
              const set = chapterSets.find(s => s.set_type === setType);
              const isCompleted = set?.completed_date !== null;
              const isLocked = setType !== "A" && 
                (!chapterSets.find(s => s.set_type === String.fromCharCode(setType.charCodeAt(0) - 1))?.completed_date);
              
              return (
                <div
                  key={setType}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-learnzy-purple/10 h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-learnzy-purple">{setType}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Practice Set {setType}</h3>
                      <p className="text-sm text-gray-500">
                        {isCompleted ? "Completed" : isLocked ? "Locked" : "Available"}
                        {set?.scheduled_date && !isCompleted && 
                          ` - Scheduled for ${new Date(set.scheduled_date).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Check size={12} /> Completed
                      </Badge>
                    ) : null}
                    <Button 
                      className={isCompleted ? "bg-gray-500" : "bg-learnzy-orange hover:bg-learnzy-orange/90"}
                      disabled={isLocked}
                      onClick={() => isCompleted ? handleScheduleRevision() : handleStartSet(setType)}
                    >
                      {isLocked ? <Lock size={16} className="mr-2" /> : null}
                      {isCompleted ? "Schedule Revision" : isLocked ? "Locked" : "Start"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Spaced Revision Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Spaced Revision Schedule</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              Based on cognitive science, we've scheduled your revision sessions for optimal learning retention.
              These sessions will be added to your calendar.
            </p>
            
            <div className="space-y-3">
              {scheduledSets.map((set) => (
                <div key={set.id} className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-medium">Set {set.set_type}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(set.scheduled_date!), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <Badge 
                    className={
                      set.set_type === "B" ? "bg-green-100 text-green-800" : 
                      set.set_type === "C" ? "bg-blue-100 text-blue-800" : 
                      set.set_type === "D" ? "bg-yellow-100 text-yellow-800" : 
                      "bg-red-100 text-red-800"
                    }
                  >
                    {set.set_type === "B" ? "1 week" : 
                     set.set_type === "C" ? "2 weeks" : 
                     set.set_type === "D" ? "3 weeks" : "5 weeks"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full" 
              onClick={handleConfirmSchedule}
            >
              Add to Calendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BiologyChapterDetail;
