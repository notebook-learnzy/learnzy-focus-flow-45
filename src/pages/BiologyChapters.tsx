
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { biologyChapters } from "@/data/mockData";
import ProgressRing from "@/components/ProgressRing";
import { format } from "date-fns";

const BiologyChapters = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  
  const filteredChapters = biologyChapters.filter(chapter => chapter.class === classId);
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate("/biology")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Classes
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="bg-learnzy-purple/10 p-3 rounded-full mr-4">
            <BookOpen className="h-6 w-6 text-learnzy-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Biology - Class {classId}</h1>
            <p className="text-gray-500">{filteredChapters.length} chapters</p>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/biology/chapter/${chapter.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-learnzy-purple/10 h-10 w-10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-learnzy-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">{chapter.name}</h3>
                    <p className="text-sm text-gray-500">
                      {chapter.lastPracticed 
                        ? `Last practiced: ${format(new Date(chapter.lastPracticed), "MMM dd, yyyy")}` 
                        : "Not practiced yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ProgressRing progress={chapter.progress} size={40} textClassName="text-xs" />
                  <Button 
                    size="sm" 
                    className="bg-learnzy-orange hover:bg-learnzy-orange/90"
                    disabled={chapter.progress > 0}
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

export default BiologyChapters;
