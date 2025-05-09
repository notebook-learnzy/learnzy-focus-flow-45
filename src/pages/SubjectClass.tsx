
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book } from "lucide-react";
import { subjects } from "@/data/mockData";

const SubjectClass = () => {
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
          <Book className="h-6 w-6 text-learnzy-purple" />
        </div>
        <h1 className="text-2xl font-bold">{subject.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => navigate(`/subject/${id}/class/11`)}>
          <CardHeader>
            <CardTitle>Class 11</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Access all NCERT Class 11 {subject.name} chapters and practice materials.
            </p>
            <Button className="mt-4 bg-learnzy-purple">View Chapters</Button>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/subject/${id}/class/12`)}>
          <CardHeader>
            <CardTitle>Class 12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Access all NCERT Class 12 {subject.name} chapters and practice materials.
            </p>
            <Button className="mt-4 bg-learnzy-purple">View Chapters</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubjectClass;
