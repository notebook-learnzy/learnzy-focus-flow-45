
import { useParams, useNavigate } from "react-router-dom";
import { subjects, chapters } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import ProgressRing from "@/components/ProgressRing";
import { ArrowLeft, Book } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Subject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const subject = subjects.find(s => s.id === id);
  const subjectChapters = chapters.filter(c => c.subjectId === id);
  
  if (!subject) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Subject not found</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="bg-learnzy-purple/10 p-3 rounded-full mr-4">
            <Book className="h-6 w-6 text-learnzy-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{subject.name}</h1>
            <p className="text-gray-500">{subjectChapters.length} chapters</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ProgressRing progress={subject.progress} size={60} />
          <Button className="bg-learnzy-orange hover:bg-learnzy-orange/90">
            Start Practice
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectChapters.map(chapter => (
              <div
                key={chapter.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/practice/${chapter.id}`)}
              >
                <div>
                  <h3 className="font-medium">{chapter.name}</h3>
                  <p className="text-sm text-gray-500">
                    {chapter.lastPracticed 
                      ? `Last practiced: ${new Date(chapter.lastPracticed).toLocaleDateString()}` 
                      : "Not practiced yet"}
                  </p>
                </div>
                <ProgressRing progress={chapter.progress} size={40} textClassName="text-xs" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subject;
