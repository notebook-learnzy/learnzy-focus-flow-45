
import { Button } from "@/components/ui/button";

interface TestNavigationControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const TestNavigationControls = ({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting
}: TestNavigationControlsProps) => {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between mt-4">
      <Button 
        variant="outline" 
        disabled={isFirstQuestion} 
        onClick={onPrevious}
      >
        Previous
      </Button>
      {isLastQuestion ? (
        <Button 
          className="bg-[#FFBD59]" 
          onClick={onSubmit} 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Submit Test"}
        </Button>
      ) : (
        <Button onClick={onNext}>Next</Button>
      )}
    </div>
  );
};

export default TestNavigationControls;
