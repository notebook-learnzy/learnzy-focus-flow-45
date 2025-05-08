
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MeditationOverlayProps {
  duration?: number; // Duration in seconds, default 60
  onComplete: () => void;
  onSkip: () => void;
  className?: string;
}

const MeditationOverlay = ({
  duration = 60,
  onComplete,
  onSkip,
  className
}: MeditationOverlayProps) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate progress percentage
  const progressPercentage = ((duration - timeRemaining) / duration) * 100;

  useEffect(() => {
    if (timeRemaining <= 0) {
      onComplete();
      return;
    }

    // Only count down if not paused
    if (!isPaused) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isPaused, onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
      className
    )}>
      <div className="w-4/5 max-w-2xl bg-white rounded-lg p-6 shadow-lg animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Pre-Quiz Focus Meditation</h3>
          <Button variant="ghost" size="sm" onClick={onSkip}>
            <X className="h-4 w-4" />
          </Button>
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

export default MeditationOverlay;
