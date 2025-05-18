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

  // Explicitly filter to include both Cell: The Unit of Life and The Living World for Botany class 11
  let filteredChapters = biologyChapters.filter(
    chapter => chapter.classId === classId
  );
  if (classId === "11") {
    filteredChapters = [
      { id: "cell-bio", name: "Cell: The Unit of Life", classId: "11", subjectId: "botany", progress: 0, lastPracticed: null },
      { id: "the-living-world", name: "The Living World", classId: "11", subjectId: "botany", progress: 0, lastPracticed: null }
    ];
  }

  return (
    <div className="container mx-auto max-w-7xl pb-20 pt-2 px-3">
      <Button 
        variant="ghost" 
        className="mb-2 sm:mb-4 text-gray-500"
        onClick={() => navigate("/biology")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Classes
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div className="flex items-center">
          <div className="bg-learnzy-purple/10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
            <BookOpen className="h-5 w-5 text-learnzy-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Biology - Class {classId}</h1>
            <p className="text-gray-500 text-xs sm:text-base">{filteredChapters.length} chapters</p>
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
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/biology/chapter/${chapter.id}`)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-learnzy-purple/10 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-learnzy-purple" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:font-medium">{chapter.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {chapter.lastPracticed 
                        ? `Last practiced: ${format(new Date(chapter.lastPracticed), "MMM dd, yyyy")}` 
                        : "Not practiced yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
                  <ProgressRing progress={chapter.progress} size={32} textClassName="text-xs" />
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
