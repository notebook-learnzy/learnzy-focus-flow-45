
import { Chapter } from "@/types";
import { useNavigate } from "react-router-dom";
import ProgressRing from "./ProgressRing";
import { format } from "date-fns";

interface ChapterCardProps {
  chapter: Chapter;
}

const ChapterCard = ({ chapter }: ChapterCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="min-w-[240px] bg-white rounded-lg shadow-sm p-4 cursor-pointer border border-gray-100 hover:shadow-md transition-shadow"
      onClick={() => navigate(`/practice/${chapter.id}`)}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h4 className="text-md font-semibold text-gray-800">{chapter.name}</h4>
          {chapter.lastPracticed && (
            <p className="text-xs text-gray-500 mt-1">
              Last: {format(new Date(chapter.lastPracticed), "MMM dd")}
            </p>
          )}
        </div>
        <ProgressRing progress={chapter.progress} size={40} textClassName="text-xs" />
      </div>
    </div>
  );
};

export default ChapterCard;
