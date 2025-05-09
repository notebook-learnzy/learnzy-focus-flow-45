
import { useParams, useNavigate } from "react-router-dom";
import { subjects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Subject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const subject = subjects.find(s => s.id === id);
  
  if (!subject) {
    return (
      <div className="container mx-auto max-w-7xl py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Subject not found</h2>
        <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
      </div>
    );
  }
  
  // Check if the subject is Biology or Botany to show class selection
  const showClassSelection = subject.name.toLowerCase() === "biology" || subject.name.toLowerCase() === "botany";
  
  return (
    <div className="container mx-auto max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-500"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>
      
      <div className="flex items-center mb-6">
        <div className="bg-learnzy-purple/10 p-3 rounded-full mr-4">
          <Book className="h-6 w-6 text-learnzy-purple" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{subject.name}</h1>
        </div>
      </div>
      
      {showClassSelection ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-16 text-lg bg-learnzy-purple"
                onClick={() => navigate(`/subject/${id}/class/11`)}
              >
                Class 11
              </Button>
              <Button 
                size="lg" 
                className="h-16 text-lg bg-learnzy-purple"
                onClick={() => navigate(`/subject/${id}/class/12`)}
              >
                Class 12
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Subject;
