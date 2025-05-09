
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const PracticeRitual = () => {
  const { subjectId, classId, chapterId, setId } = useParams<{ 
    subjectId: string; 
    classId: string; 
    chapterId: string; 
    setId: string;
  }>();
  
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute meditation
  const [isPaused, setIsPaused] = useState(false);

  // Calculate progress percentage
  const progressPercentage = ((60 - timeRemaining) / 60) * 100;

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleComplete();
      return;
    }

    // Only count down if not paused
    if (!isPaused) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isPaused]);

  const handleComplete = () => {
    // In a real app, we would log completion to Supabase here
    // logMeditationCompletion(false, 60);
    
    toast({
      title: "Meditation Completed",
      description: "Great job! You're ready to focus on your practice session."
    });
    
    // Navigate to the practice page
    navigate(`/practice/${subjectId}/${classId}/${chapterId}/set/${setId}`);
  };

  const handleSkip = () => {
    // In a real app, we would log skipped to Supabase here
    // logMeditationCompletion(true, 60 - timeRemaining);
    
    toast({
      title: "Meditation Skipped",
      description: "Remember, short mindfulness exercises can help improve focus.",
      variant: "default"
    });
    
    // Navigate to the practice page
    navigate(`/practice/${subjectId}/${classId}/${chapterId}/set/${setId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-4/5 max-w-2xl bg-white rounded-lg p-6 shadow-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Pre-Quiz Focus Meditation</h3>
        </div>
        
        <div className="rounded-lg bg-blue-50 p-10 mb-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
            <p className="text-center text-blue-800 mb-4">
              Take a deep breath in... and exhale slowly. Allow your mind to clear and focus on the present moment.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>{timeRemaining}s remaining</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={handleSkip}>
              Skip
            </Button>
            <Button onClick={handleComplete}>
              Complete Early
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeRitual;
