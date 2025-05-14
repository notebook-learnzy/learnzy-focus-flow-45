
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { subjects } from "@/data/mockData";

const SubjectClasses = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Subject not found</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }

  const classes = [
    {
      id: "11",
      title: "Class 11",
      description: `Foundations of ${subject.name}`,
    },
    {
      id: "12",
      title: "Class 12",
      description: `Advanced Concepts in ${subject.name}`,
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">{subject.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <Card 
            key={classItem.id}
            className={cn(
              "cursor-pointer hover:shadow-md transition-shadow",
              "border-2 border-learnzy-purple/20"
            )}
            onClick={() => navigate(`/academics/${subject.id}/classes/${classItem.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-learnzy-purple/10 rounded-full p-6">
                  <span className="text-4xl font-bold text-learnzy-purple">{classItem.id}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{classItem.title}</h2>
                  <p className="text-gray-500">{classItem.description}</p>
                </div>
                <Button className="bg-learnzy-purple mt-4">
                  View Chapters
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectClasses;
