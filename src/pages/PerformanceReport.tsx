
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Brain, GraduationCap, ArrowRight, Calendar } from "lucide-react";
import { biologyChapters, completedSets } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PerformanceReport = () => {
  const { chapterId, setId } = useParams();
  const navigate = useNavigate();
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  
  // In a real app, we would fetch the actual completion data from the database
  const chapter = biologyChapters.find(ch => ch.id === chapterId);
  const completionData = completedSets[0]; // Using sample data
  
  if (!chapter) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Chapter not found</h2>
        <Button onClick={() => navigate("/biology")}>Return to Biology</Button>
      </div>
    );
  }
  
  // Sample focus data over questions
  const focusData = [
    { question: 1, focus: 85, isCorrect: true },
    { question: 2, focus: 78, isCorrect: true },
    { question: 3, focus: 65, isCorrect: false },
    { question: 4, focus: 62, isCorrect: false },
    { question: 5, focus: 75, isCorrect: true },
    { question: 6, focus: 88, isCorrect: true },
    { question: 7, focus: 82, isCorrect: true },
    { question: 8, focus: 70, isCorrect: false },
    { question: 9, focus: 75, isCorrect: true },
    { question: 10, focus: 85, isCorrect: true }
  ];
  
  // Sample bloom taxonomy data
  const bloomData = [
    { name: "Remember", score: 85 },
    { name: "Understand", score: 70 },
    { name: "Apply", score: 65 },
    { name: "Analyze", score: 55 },
    { name: "Evaluate", score: 40 },
    { name: "Create", score: 30 }
  ];
  
  // Sample topic performance data
  const topicData = [
    { topic: "Characteristics of Life", score: 90 },
    { topic: "Taxonomy", score: 75 },
    { topic: "Nomenclature", score: 80 },
    { topic: "Classification", score: 65 }
  ];
  
  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "Revision schedule has been added to your calendar."
    });
    setShowScheduleDialog(false);
    navigate("/biology");
  };
  
  const handleFinish = () => {
    setShowScheduleDialog(true);
  };
  
  // Sample focus insights based on focus data
  const getFocusInsights = () => {
    const lowestFocus = [...focusData].sort((a, b) => a.focus - b.focus)[0];
    const anxietySpot = focusData.findIndex((data, i, arr) => 
      i > 0 && i < arr.length - 1 && data.focus < arr[i-1].focus && data.focus < arr[i+1].focus
    );
    
    return [
      `Your focus was lowest on question ${lowestFocus.question} (${lowestFocus.focus}%)`,
      anxietySpot !== -1 ? `You may have experienced anxiety around question ${focusData[anxietySpot].question}` : null,
      "Your focus was higher on correctly answered questions"
    ].filter(Boolean);
  };
  
  const insights = getFocusInsights();
  
  return (
    <>
      <div className="container mx-auto max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-500"
          onClick={() => navigate(`/biology/chapter/${chapterId}`)}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Chapter
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">Performance Report: {chapter.name} - Set {setId}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-learnzy-purple" />
                Academic Performance
              </CardTitle>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {completionData?.score || 75}%
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Topic Performance</h3>
                <div className="space-y-2">
                  {topicData.map((topic) => (
                    <div key={topic.topic} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{topic.topic}</span>
                        <span className="font-medium">{topic.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-learnzy-purple h-2 rounded-full" 
                          style={{ width: `${topic.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Bloom Taxonomy Levels</h3>
                <div className="space-y-2">
                  {bloomData.map((level) => (
                    <div key={level.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{level.name}</span>
                        <span className="font-medium">{level.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-learnzy-orange h-2 rounded-full" 
                          style={{ width: `${level.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Recommended Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Revise "Taxonomy" concepts
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Practice 10 more "Analyze" level questions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-learnzy-purple" />
                Mental Performance
              </CardTitle>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Focus: {completionData?.focus_score || 78}%
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Focus Timeline</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={focusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="question" 
                        label={{ value: 'Question', position: 'insideBottomRight', offset: 0 }} 
                      />
                      <YAxis domain={[0, 100]} label={{ value: 'Focus %', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="focus" 
                        stroke="#8884d8" 
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          return (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={4} 
                              fill={payload.isCorrect ? "#4ade80" : "#f87171"} 
                            />
                          );
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Focus Insights</h3>
                <ul className="space-y-2">
                  {insights.map((insight, index) => (
                    <li key={index} className="text-sm bg-blue-50 p-2 rounded-md">
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Try a 2-minute breathing exercise
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Schedule study during your high-focus hours
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button className="bg-learnzy-purple" onClick={handleFinish}>
            Continue to Dashboard <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Revision Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Your Revision Schedule</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-center text-sm">
                Based on proven spaced repetition techniques, we've scheduled your revision sets to maximize retention.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <div className="bg-learnzy-purple/10 h-6 w-6 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-learnzy-purple">B</span>
                  </div>
                  <span>Set B</span>
                </div>
                <span className="text-sm font-medium">May 17, 2023</span>
              </div>
              
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <div className="bg-learnzy-purple/10 h-6 w-6 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-learnzy-purple">C</span>
                  </div>
                  <span>Set C</span>
                </div>
                <span className="text-sm font-medium">May 24, 2023</span>
              </div>
              
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <div className="bg-learnzy-purple/10 h-6 w-6 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-learnzy-purple">D</span>
                  </div>
                  <span>Set D</span>
                </div>
                <span className="text-sm font-medium">May 31, 2023</span>
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <div className="bg-learnzy-purple/10 h-6 w-6 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-learnzy-purple">E</span>
                  </div>
                  <span>Set E</span>
                </div>
                <span className="text-sm font-medium">June 28, 2023</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button className="w-full" onClick={handleAddToCalendar}>
              <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PerformanceReport;
