
import { Suggestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface SuggestionBannerProps {
  suggestion: Suggestion;
}

const SuggestionBanner = ({ suggestion }: SuggestionBannerProps) => {
  const handleApply = () => {
    toast.success("Suggestion applied! Added to your calendar.");
  };
  
  return (
    <div className="bg-gradient-to-r from-learnzy-orange/10 to-learnzy-orange/5 border border-learnzy-orange/20 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-learnzy-orange/20 p-2 rounded-full mr-3">
          <Lightbulb className="h-5 w-5 text-learnzy-orange" />
        </div>
        <p className="text-sm text-gray-800">{suggestion.message}</p>
      </div>
      <Button 
        size="sm" 
        variant="outline"
        className="text-learnzy-orange border-learnzy-orange hover:bg-learnzy-orange hover:text-white"
        onClick={handleApply}
      >
        {suggestion.action}
      </Button>
    </div>
  );
};

export default SuggestionBanner;
