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
  
  // Normally this would be fetched based on the params
  const report = mockSessionReport;
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="academic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="academic">
                <BookOpen className="h-4 w-4 mr-2" />
                Academic Performance
              </TabsTrigger>
              <TabsTrigger value="mental">
                <Brain className="h-4 w-4 mr-2" />
                Mental Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Score Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{Math.round(scorePercentage)}%</div>
                      <div className="text-gray-500">
                        {report.correct_answers} of {report.total_questions} correct
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={scorePercentage} className="h-2 mb-6" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Timer className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">Time Spent</span>
                      </div>
                      <div className="text-xl font-semibold">
                        {Math.floor(report.total_time / 60)}m {report.total_time % 60}s
                      </div>
                      <div className="text-xs text-gray-500">
                        ~{Math.round(timePerQuestion)}s per question
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Focus className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">Focus Score</span>
                      </div>
                      <div className="text-xl font-semibold">
                        {averageFocusScore}/100
                      </div>
                      <div className="text-xs text-gray-500">
                        {report.meditation_completed ? "Meditation completed" : "Meditation skipped"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Question Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report.focus_timeline.map((item, index) => (
                      <div key={item.question_id} className="flex items-center gap-3 p-2 border-b">
                        <div className="font-medium w-8">{getQuestionNumber(item.question_id)}</div>
                        {item.is_correct ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className={item.is_correct ? "text-green-700" : "text-red-700"}>
                              {item.is_correct ? "Correct" : "Incorrect"}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {item.time_spent}s
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="text-xs mr-2">Focus:</div>
                            <Progress 
                              value={item.focus_score} 
                              className="h-1.5" 
                              className={cn(
                                "h-1.5",
                                item.focus_score >= 85 ? "bg-green-500" :
                                item.focus_score >= 70 ? "bg-blue-500" :
                                item.focus_score >= 55 ? "bg-amber-500" :
                                "bg-red-500"
                              )}
                            />
                            <span className={`ml-2 text-xs ${getFocusColor(item.focus_score)}`}>
                              {item.focus_score}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mental" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Focus Analysis</CardTitle>
                  <CardDescription>How your focus varied during the test</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <ReferenceLine y={70} stroke="#8884d8" strokeDasharray="3 3" label="Threshold" />
                        <Line 
                          type="monotone" 
                          dataKey="focusScore" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          name="Focus Score" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="correct" 
                          stroke="#82ca9d" 
                          strokeWidth={2} 
                          dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }} 
                          name="Correct" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {focusSegments.map((segment, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className={`w-3 h-3 rounded-full ${
                            index === 0 ? "bg-green-500" :
                            index === 1 ? "bg-blue-500" :
                            index === 2 ? "bg-amber-500" :
                            "bg-red-500"
                          }`} 
                        />
                        <div className="flex-1 text-sm">
                          {segment.label}
                        </div>
                        <div className="font-medium">
                          {segment.count}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Focus Dipped on Questions 3, 5 and 8</p>
                        <p className="text-xs text-gray-500">
                          Consider taking a short break after every 3-4 questions to maintain focus.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Meditation Improved Performance</p>
                        <p className="text-xs text-gray-500">
                          The meditation session before the test helped improve your focus scores.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wellness Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Mental Pattern Analysis</h3>
                      <div className="space-y-2 text-sm">
                        <p>You tend to be more focused at the beginning of test sessions.</p>
                        <p>Your focus drops noticeably after question 5, suggesting a potential attention span of 15-20 minutes.</p>
                        <p>Correct answers correlate strongly with higher focus scores.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Focus Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50">Morning performer</Badge>
                        <Badge variant="outline" className="bg-amber-50">Mid-session dips</Badge>
                        <Badge variant="outline" className="bg-green-50">Meditation responsive</Badge>
                        <Badge variant="outline" className="bg-purple-50">Strong starter</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-learnzy-purple/10 p-2 rounded-full">
                  <ChartLine className="h-4 w-4 text-learnzy-purple" />
                </div>
                <div>
                  <p className="font-medium text-sm">Practice Similar Questions</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your performance suggests you should practice more questions related to the topics you missed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-learnzy-purple/10 p-2 rounded-full">
                  <Brain className="h-4 w-4 text-learnzy-purple" />
                </div>
                <div>
                  <p className="font-medium text-sm">Take Short Study Breaks</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Consider the Pomodoro technique with 25min study and 5min break to maintain focus.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-learnzy-purple/10 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-learnzy-purple" />
                </div>
                <div>
                  <p className="font-medium text-sm">Review Weak Topics</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Topics related to questions 3, 5, and 8 need special attention.
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button onClick={handlePracticeAgain} className="w-full mb-2">
                  Practice Again
                </Button>
                <Button onClick={handleContinue} variant="outline" className="w-full">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;
