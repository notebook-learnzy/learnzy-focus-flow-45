
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import { subjects } from "@/data/mockData";
import ProgressRing from "@/components/ProgressRing";

// Biology chapters for Class 11
const biologyChapters11 = [
  { id: "bio-11-1", name: "The Living World", progress: 0 },
  { id: "bio-11-2", name: "Structural Organisation in Animals", progress: 0 },
  { id: "bio-11-3", name: "Respiration in Plants", progress: 0 },
  { id: "bio-11-4", name: "Plant Kingdom", progress: 0 },
  { id: "bio-11-5", name: "Plant Growth and Development", progress: 0 },
  { id: "bio-11-6", name: "Photosynthesis in Higher Plants", progress: 0 },
  { id: "bio-11-7", name: "Neural Control and Coordination", progress: 0 },
  { id: "bio-11-8", name: "Morphology of Flowering Plants", progress: 0 },
  { id: "bio-11-9", name: "Locomotion and Movement", progress: 0 },
  { id: "bio-11-10", name: "Chemical Coordination and Integration", progress: 0 },
  { id: "bio-11-11", name: "Cell: The Unit of Life", progress: 0 },
  { id: "bio-11-12", name: "Cell Cycle and Cell Division", progress: 0 },
  { id: "bio-11-13", name: "Breathing and Exchange of Gases", progress: 0 },
  { id: "bio-11-14", name: "Body Fluids and Circulation", progress: 0 },
  { id: "bio-11-15", name: "Biomolecules", progress: 0 },
  { id: "bio-11-16", name: "Biological Classification", progress: 0 },
  { id: "bio-11-17", name: "Animal Kingdom", progress: 0 },
  { id: "bio-11-18", name: "Excretory Products and their Elimination", progress: 0 },
  { id: "bio-11-19", name: "Anatomy of Flowering Plants", progress: 0 }
];

const ChapterList = () => {
  const { id, classId } = useParams<{ id: string; classId: string }>();
  const navigate = useNavigate();
  
  const subject = subjects.find(s => s.id === id);
  const isClassValid = classId === "11" || classId === "12";
  
  const chapters = classId === "11" ? biologyChapters11 : [];
  
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
                    disabled={chapter.progress === 0 && chapter.id !== "bio-11-1"}
                    onClick={() => navigate(`/practice/biology/11/${chapter.id}/set/A/ritual`)}
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
