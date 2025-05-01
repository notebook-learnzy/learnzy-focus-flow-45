
import { useAppContext, AppMode } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, School } from "lucide-react";

const ModeToggle = () => {
  const { mode, setMode } = useAppContext();

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode("self-study")}
        className={cn(
          "flex items-center gap-2 rounded-md",
          mode === "self-study"
            ? "bg-white shadow-sm"
            : "hover:bg-gray-200"
        )}
      >
        <BookOpen size={16} />
        <span>Self-Study</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMode("institute")}
        className={cn(
          "flex items-center gap-2 rounded-md",
          mode === "institute"
            ? "bg-white shadow-sm"
            : "hover:bg-gray-200"
        )}
      >
        <School size={16} />
        <span>Institute</span>
      </Button>
    </div>
  );
};

export default ModeToggle;
