
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CalendarPlus, BookOpen, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

// This will be replaced with real data from the backend
const mockMistakes = [
  {
    id: "m1",
    questionId: "q123",
    questionText: "Which of the following is not a part of the cell theory?",
    subject: "biology",
    chapter: "Cell Structure and Function",
    topic: "Cell Theory",
    subtopic: "Basic Principles",
    incorrectAnswer: "C",
    correctAnswer: "B",
    date: "2025-05-10",
    focusScore: 65,
    timeSpent: 45,
    repeated: 2
  },
  {
    id: "m2",
    questionId: "q456",
    questionText: "The movement of substances against a concentration gradient using energy is called:",
    subject: "biology",
    chapter: "Cell Transport",
    topic: "Active Transport",
    subtopic: "Transport Mechanisms",
    incorrectAnswer: "A",
    correctAnswer: "D",
    date: "2025-05-08",
    focusScore: 58,
    timeSpent: 62,
    repeated: 1
  },
  {
    id: "m3",
    questionId: "q789",
    questionText: "Which law states that the total energy of an isolated system remains constant?",
    subject: "physics",
    chapter: "Thermodynamics",
    topic: "Laws of Thermodynamics",
    subtopic: "First Law",
    incorrectAnswer: "B",
    correctAnswer: "A",
    date: "2025-05-12",
    focusScore: 72,
    timeSpent: 38,
    repeated: 0
  }
];

const MistakeNotebook = () => {
  const navigate = useNavigate();
  const { mode } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");
  const [filteredMistakes, setFilteredMistakes] = useState(mockMistakes);
  
  // Filter mistakes based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredMistakes(mockMistakes);
    } else {
      setFilteredMistakes(mockMistakes.filter(mistake => mistake.subject === activeTab));
    }
  }, [activeTab]);
  
  const getFocusScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  const scheduleReview = (mistakeId: string) => {
    // In a real implementation, this would open a dialog to schedule in calendar
    console.log(`Scheduling review for mistake: ${mistakeId}`);
    // For now just show a toast message
    alert("Review session scheduled in your calendar");
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-amber-500/10 p-3 rounded-full mr-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mistake Notebook</h1>
            <p className="text-gray-500">Track, analyze and improve from your mistakes</p>
          </div>
        </div>
        
        <Button className="bg-learnzy-purple">
          <CalendarPlus size={16} className="mr-2" /> Schedule Review Session
        </Button>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-gray-500">
            Total: {filteredMistakes.length} mistake{filteredMistakes.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {filteredMistakes.map(mistake => (
            <Card key={mistake.id} className="overflow-hidden">
              <div className={cn(
                "h-1",
                mistake.subject === "biology" ? "bg-green-500" :
                mistake.subject === "physics" ? "bg-blue-500" : "bg-purple-500"
              )} />
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <BookOpen size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {mistake.subject.charAt(0).toUpperCase() + mistake.subject.slice(1)} › {mistake.chapter} › {mistake.topic}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{mistake.questionText}</p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Your answer: </span>
                        <span className="font-semibold text-red-500">{mistake.incorrectAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Correct: </span>
                        <span className="font-semibold text-green-500">{mistake.correctAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Repeated: </span>
                        <span className="font-semibold">{mistake.repeated}×</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center gap-4 md:gap-2">
                    <div className="text-center">
                      <div className={cn("font-bold", getFocusScoreColor(mistake.focusScore))}>
                        {mistake.focusScore}%
                      </div>
                      <div className="text-xs text-gray-500">Focus</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{mistake.timeSpent}s</div>
                      <div className="text-xs text-gray-500">Time</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap"
                    onClick={() => scheduleReview(mistake.id)}
                  >
                    <CalendarPlus size={14} className="mr-1" />
                    Schedule Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="biology" className="space-y-4">
          {filteredMistakes.map(mistake => (
            <Card key={mistake.id} className="overflow-hidden">
              <div className="h-1 bg-green-500" />
              <CardContent className="p-4">
                {/* Same content structure as above */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <BookOpen size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {mistake.subject.charAt(0).toUpperCase() + mistake.subject.slice(1)} › {mistake.chapter} › {mistake.topic}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{mistake.questionText}</p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Your answer: </span>
                        <span className="font-semibold text-red-500">{mistake.incorrectAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Correct: </span>
                        <span className="font-semibold text-green-500">{mistake.correctAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Repeated: </span>
                        <span className="font-semibold">{mistake.repeated}×</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center gap-4 md:gap-2">
                    <div className="text-center">
                      <div className={cn("font-bold", getFocusScoreColor(mistake.focusScore))}>
                        {mistake.focusScore}%
                      </div>
                      <div className="text-xs text-gray-500">Focus</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{mistake.timeSpent}s</div>
                      <div className="text-xs text-gray-500">Time</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap"
                    onClick={() => scheduleReview(mistake.id)}
                  >
                    <CalendarPlus size={14} className="mr-1" />
                    Schedule Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="physics" className="space-y-4">
          {/* Similar structure for physics mistakes */}
          {filteredMistakes.map(mistake => (
            <Card key={mistake.id} className="overflow-hidden">
              <div className="h-1 bg-blue-500" />
              <CardContent className="p-4">
                {/* Similar content as above */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <BookOpen size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {mistake.subject.charAt(0).toUpperCase() + mistake.subject.slice(1)} › {mistake.chapter} › {mistake.topic}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{mistake.questionText}</p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Your answer: </span>
                        <span className="font-semibold text-red-500">{mistake.incorrectAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Correct: </span>
                        <span className="font-semibold text-green-500">{mistake.correctAnswer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Repeated: </span>
                        <span className="font-semibold">{mistake.repeated}×</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center gap-4 md:gap-2">
                    <div className="text-center">
                      <div className={cn("font-bold", getFocusScoreColor(mistake.focusScore))}>
                        {mistake.focusScore}%
                      </div>
                      <div className="text-xs text-gray-500">Focus</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{mistake.timeSpent}s</div>
                      <div className="text-xs text-gray-500">Time</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap"
                    onClick={() => scheduleReview(mistake.id)}
                  >
                    <CalendarPlus size={14} className="mr-1" />
                    Schedule Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="chemistry" className="space-y-4">
          {/* Similar structure for chemistry mistakes */}
          <div className="text-center py-10">
            <p className="text-gray-500">No chemistry mistakes recorded yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MistakeNotebook;
