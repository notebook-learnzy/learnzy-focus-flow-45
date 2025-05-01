
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface FocusScoreGaugeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const FocusScoreGauge = ({
  size = "md",
  showLabel = true,
  className,
}: FocusScoreGaugeProps) => {
  const { focusScore } = useAppContext();
  
  const getColorClass = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-learnzy-orange";
    return "text-red-500";
  };
  
  const dimensions = {
    sm: {
      size: 60,
      thickness: 4,
      fontSize: "text-xs",
    },
    md: {
      size: 100,
      thickness: 6,
      fontSize: "text-sm",
    },
    lg: {
      size: 150,
      thickness: 8,
      fontSize: "text-lg",
    },
  };
  
  const { size: gaugeSize, thickness, fontSize } = dimensions[size];
  const radius = (gaugeSize - thickness) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (focusScore / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {showLabel && <p className={cn("mb-1 font-medium", fontSize)}>Focus Score</p>}
      <div className="relative">
        <svg
          width={gaugeSize}
          height={gaugeSize}
          viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}
          className="transform -rotate-90"
        >
          <circle
            cx={gaugeSize / 2}
            cy={gaugeSize / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={thickness}
            className="text-gray-200"
          />
          <circle
            cx={gaugeSize / 2}
            cy={gaugeSize / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={getColorClass(focusScore)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", getColorClass(focusScore), size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-3xl")}>
            {focusScore}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FocusScoreGauge;
