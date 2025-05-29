
import { cn } from "@/lib/utils";

interface QuestionDisplayProps {
  question: any;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onSelectAnswer: (idx: number) => void;
}

const QuestionDisplay = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer
}: QuestionDisplayProps) => {
  return (
    <>
      <div className="font-semibold text-gray-800 mb-4">
        Question {question.q_no} / {totalQuestions}
      </div>
      <div className="text-lg font-medium mb-6">{question.question_text}</div>
      <div>
        {["a", "b", "c", "d"].map((optKey, idx) => {
          const optVal = question[`option_${optKey}`];
          return (
            <div
              key={optKey}
              onClick={() => onSelectAnswer(idx)}
              className={cn(
                "p-3 border rounded-lg mb-3 cursor-pointer flex justify-between items-center hover:shadow transition-all",
                selectedAnswer === idx
                  ? "border-[#FFBD59] bg-[#FFF7EB] text-[#e57311] font-semibold"
                  : "border-gray-200 bg-gray-50"
              )}
              tabIndex={0}
              role="button"
              aria-pressed={selectedAnswer === idx}
            >
              <span>
                <span className="font-semibold mr-2">{String.fromCharCode(65+idx)}.</span>{optVal}
              </span>
              <span>
                {selectedAnswer === idx && <span className="ml-2">✔️</span>}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuestionDisplay;
