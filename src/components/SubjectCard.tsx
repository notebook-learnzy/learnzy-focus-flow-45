
import { useNavigate } from "react-router-dom";
import { Subject } from "@/types";
import ProgressRing from "./ProgressRing";
import { BookOpen, Heart, FlaskRound, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const navigate = useNavigate();
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "flask-round":
        return <FlaskRound className="h-8 w-8 text-learnzy-purple" />;
      case "leaf":
        return <Leaf className="h-8 w-8 text-learnzy-purple" />;
      case "heart":
        return <Heart className="h-8 w-8 text-learnzy-purple" />;
      default:
        return <BookOpen className="h-8 w-8 text-learnzy-purple" />;
    }
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-5 cursor-pointer border border-gray-100 hover:shadow-md transition-shadow"
      onClick={() => navigate(`/subject/${subject.id}`)}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="mb-4">{getIcon(subject.icon)}</div>
          <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
        </div>
        <ProgressRing progress={subject.progress} />
      </div>
    </div>
  );
};

export default SubjectCard;
