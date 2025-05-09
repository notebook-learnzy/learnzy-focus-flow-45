
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import { subjects, biologyChapters11, botanyChapters11 } from "@/data/mockData";
import ProgressRing from "@/components/ProgressRing";

const ChapterList = () => {
  const { id, classId } = useParams<{ id: string; classId: string }>();
  const navigate = useNavigate();
  
  const subject = subjects.find(s => s.id === id);
  const isClassValid = classId === "11" || classId === "12";
  
  // Select chapters based on subject and class
  let chapters = [];
  if (id === "biology" && classId === "11") {
    chapters = biologyChapters11;
  } else if (id === "botany" && classId === "11") {
    chapters = botanyChapters11;
  } else {
    chapters = [];
  }
  
  if (!subject || !isClassValid) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">
          {!subject ? "Subject not found" : "Invalid class selection"}
        </h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate(`/subject/${id}`)}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Subject
      </Button>
      
      <div className="flex items-center mb-6">
        <div className="bg-learnzy-purple/10 p-3 rounded-full mr-4">
          <BookOpen className="h-6 w-6 text-learnzy-purple" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{subject.name} - Class {classId}</h1>
          <p className="text-gray-500">{chapters.length} chapters</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{chapter.name}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <ProgressRing progress={chapter.progress} size={40} textClassName="text-xs" />
                  <Button 
                    disabled={chapter.progress === 0 && chapter.id !== `${id === "biology" ? "bio" : "bot"}-11-1`}
                    onClick={() => navigate(`/practice/${id}/11/${chapter.id}/set/A/ritual`)}
                  >
                    Start Set A
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChapterList;
