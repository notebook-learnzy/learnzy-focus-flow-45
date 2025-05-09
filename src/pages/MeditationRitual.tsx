
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const MeditationRitual = () => {
  const { chapterId, setId } = useParams();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = ((60 - timeRemaining) / 60) * 100;
  
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleComplete();
      return;
    }
    
    if (!isPaused) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isPaused]);
  
  const handleComplete = () => {
    // In a real app, we would log to the database that meditation was completed
    console.log("Logging meditation completion", { chapterId, setId, skipped: false });
    
    toast({
      title: "Meditation completed",
      description: "You're now ready to start your practice session with improved focus.",
    });
    
    // Navigate to the actual practice
    navigate(`/practice/${chapterId}`);
  };
  
  const handleSkip = () => {
    // In a real app, we would log to the database that meditation was skipped
    console.log("Logging meditation skip", { chapterId, setId, skipped: true });
    
    toast({
      title: "Meditation skipped",
      description: "Remember that meditation can help improve your focus and performance.",
      variant: "destructive",
    });
    
    // Navigate to the actual practice
    navigate(`/practice/${chapterId}`);
  };
  
  return (
    <div className="container mx-auto max-w-3xl min-h-screen flex items-center justify-center py-12">
      <Card className="w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Pre-Practice Meditation</h1>
          <p className="text-gray-500">Take a moment to center yourself before your practice session</p>
        </div>
        
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          
          <p className="text-lg text-center max-w-md mb-6">
            Breathe in slowly through your nose... hold... and exhale through your mouth.
            Clear your mind and focus on the present moment.
          </p>
        </div>
        
        <div className="space-y-6 max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">{timeRemaining}s remaining</span>
            <Button 
              variant="outline" 
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleSkip}>
              Skip Meditation
            </Button>
            <Button onClick={handleComplete}>
              Complete Early
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeditationRitual;
