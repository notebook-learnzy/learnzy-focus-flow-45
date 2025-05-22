
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePreAnalysisState } from "@/hooks/usePreAnalysisState";
import React, { useState } from "react";

// Utility to get query params from location.search
function useQueryParam(name: string): string | undefined {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(name) ?? undefined;
}

const AnalyzeMistakesPage = () => {
  // Try to get from params, then fallback to query param
  const params = useParams<{ sessionId?: string }>();
  const sessionId =
    params.sessionId ||
    useQueryParam("sessionId");

  const navigate = useNavigate();
  // Use the real-time pre-analysis state hook
  const {
    loading,
    incorrectQuestions,
    unattemptedQuestions,
    handleTagToggle,
    tagOptions,
    questions,
  } = usePreAnalysisState({ sessionId: sessionId! });

  const [showUnattempted, setShowUnattempted] = useState(false);

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEF9F1]">
        No sessionId provided.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEF9F1]">
        Loading...
      </div>
    );
  }

  const reviewList = showUnattempted ? unattemptedQuestions : incorrectQuestions;

  // Returns A/B/C/D, correct, and user
  function getOptionChar(idx: number) {
    return String.fromCharCode(65 + idx);
  }

  return (
    <div className="min-h-screen bg-[#FEF9F1] py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <h2 className="text-lg font-bold mb-2 text-[#FFBD59]">Analyze Your Mistakes</h2>
          <div className="mb-4 flex gap-3">
            <Button
              variant={!showUnattempted ? "default" : "outline"}
              onClick={() => setShowUnattempted(false)}
            >
              Incorrect
            </Button>
            <Button
              variant={showUnattempted ? "default" : "outline"}
              onClick={() => setShowUnattempted(true)}
            >
              Unattempted
            </Button>
          </div>
          {reviewList.length === 0 ? (
            <div className="py-10 text-center text-gray-400">
              No {showUnattempted ? "unattempted" : "incorrect"} questions.
            </div>
          ) : (
            reviewList.map((q, idx) => {
              // Some possible keys
              const options = [
                q.option_a || (q.options && q.options[0]?.text) || "",
                q.option_b || (q.options && q.options[1]?.text) || "",
                q.option_c || (q.options && q.options[2]?.text) || "",
                q.option_d || (q.options && q.options[3]?.text) || "",
              ];
              const optionKeys = ["A", "B", "C", "D"];
              const correctAnswerKey =
                typeof q.correctAnswer === "string"
                  ? q.correctAnswer.toUpperCase()
                  : (q.correct_answer || "A").toUpperCase();
              const userAnswerKey = (q.userAnswer || q.user_answer || "")?.toUpperCase();

              return (
                <div className="mb-8" key={q.id}>
                  <div className="mb-1 text-sm font-medium text-gray-700">
                    Q{idx + 1}. {q.question_text}
                  </div>
                  <div className="flex gap-2 items-center mb-2 flex-wrap">
                    <span className="px-3 py-1 rounded bg-red-50 text-red-600 text-xs font-semibold">
                      Your answer: {userAnswerKey || "Unattempted"}
                    </span>
                    <span className="px-3 py-1 rounded bg-green-50 text-green-700 text-xs font-semibold">
                      Correct answer: {correctAnswerKey}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    {options.map((text, oidx) => (
                      <button
                        key={oidx}
                        disabled
                        className={
                          "w-full text-left bg-gray-50 mb-2 p-2 rounded-lg border text-base " +
                          (optionKeys[oidx] === correctAnswerKey
                            ? "border-green-500 bg-green-50 font-semibold"
                            : optionKeys[oidx] === userAnswerKey
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200")
                        }
                        tabIndex={-1}
                      >
                        <span className="mr-2 font-semibold">{optionKeys[oidx]}.</span> {text}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 my-3">
                    {tagOptions.map((tag) => (
                      <Button
                        key={tag}
                        variant={q.tags?.includes(tag) ? "default" : "outline"}
                        className={
                          q.tags?.includes(tag) ? "bg-[#FFBD59] border-[#FFBD59]" : ""
                        }
                        size="sm"
                        onClick={() => handleTagToggle(q.id, tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
          <Button
            className="mt-4 w-full bg-[#FFBD59]"
            onClick={() =>
              navigate(`/academics/session/${sessionId}/performance`)
            }
          >
            Complete and View Performance
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AnalyzeMistakesPage;

