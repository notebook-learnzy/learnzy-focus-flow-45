
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { chapters, questionSets, subjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import MeditationOverlay from "@/components/MeditationOverlay";
import MentalWellnessReport from "@/components/MentalWellnessReport";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppContext } from "@/contexts/AppContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Question, QuestionSet, FocusData, SessionReport } from "@/types";
// Add explicit imports for needed types:
import { DifficultyLevel, QuestionType, BloomTaxonomy } from "@/types/questions";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Practice = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { focusScore, setFocusScore } = useAppContext();
  
  const chapter = chapters.find(c => c.id === chapterId);
  const subject = chapter ? subjects.find(s => s.id === chapter.subjectId) : null;
  
  // NEW: Load Botany questions from Supabase if this is Botany + Set A
  const [currentQuestionSet, setCurrentQuestionSet] = useState<QuestionSet | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [showMeditation, setShowMeditation] = useState(true);
  const [meditationCompleted, setMeditationCompleted] = useState(false);
  const [meditationSkipped, setMeditationSkipped] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [focusTimeline, setFocusTimeline] = useState<FocusData[]>([]);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  
  // Initialize the question set when the component mounts
  useEffect(() => {
    const fetchSetA = async () => {
      setQuestionsLoading(true);
      // Only for Botany subject
      if (subject?.name === "Botany") {
        // Fetch 10 Botany questions as demo
        const { data, error } = await supabase
          .from("demo")
          .select()
          .eq("Subject", "Botany")
          .limit(10);

        if (error) {
          setQuestionsLoading(false);
          toast({
            title: "Error loading Botany Set",
            description: error.message,
            variant: "destructive",
          });
          // fallback to mockData
          setCurrentQuestionSet(null);
          return;
        }

        // Transform DB rows to Question[] type
        const mappedQuestions = (data || []).map((q, i) => ({
          id: `db-${q.q_no}`,
          question_text: q.Question_Text,
          figure: undefined,
          option_a: q.Option_A,
          option_b: q.Option_B,
          option_c: q.Option_C,
          option_d: q.Option_D,
          correct_answer: (q.Correct_Answer?.toUpperCase() ?? "A") as "A" | "B" | "C" | "D",
          subject: q.Subject,
          chapter_name: q.Chapter_name,
          topic: q.Topic || "",
          subtopic: q.Subtopic || "",
          difficulty_level: (q.Difficulty_Level || "Easy") as DifficultyLevel,
          question_type: (q.Question_Structure || "MCQ") as QuestionType,
          bloom_taxonomy: (q.Bloom_Taxonomy || "Remember") as BloomTaxonomy,
          priority_level: parseInt(q.Priority_Level || "3") as 1|2|3|4|5,
          time_to_solve: Number(q.Time_to_Solve) || 60,
          key_concept_tested: q.Key_Concept_Tested || "",
          common_pitfalls: q.Common_Pitfalls || "",
          creation_timestamp: new Date().toISOString(),
          last_updated_timestamp: new Date().toISOString(),
        }));

        setCurrentQuestionSet({
          id: `botany-setA`,
          set_type: "A",
          chapter_id: chapterId!,
          questions: mappedQuestions,
          scheduled_date: undefined,
          completed_date: undefined,
          focus_score: undefined,
          interval_adjusted: false,
        });
        setQuestionsLoading(false);
        return;
      }

      // Default/fallback (other subject, mockData)
      if (chapterId) {
        // Find the next available set for this chapter
        const nextSet = questionSets.find(set => 
          set.chapter_id === chapterId && !set.completed_date
        );
        
        if (nextSet) {
          setCurrentQuestionSet(nextSet as QuestionSet);
        }
      }
    };

    if (chapter && subject) {
      fetchSetA();
    }
  }, [chapterId, chapter, subject]);
  
  // Show loading indicator if fetching questions
  if (questionsLoading) {
    return (
      <div className="container mx-auto max-w-7xl py-16 text-center">
        <h2 className="text-xl font-semibold mb-4">Loading questions...</h2>
      </div>
    );
  }
  
  // Simulate focus score fluctuation
  useEffect(() => {
    if (!showMeditation && !practiceCompleted) {
      const interval = setInterval(() => {
        const newScore = Math.floor(Math.random() * 30) + 60; // Random between 60-90
        setFocusScore(newScore);
        
        // If we're on a question, record this focus score
        if (currentQuestionSet && currentQuestion < currentQuestionSet.questions.length) {
          // In a real app, we would record this at appropriate intervals
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [setFocusScore, showMeditation, practiceCompleted, currentQuestionSet, currentQuestion]);
  
  if (!chapter || !subject) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Chapter not found</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  if (!currentQuestionSet) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">No question sets available</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    
    setSelectedOption(option);
    
    // Record focus data for this question
    const currentQuestionData = currentQuestionSet.questions[currentQuestion];
    const isCorrect = option === currentQuestionData.correct_answer;
    
    // In real app, this would use actual biometric data
    const newFocusData: FocusData = {
      question_id: currentQuestionData.id,
      focus_score: focusScore,
      time_spent: Math.floor(Math.random() * 60) + 30, // Random time between 30-90 seconds
      is_correct: isCorrect
    };
    
    setFocusTimeline(prev => [...prev, newFocusData]);
    
    // Show toast for correct/incorrect
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: currentQuestionData.key_concept_tested,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: currentQuestionData.common_pitfalls || "Review this concept",
        variant: "destructive",
      });
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < currentQuestionSet.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Practice session completed
      const correctAnswers = focusTimeline.filter(data => data.is_correct).length;
      const totalTime = focusTimeline.reduce((total, data) => total + data.time_spent, 0);
      
      // Generate session report
      const report: SessionReport = {
        id: `session-${Date.now()}`,
        question_set_id: currentQuestionSet.id,
        date: new Date().toISOString(),
        overall_focus_score: Math.round(focusTimeline.reduce((sum, data) => sum + data.focus_score, 0) / focusTimeline.length),
        focus_timeline: focusTimeline,
        meditation_completed: meditationCompleted,
        meditation_skipped: meditationSkipped,
        total_time: totalTime,
        correct_answers: correctAnswers,
        total_questions: currentQuestionSet.questions.length
      };
      
      setSessionReport(report);
      setPracticeCompleted(true);
    }
  };
  
  const handleFinishSession = () => {
    navigate(`/subject/${subject.id}`);
  };
  
  const handleCompleteMeditation = () => {
    setMeditationCompleted(true);
    setShowMeditation(false);
    toast({
      title: "Meditation Completed",
      description: "Great job! You're ready to focus on your practice session.",
    });
  };
  
  const handleSkipMeditation = () => {
    setMeditationSkipped(true);
    setShowMeditation(false);
    toast({
      title: "Meditation Skipped",
      description: "Remember, short mindfulness exercises can help improve focus.",
      variant: "default",
    });
  };
  
  const currentQuestionData = currentQuestionSet.questions[currentQuestion];
  
  return (
    <div className={cn(
      "container mx-auto max-w-7xl",
      showFocusMode && "bg-gray-50 rounded-lg p-6"
    )}>
      {/* Meditation Overlay */}
      {showMeditation && (
        <MeditationOverlay
          onComplete={handleCompleteMeditation}
          onSkip={handleSkipMeditation}
        />
      )}
      
      {/* Session Report Dialog */}
      <Dialog open={practiceCompleted} onOpenChange={(open) => !open && handleFinishSession()}>
        <DialogContent className="max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Practice Session Complete</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span className="font-semibold">
                      {sessionReport?.correct_answers}/{sessionReport?.total_questions} 
                      ({Math.round((sessionReport?.correct_answers! / sessionReport?.total_questions!) * 100)}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-semibold">
                      {Math.floor((sessionReport?.total_time || 0) / 60)}m {(sessionReport?.total_time || 0) % 60}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meditation:</span>
                    <span className="font-semibold">
                      {sessionReport?.meditation_completed ? "Completed" : "Skipped"}
                    </span>
                  </div>
                  
                  <Button className="w-full" onClick={handleFinishSession}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {sessionReport && (
              <MentalWellnessReport report={sessionReport} />
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          className="text-gray-500"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" /> Exit Practice
        </Button>
        
        <div className="flex items-center gap-3">
          <Switch 
            id="focus-mode" 
            checked={showFocusMode} 
            onCheckedChange={setShowFocusMode}
          />
          <Label htmlFor="focus-mode">Focus Mode</Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between">
                <span>{subject.name}: {chapter.name}</span>
                <span className="text-gray-500">
                  Question {currentQuestion + 1}/{currentQuestionSet.questions.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-4">
                <h3 className="text-xl font-medium mb-6">{currentQuestionData.question_text}</h3>
                
                {currentQuestionData.figure && (
                  <div className="mb-6">
                    <img 
                      src={currentQuestionData.figure} 
                      alt="Question figure" 
                      className="max-h-72 mx-auto"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  {['A', 'B', 'C', 'D'].map((option) => {
                    const optionText = currentQuestionData[`option_${option.toLowerCase()}` as keyof Question] as string;
                    const isCorrect = currentQuestionData.correct_answer === option;
                    
                    return (
                      <div
                        key={option}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer",
                          selectedOption === option && isCorrect
                            ? "border-green-500 bg-green-50"
                            : selectedOption === option
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:bg-gray-50"
                        )}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium mr-2">{option}.</span>
                            <span>{optionText}</span>
                          </div>
                          {selectedOption === option && (
                            isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  className="bg-learnzy-purple"
                >
                  {currentQuestion === currentQuestionSet.questions.length - 1 ? "Finish" : "Next Question"}
                </Button>
              </div>
              
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <div>Difficulty: {currentQuestionData.difficulty_level}</div>
                <div>Type: {currentQuestionData.question_type}</div>
                <div>Bloom: {currentQuestionData.bloom_taxonomy}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {showFocusMode && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Focus Monitor</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <FocusScoreGauge />
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Session Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Set:</span>
                    <span className="font-medium">{currentQuestionSet.set_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Progress:</span>
                    <span className="font-medium">{currentQuestion + 1}/{currentQuestionSet.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bloom focus:</span>
                    <span className="font-medium">{currentQuestionData.bloom_taxonomy}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
