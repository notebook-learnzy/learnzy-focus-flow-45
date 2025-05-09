
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Check, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { biologyChapters, questionSets } from "@/data/mockData";
import ProgressRing from "@/components/ProgressRing";
import { Badge } from "@/components/ui/badge";

const BiologyChapterDetail = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  
  const chapter = biologyChapters.find(ch => ch.id === chapterId);
  const chapterSets = questionSets.filter(set => set.chapter_id === chapterId);
  
  if (!chapter) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Chapter not found</h2>
        <Button onClick={() => navigate("/biology")}>Return to Biology</Button>
      </div>
    );
  }
  
  const handleStartSet = (setType: string) => {
    navigate(`/practice/biology/${chapter.id}/set/${setType}/ritual`);
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate(`/biology/class/${chapter.class}`)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Chapters
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="bg-learnzy-purple/10 p-3 rounded-full mr-4">
            <BookOpen className="h-6 w-6 text-learnzy-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{chapter.name}</h1>
            <p className="text-gray-500">Biology - Class {chapter.class}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ProgressRing progress={chapter.progress} size={60} />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Question Sets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["A", "B", "C", "D", "E"].map((setType) => {
              const set = chapterSets.find(s => s.set_type === setType);
              const isCompleted = set?.completed_date !== null;
              const isLocked = setType !== "A" && !isCompleted && 
                !chapterSets.find(s => s.set_type === String.fromCharCode(setType.charCodeAt(0) - 1))?.completed_date;
              
              return (
                <div
                  key={setType}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-learnzy-purple/10 h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-learnzy-purple">{setType}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Practice Set {setType}</h3>
                      <p className="text-sm text-gray-500">
                        {isCompleted ? "Completed" : isLocked ? "Locked" : "Available"}
                        {set?.scheduled_date && !isCompleted && 
                          ` - Scheduled for ${new Date(set.scheduled_date).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Check size={12} /> Completed
                      </Badge>
                    ) : null}
                    <Button 
                      className={isCompleted ? "bg-gray-500" : "bg-learnzy-orange hover:bg-learnzy-orange/90"}
                      disabled={isLocked || isCompleted}
                      onClick={() => handleStartSet(setType)}
                    >
                      {isLocked ? <Lock size={16} className="mr-2" /> : null}
                      {isCompleted ? "Review" : isLocked ? "Locked" : "Start"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiologyChapterDetail;
