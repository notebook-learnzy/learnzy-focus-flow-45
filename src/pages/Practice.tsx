
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { chapters } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import { useAppContext } from "@/contexts/AppContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Practice = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { focusScore, setFocusScore } = useAppContext();
  
  const chapter = chapters.find(c => c.id === chapterId);
  const subject = chapter ? subjects.find(s => s.id === chapter.subjectId) : null;
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFocusMode, setShowFocusMode] = useState(false);
  
  // Demo questions
  const questions = [
    {
      id: 1,
      text: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: "Newton",
    },
    {
      id: 2,
      text: "Which law of thermodynamics states that energy cannot be created or destroyed?",
      options: ["First law", "Second law", "Third law", "Zeroth law"],
      correctAnswer: "First law",
    },
    // More questions would be here in a real app
  ];
  
  const currentQuestionData = questions[0]; // In a real app, this would be questions[currentQuestion - 1]
  
  // Simulate focus score fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusScore(Math.floor(Math.random() * 30) + 60); // Random between 60-90
    }, 5000);
    
    return () => clearInterval(interval);
  }, [setFocusScore]);
  
  if (!chapter || !subject) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Chapter not found</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // In a real app, this would navigate to a results screen
      navigate(`/subject/${subject.id}`);
    }
  };
  
  return (
    <div className={cn(
      "container mx-auto max-w-7xl",
      showFocusMode && "bg-gray-50 rounded-lg p-6"
    )}>
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
                  Question {currentQuestion}/{totalQuestions}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-4">
                <h3 className="text-xl font-medium mb-6">{currentQuestionData.text}</h3>
                
                <div className="space-y-3">
                  {currentQuestionData.options.map((option) => (
                    <div
                      key={option}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer",
                        selectedOption === option && selectedOption === currentQuestionData.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : selectedOption === option
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:bg-gray-50"
                      )}
                      onClick={() => handleOptionSelect(option)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {selectedOption === option && selectedOption === currentQuestionData.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  className="bg-learnzy-purple"
                >
                  {currentQuestion === totalQuestions ? "Finish" : "Next Question"}
                </Button>
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
          </div>
        )}
      </div>
    </div>
  );
};

// Import subjects at the file level to fix reference
import { subjects } from "@/data/mockData";

export default Practice;
