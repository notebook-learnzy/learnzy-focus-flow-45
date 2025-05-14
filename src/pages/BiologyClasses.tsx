
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const BiologyClasses = () => {
  const navigate = useNavigate();

  const classes = [
    {
      id: "11",
      title: "Class 11",
      description: "Foundations of Biology",
    },
    {
      id: "12",
      title: "Class 12",
      description: "Advanced Concepts",
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-3 pt-2 pb-20">
      <Button 
        variant="ghost" 
        className="mb-2 sm:mb-4 text-gray-500"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>
      <h1 className="text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Biology</h1>
      <div className="flex flex-col w-full gap-4 sm:grid sm:grid-cols-2 sm:gap-6">
        {classes.map((classItem) => (
          <Card 
            key={classItem.id}
            className={cn(
              "cursor-pointer hover:shadow-md transition-shadow border-2 border-learnzy-purple/20 w-full",
            )}
            onClick={() => navigate(`/biology/class/${classItem.id}`)}
          >
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4">
                <div className="bg-learnzy-purple/10 rounded-full p-4 sm:p-6">
                  <span className="text-3xl sm:text-4xl font-bold text-learnzy-purple">{classItem.id}</span>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">{classItem.title}</h2>
                  <p className="text-sm sm:text-base text-gray-500">{classItem.description}</p>
                </div>
                <Button className="bg-learnzy-purple mt-3 sm:mt-4 w-full sm:w-auto">
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

export default BiologyClasses;
