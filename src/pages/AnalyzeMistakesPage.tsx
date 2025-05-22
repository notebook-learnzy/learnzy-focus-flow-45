
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePreAnalysisState } from "@/hooks/usePreAnalysisState";
import React, { useState } from "react";

const AnalyzeMistakesPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
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
            reviewList.map((q, idx) => (
              <div className="mb-8" key={q.id}>
                <div className="mb-1 text-sm font-medium text-gray-700">
                  Q{idx + 1}. {q.question_text}
                </div>
                {q.userAnswer !== undefined && (
                  <div className="mb-2">
                    <span className="mr-2 text-xs text-gray-500">
                      Your Answer:
                    </span>
                    <span className="font-medium">
                      {q.userAnswer !== null && q.userAnswer !== undefined
                        ? q.userAnswer
                        : "Unattempted"}
                    </span>
                  </div>
                )}
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
            ))
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
