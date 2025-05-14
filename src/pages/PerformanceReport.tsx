import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, ChartLine, ArrowLeft, CheckCircle, XCircle, Timer, AlertCircle, Focus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FocusData, SessionReport } from "@/types";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PerformanceOverview from "@/components/PerformanceOverview"
import TimePerQuestionChart from "@/components/TimePerQuestionChart";
import ChapterPerformanceTable from "@/components/ChapterPerformanceTable";

// Normally this would come from an API or context
// Mock data for demonstration
const mockSessionReport: SessionReport = {
  id: "session-123",
  question_set_id: "qs-biology-a",
  date: new Date().toISOString(),
  overall_focus_score: 78,
  focus_timeline: [
    { question_id: "q1", focus_score: 85, time_spent: 45, is_correct: true },
    { question_id: "q2", focus_score: 92, time_spent: 32, is_correct: true },
    { question_id: "q3", focus_score: 65, time_spent: 60, is_correct: false },
    { question_id: "q4", focus_score: 72, time_spent: 55, is_correct: true },
    { question_id: "q5", focus_score: 58, time_spent: 48, is_correct: false },
    { question_id: "q6", focus_score: 79, time_spent: 40, is_correct: true },
    { question_id: "q7", focus_score: 83, time_spent: 37, is_correct: true },
    { question_id: "q8", focus_score: 68, time_spent: 63, is_correct: false },
    { question_id: "q9", focus_score: 88, time_spent: 29, is_correct: true },
    { question_id: "q10", focus_score: 76, time_spent: 42, is_correct: true },
  ],
  meditation_completed: true,
  meditation_skipped: false,
  total_time: 450,
  correct_answers: 7,
  total_questions: 10
};

const getQuestionNumber = (questionId: string): string => {
  return questionId.replace('q', 'Q');
};

const getFocusColor = (score: number): string => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 55) return "text-amber-600";
  return "text-red-600";
};

const getFocusSegmentData = (focusTimeline: FocusData[]) => {
  // Group focus scores by range
  const ranges = [
    { label: "Very High Focus (85-100)", min: 85, max: 100, count: 0 },
    { label: "High Focus (70-84)", min: 70, max: 84, count: 0 },
    { label: "Moderate Focus (55-69)", min: 55, max: 69, count: 0 },
    { label: "Low Focus (0-54)", min: 0, max: 54, count: 0 },
  ];

  focusTimeline.forEach(item => {
    const range = ranges.find(r => item.focus_score >= r.min && item.focus_score <= r.max);
    if (range) range.count++;
  });

  return ranges;
};

const PerformanceReport = () => {
  const { subjectId, chapterId, setId } = useParams<{ subjectId: string; chapterId: string; setId: string; }>();
  const navigate = useNavigate();
  
  // NEW: Load botany session result from Supabase for demo
  const [sessionData, setSessionData] = useState<SessionReport | null>(null);

  useEffect(() => {
    async function getRealSession() {
      if (subjectId?.toLowerCase() === "botany") {
        // Fetch 10 botany questions as "session"
        const { data } = await supabase
          .from("demo")
          .select()
          .eq("Subject", "Botany")
          .limit(10);

        if (data && data.length > 0) {
          // Fake a plausible SessionReport for the demo
          const timeline = (data as any[]).map((q, idx) => ({
            question_id: `db-${q.q_no}`,
            focus_score: 75 + Math.floor(Math.random() * 20) - 10,
            time_spent: 40 + Math.floor(Math.random() * 30),
            is_correct: Math.random() > 0.3,
          }));
          setSessionData({
            id: `session-demo-botany`,
            question_set_id: "qs-botany-a",
            date: new Date().toISOString(),
            overall_focus_score: Math.round(timeline.reduce((acc, q) => acc + q.focus_score, 0)/timeline.length),
            focus_timeline: timeline,
            meditation_completed: true,
            meditation_skipped: false,
            total_time: timeline.reduce((t,x) => t+x.time_spent, 0),
            correct_answers: timeline.filter(x=>x.is_correct).length,
            total_questions: timeline.length,
          });
        }
      }
    }
    getRealSession();
    //eslint-disable-next-line
  }, [subjectId]);

  // Use Supabase result for Botany, fallback to mock if not available
  const report = (subjectId?.toLowerCase() === "botany" && sessionData) ? sessionData : mockSessionReport;
  
  // Calculate metrics
  const scorePercentage = (report.correct_answers / report.total_questions) * 100;
  const timePerQuestion = report.total_time / report.total_questions;
  const averageFocusScore = report.overall_focus_score;
  const focusSegments = getFocusSegmentData(report.focus_timeline);
  
  const chartData = report.focus_timeline.map((item, index) => ({
    name: getQuestionNumber(item.question_id),
    focusScore: item.focus_score,
    correct: item.is_correct ? 100 : 0,
    questionIndex: index + 1
  }));

  const handleContinue = () => {
    navigate(`/subject/${subjectId}`);
  };
  
  const handlePracticeAgain = () => {
    navigate(`/${subjectId}`);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </Button>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Performance Report</h1>
        <p className="text-gray-500">
          Set {setId?.toUpperCase()} • Completed on {new Date(report.date).toLocaleDateString()}
        </p>
      </div>
      
      <PerformanceOverview 
        score={report.correct_answers}
        accuracy={Math.round(scorePercentage)}
        totalScore={report.total_questions * 4} // Assuming 4 points per question
        timeSpent={report.total_time}
        correct={report.correct_answers}
        incorrect={report.total_questions - report.correct_answers}
        unattempted={0 /* Could be calculated if tracked */}
      />
      <TimePerQuestionChart 
        focusTimeline={report.focus_timeline}
        avgTime={Math.round(timePerQuestion)}
        slowerCount={10}
        fasterCount={report.total_questions - 10}
        deviations={[
          { question: 3, description: "A couple has two daughters...", diff: "+147", slower: true },
          { question: 12, description: "Light reaction: Photosystem II...", diff: "-23", slower: false }
        ]}
      />
      <ChapterPerformanceTable
        tagMap={report.focus_timeline.map(q => ({ chapter: "Cell: The Unit of Life", correct: q.is_correct, time: q.time_spent }))}
      />
    </div>
  );
};

export default PerformanceReport;
