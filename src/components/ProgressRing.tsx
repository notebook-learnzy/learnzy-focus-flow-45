
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  textClassName?: string;
}

const ProgressRing = ({
  progress,
  size = 60,
  strokeWidth = 4,
  className,
  textClassName,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={cn("relative", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-learnzy-purple"
        />
      </svg>
      <div className={cn("absolute inset-0 flex items-center justify-center font-semibold", textClassName)}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressRing;
