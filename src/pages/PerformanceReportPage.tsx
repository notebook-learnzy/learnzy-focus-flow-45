
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getTagStats } from "@/utils/tagsManagement";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function safeQuestionsData(raw: any): any[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    } catch {}
  }
  if (raw && typeof raw === "object" && "length" in raw) {
    return Array.from(raw);
  }
  return [];
}

// Minimal structure for academic analytics demo using latest test_sessions
const PerformanceReportPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [scores, setScores] = useState({
    correct: 0,
    total: 0,
    unattempted: 0,
  });
  const [tagStats, setTagStats] = useState<{ tag: string; count: number }[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    let ignore = false;

    async function fetchSession() {
      const { data } = await supabase
        .from("test_sessions")
        .select("questions_data")
        .eq("id", sessionId)
        .maybeSingle();
      if (data && typeof data.questions_data !== "undefined" && !ignore) {
        const qdata = safeQuestionsData(data.questions_data);
        setQuestions(qdata);
        const correct = qdata.filter((q: any) => q.isCorrect).length;
        const unattempted = qdata.filter((q: any) => !q.userAnswer).length;
        setScores({
          correct,
          total: qdata.length,
          unattempted,
        });
        setTagStats(getTagStats(qdata));
      }
      setLoading(false);
    }
    fetchSession();

    const sub = supabase
      .channel("test_sessions_performance")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "test_sessions",
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new?.questions_data !== undefined) {
            const qdata = safeQuestionsData(payload.new.questions_data);
            setQuestions(qdata);
            const correct = qdata.filter((q: any) => q.isCorrect).length;
            const unattempted = qdata.filter((q: any) => !q.userAnswer).length;
            setScores({
              correct,
              total: qdata.length,
              unattempted,
            });
            setTagStats(getTagStats(qdata));
          }
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(sub);
    };
  }, [sessionId]);

  if (!sessionId) return <div>No sessionId provided.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-[#FEF9F1] min-h-screen py-10 px-1">
      <div className="max-w-5xl mx-auto">
        <Button variant="outline" onClick={() => navigate("/academics")} className="mb-6">
          ← Back to Academics
        </Button>
        <h2 className="text-lg font-bold text-[#FFBD59] mb-2">Performance Summary</h2>
        <div className="mb-6">
          <div className="mb-2">Score: {scores.correct}/{scores.total}</div>
          <div className="mb-2 text-gray-500">Unattempted: {scores.unattempted}</div>
        </div>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="flex mb-4 bg-white rounded-xl shadow">
            <TabsTrigger value="academic" className="flex-1">Academic Analysis</TabsTrigger>
            <TabsTrigger value="mistake-patterns" className="flex-1">Mistake Patterns</TabsTrigger>
          </TabsList>
          <TabsContent value="academic">
            <div>
              {/* Topic/chapter breakdown or time analysis can be added here */}
              <div className="font-bold mb-2">Live Questions:</div>
              <ul className="list-disc pl-6 mb-4">
                {questions.map((q, i) => (
                  <li key={q.id} className="mb-2">
                    Q{i + 1}{q.isCorrect ? " (Correct)" : !q.userAnswer ? " (Unattempted)" : " (Incorrect)"}: {q.question_text}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="mistake-patterns">
            <div>
              <div className="font-bold mb-2">Tag Frequency</div>
              <ul className="pl-4 mb-2">
                {tagStats.length === 0 ? (
                  <li className="text-gray-400">No tags yet.</li>
                ) : (
                  tagStats.map(({ tag, count }) =>
                    <li key={tag}>{tag}: <span className="font-bold">{count}</span></li>
                  )
                )}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceReportPage;
