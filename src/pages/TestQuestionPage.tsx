
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSupabaseQuestions } from "@/hooks/useSupabaseQuestions";
import { useQuestionSession } from "@/hooks/useQuestionSession";
import { supabase } from "@/integrations/supabase/client";

// Show real questions for the-living-world/set/a, else fallback to mock

const TestQuestionPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();
  const chapterKey = chapterId ?? "";
  const setType = setId ?? "A";

  const { data: questions, isLoading, error } = useSupabaseQuestions(chapterKey, setType);
  // fallback: only for demo
  const fallbackQuestions = [
    {
      q_no: 1,
      id: "q1",
      question_text: "Sample Q1: What is the powerhouse of the cell?",
      option_a: "Nucleus",
      option_b: "Mitochondria",
      option_c: "Ribosome",
      option_d: "Chloroplast",
      correct_answer: "b",
      time_to_solve: 45,
      topic: "Cell Structure",
      subtopic: "Mitochondria",
      difficulty_level: "Easy"
    },
    // ...add as needed for fallback
  ];

  const questionList = questions && questions.length ? questions : fallbackQuestions;
  const [currQ, setCurrQ] = useState(0);

  // Per-question timer and simulated focus
  const [timer, setTimer] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [focusVal, setFocusVal] = useState(75 + Math.floor(Math.random() * 10));
  const { session, saveAnswer, markFinished, setSession } = useQuestionSession(questionList.length);

  // Select answer
  const [selected, setSelected] = useState<(string | undefined)[]>(Array(questionList.length));
  useEffect(() => {
    setSelected(session.answers);
  }, [session.answers]);

  // Timer per question, track on currQ change
  useEffect(() => {
    setTimer(0);
    setQuestionStartTime(Date.now());
    const focus = Math.floor(75 + Math.random() * 15);
    setFocusVal(focus);
    const interval = setInterval(() => setTimer(Math.floor((Date.now() - questionStartTime) / 1000)), 900);
    return () => clearInterval(interval);
  }, [currQ, questionStartTime]);

  const handleOption = (idx: number, opt: string) => {
    const now = Date.now();
    setSelected(sels => {
      const up = [...sels];
      up[currQ] = opt;
      return up;
    });
    saveAnswer(currQ, opt, Math.floor((now - questionStartTime) / 1000), focusVal);
  };

  const nextQ = () => setCurrQ((c) => Math.min(questionList.length - 1, c + 1));
  const prevQ = () => setCurrQ((c) => Math.max(0, c - 1));

  const submitTest = async () => {
    markFinished();
    // Save result to Supabase
    const correctCount = questionList.filter((q, i) =>
      session.answers[i] && session.answers[i]?.toLowerCase() === q.correct_answer?.toLowerCase()
    ).length;
    const total = questionList.length;
    await supabase.from("session_results").insert({
      user_id: null,
      subject: subjectId,
      class_id: classId,
      chapter_id: chapterId,
      set_id: setId,
      started_at: new Date(session.startedAt).toISOString(),
      ended_at: new Date().toISOString(),
      questions: questionList.map((q, i) => ({
        q_no: q.q_no,
        question_id: q.id,
        user_answer: session.answers[i],
        correct_answer: q.correct_answer,
        time_spent: session.times[i],
        focus_score: session.focus[i],
        tags: [],
        topic: q.topic,
        subtopic: q.subtopic,
        difficulty_level: q.difficulty_level,
      })),
      correct_count: correctCount,
      total_count: total
    });
    navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/analyze`, {
      state: { answers: session.answers, times: session.times, focus: session.focus, questions: questionList }
    });
  };

  if (isLoading) return <div className="p-12 text-lg text-center">Loading questions...</div>;
  if (error) return <div className="p-12 text-lg text-center text-red-600">Error loading questions: {error.message}</div>;

  return (
    <div className="bg-[#FEF9F1] min-h-screen pt-6 pb-6 px-1 sm:px-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-bold text-lg text-neutral-700">
              Test - Set {setId?.toUpperCase() || "A"}
            </span>
            <div className="text-xs text-gray-400 mt-1">
              The Living World • Class XI • {questionList.length} Questions
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-base font-medium">
              Time on Q: <span className="font-mono">{timer}s</span>
            </div>
          </div>
        </div>
        <Card className="p-5 mb-6 bg-white shadow-md rounded-3xl">
          <div className="font-semibold text-gray-800 mb-4">
            Question {currQ+1} / {questionList.length}
          </div>
          <div className="text-lg font-medium mb-8">{questionList[currQ].question_text}</div>
          <div>
            {["a", "b", "c", "d"].map((optKey, idx) => {
              const optVal = questionList[currQ][`option_${optKey}` as keyof typeof questionList[0]];
              return (
                <div
                  key={optKey}
                  onClick={() => handleOption(currQ, optKey)}
                  className={cn(
                    "p-3 border rounded-lg mb-3 cursor-pointer flex justify-between items-center hover:shadow transition-all",
                    selected[currQ] === optKey
                      ? "border-[#FFBD59] bg-[#FFF7EB] text-[#e57311] font-semibold"
                      : "border-gray-200 bg-gray-50"
                  )}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected[currQ] === optKey}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleOption(currQ, optKey); }}
                >
                  <span>
                    <span className="font-semibold mr-2">{String.fromCharCode(65+idx)}.</span>{optVal}
                  </span>
                  <span>
                    {selected[currQ] === optKey && <span className="ml-2">✔️</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" disabled={currQ===0} onClick={prevQ}>Previous</Button>
            {currQ === questionList.length-1 ? (
              <Button className="bg-[#FFBD59]" onClick={submitTest}>Submit Test</Button>
            ) : (
              <Button onClick={nextQ}>Next</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default TestQuestionPage;
