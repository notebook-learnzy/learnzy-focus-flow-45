
import { SessionReport } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface MentalWellnessReportProps {
  report: SessionReport;
  className?: string;
}

const MentalWellnessReport = ({ report, className }: MentalWellnessReportProps) => {
  // Transform the timeline data for the chart
  const timelineData = report.focus_timeline.map((point, index) => ({
    question: index + 1,
    focus: point.focus_score,
    isCorrect: point.is_correct
  }));
  
  // Get focus score color based on value
  const getFocusScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };
  
  // Generate wellness recommendations based on focus score
  const getWellnessRecommendations = (score: number) => {
    if (score < 50) {
      return [
        "Consider a longer break before your next study session",
        "Try a 5-minute guided meditation to reset your focus",
        "Check your study environment for distractions"
      ];
    } else if (score < 70) {
      return [
        "Take a short break before continuing your studies",
        "Try alternating between different subjects to maintain focus",
        "A quick breathing exercise might help restore focus"
      ];
    } else {
      return [
        "Great focus! Remember to take regular breaks to maintain it",
        "Try maintaining this focus level with timed study sessions",
        "Consider scheduling complex topics during your high-focus periods"
      ];
    }
  };
  
  const recommendations = getWellnessRecommendations(report.overall_focus_score);

  // Custom dot renderer for the line chart
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill={payload.isCorrect ? "#4ade80" : "#f87171"} 
      />
    );
  };

  // Custom active dot renderer for the line chart
  const renderActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={8} 
        fill={payload.isCorrect ? "#4ade80" : "#f87171"} 
      />
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Mental Wellness Report</span>
          <span className={cn("font-bold", getFocusScoreColor(report.overall_focus_score))}>
            Score: {report.overall_focus_score}/100
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timelineData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" label={{ value: 'Question', position: 'insideBottomRight', offset: 0 }} />
              <YAxis domain={[0, 100]} label={{ value: 'Focus', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${name === 'focus' ? '%' : ''}`, 
                  name === 'focus' ? 'Focus Score' : name
                ]}
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#8884d8"
                dot={renderDot}
                activeDot={renderActiveDot}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="bg-blue-50 p-3 rounded-md text-sm">
                {rec}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-400"></span>
            <span>Correct answer</span>
            <span className="h-3 w-3 rounded-full bg-red-400 ml-3"></span>
            <span>Incorrect answer</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentalWellnessReport;
