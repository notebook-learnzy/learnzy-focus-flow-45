
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RelaxStatusIndicator from "@/components/RelaxStatusIndicator";
import QuestionDisplay from "@/components/QuestionDisplay";
import TestNavigationControls from "@/components/TestNavigationControls";
import { useTestQuestions } from "@/hooks/useTestQuestions";
import { useTestSubmission } from "@/hooks/useTestSubmission";

const TestQuestionPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const isCustom = window.location.pathname === "/academics/custom/test";

  const {
    questions,
    isLoading,
    error,
    currQ,
    selected,
    questionTimes,
    hrvs,
    sessionId,
    handleOption,
    nextQ,
    prevQ,
    setSessionId
  } = useTestQuestions(chapterId, setId, isCustom);

  const { submitTest, saving } = useTestSubmission();

  const handleSubmit = async () => {
    try {
      await submitTest({
        isCustom,
        sessionId,
        currQ,
        questions,
        selected,
        questionTimes,
        hrvs,
        subjectId,
        classId,
        chapterId,
        setId
      });
    } catch (error: any) {
      console.error("Test submission error:", error.message);
    }
  };

  if (isLoading)
    return <div className="p-14 text-lg text-center">Loading questions...</div>;

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF9F1] px-2">
        <Card className="p-8 text-center bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Whoops</h2>
          <p>{error}</p>
          <Button className="mt-8 bg-[#FFBD59]" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Card>
      </div>
    );

  if (!questions.length) return null;

  const currentQuestion = questions[currQ];

  return (
    <div className="bg-[#FEF9F1] min-h-screen pt-6 pb-6 px-1 sm:px-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-bold text-lg text-neutral-700">
              Test - Set {setId?.toUpperCase() || "A"}
            </span>
            <div className="text-xs text-gray-400 mt-1">
              {chapterId || "Chapter"} • Class {classId ? classId.toUpperCase() : "XI"} • {questions.length} Questions
            </div>
          </div>
          <RelaxStatusIndicator />
        </div>
        
        <Card className="p-5 mb-6 bg-white shadow-md rounded-3xl">
          <QuestionDisplay
            question={currentQuestion}
            questionNumber={currQ + 1}
            totalQuestions={questions.length}
            selectedAnswer={selected[currQ]}
            onSelectAnswer={handleOption}
          />
          
          <TestNavigationControls
            currentQuestion={currQ}
            totalQuestions={questions.length}
            onPrevious={prevQ}
            onNext={nextQ}
            onSubmit={handleSubmit}
            isSubmitting={saving}
          />
        </Card>
      </div>
    </div>
  );
};

export default TestQuestionPage;
