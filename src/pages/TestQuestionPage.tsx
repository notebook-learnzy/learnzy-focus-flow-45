
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import RelaxStatusIndicator from "@/components/RelaxStatusIndicator";

function mapCorrectAnswerToIdx(ans: string) {
  if (!ans) return -1;
  return ['a', 'b', 'c', 'd'].indexOf(ans.toLowerCase());
}

const TestQuestionPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currQ, setCurrQ] = useState(0);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [hrvs, setHRVs] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setError(null);

      // Always fetch first 50 questions from Supabase
      const { data, error } = await supabase
        .from("chapter_1_living_world_set_a")
        .select("*")
        .order("q_no", { ascending: true })
        .limit(50);

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setQuestions(data || []);
      setSelected(new Array((data || []).length).fill(undefined));
      setQuestionTimes(new Array((data || []).length).fill(0));
      setHRVs(new Array((data || []).length).fill(70)); // HRV baseline
      setStartTime(Date.now());
      setIsLoading(false);
    }
    fetchQuestions();
    // eslint-disable-next-line
  }, [chapterId, setId]);

  useEffect(() => {
    // Reset timers for current question
    setQuestionTimes(times => {
      const newTimes = [...times];
      newTimes[currQ] = 0;
      return newTimes;
    });
    setStartTime(Date.now());
    // Simulate HRV value
    setHRVs(hrvs => {
      const newH = [...hrvs];
      newH[currQ] = 60 + Math.floor(Math.random() * 30);
      return newH;
    });
    // eslint-disable-next-line
  }, [currQ]);

  useEffect(() => {
    // Timer for current question
    if (isLoading) return;
    const interval = setInterval(() => {
      setQuestionTimes(times => {
        const newTimes = [...times];
        newTimes[currQ] = Math.floor((Date.now() - startTime) / 1000);
        return newTimes;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currQ, startTime, isLoading]);

  const handleOption = (idx: number) => {
    setSelected(sels => {
      const up = [...sels];
      up[currQ] = idx;
      return up;
    });
    // Save HRV for this question as proxy for focus
    setHRVs(h => {
      const hn = [...h];
      hn[currQ] = 60 + Math.floor(Math.random() * 30); // Simulate
      return hn;
    });
  };

  const nextQ = () => setCurrQ((c) => Math.min(questions.length - 1, c + 1));
  const prevQ = () => setCurrQ((c) => Math.max(0, c - 1));

  const submitTest = async () => {
    // Compose answers, times, focus for saving
    const results = questions.map((q, i) => ({
      q_no: q.q_no,
      question_id: q.id || q.q_no,
      user_answer: selected[i] !== undefined ? ['a', 'b', 'c', 'd'][selected[i]!] : undefined,
      correct_answer: q.correct_answer,
      topic: q.topic,
      subtopic: q.subtopic,
      time_spent: questionTimes[i],
      difficulty_level: q.difficulty_level,
      hrv: hrvs[i],
    }));

    // Save session result
    await (supabase as any).from("session_results").insert([
      {
        user_id: null,
        subject: subjectId,
        class_id: classId,
        chapter_id: chapterId,
        set_id: setId,
        questions: results,
        correct_count: results.filter((res) => res.user_answer === res.correct_answer).length,
        total_count: results.length,
      }
    ]);

    // Pass along answers & more via router state to analyze
    navigate(
      `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/analyze`,
      { state: { questions, selected, questionTimes, hrvs } }
    );
  };

  if (isLoading) return <div className="p-14 text-lg text-center">Loading questions...</div>;
  if (error) return <div className="p-14 text-lg text-center text-red-600">Error loading questions: {error}</div>;

  const q = questions[currQ];

  return (
    <div className="bg-[#FEF9F1] min-h-screen pt-6 pb-6 px-1 sm:px-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-bold text-lg text-neutral-700">
              Test - Set {setId?.toUpperCase() || "A"}
            </span>
            <div className="text-xs text-gray-400 mt-1">
              {(chapterId === "cell-bio" && "Cell: The Unit of Life") ||
                (chapterId === "the-living-world" && "The Living World") ||
                "Unknown Chapter"} • Class XI • {questions.length} Questions
            </div>
          </div>
          <RelaxStatusIndicator />
        </div>
        <Card className="p-5 mb-6 bg-white shadow-md rounded-3xl">
          <div className="font-semibold text-gray-800 mb-4">
            Question {q.q_no} / {questions.length}
          </div>
          <div className="text-lg font-medium mb-6">{q.question_text}</div>
          <div>
            {["a", "b", "c", "d"].map((optKey, idx) => {
              const optVal = q[`option_${optKey}`];
              return (
                <div
                  key={optKey}
                  onClick={() => handleOption(idx)}
                  className={cn(
                    "p-3 border rounded-lg mb-3 cursor-pointer flex justify-between items-center hover:shadow transition-all",
                    selected[currQ] === idx
                      ? "border-[#FFBD59] bg-[#FFF7EB] text-[#e57311] font-semibold"
                      : "border-gray-200 bg-gray-50"
                  )}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected[currQ] === idx}
                >
                  <span>
                    <span className="font-semibold mr-2">{String.fromCharCode(65+idx)}.</span>{optVal}
                  </span>
                  <span>
                    {selected[currQ] === idx && <span className="ml-2">✔️</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" disabled={currQ===0} onClick={prevQ}>Previous</Button>
            {currQ === questions.length-1 ? (
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
