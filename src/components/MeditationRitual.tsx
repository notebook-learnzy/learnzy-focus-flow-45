
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MeditationRitualProps {
  onComplete: () => void;
  onSkip: () => void;
  duration?: number; // in seconds
}

const MeditationRitual = ({ onComplete, onSkip, duration = 60 }: MeditationRitualProps) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = ((duration - timeRemaining) / duration) * 100;
  
  useEffect(() => {
    if (timeRemaining <= 0) {
      toast({
        title: "Meditation Complete",
        description: "Great job! You're now ready to focus on your practice session."
      });
      onComplete();
      return;
    }
    
    if (!isPaused) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isPaused, onComplete]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-4/5 max-w-2xl bg-white rounded-lg p-6 shadow-lg animate-fade-in">
        <h3 className="text-xl font-semibold mb-6">Pre-Quiz Focus Meditation</h3>
        
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
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
            <Button onClick={onComplete}>
              Complete Early
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationRitual;
