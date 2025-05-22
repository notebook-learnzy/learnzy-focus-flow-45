
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AcademicAnalyticsSection from "@/components/Performance/AcademicAnalyticsSection";
import WellnessAnalyticsSection from "@/components/Performance/WellnessAnalyticsSection";
import RevisionScheduleSection from "@/components/Performance/RevisionScheduleSection";

// Type guard for session data
function hasQuestionsData(maybe: any): maybe is { questions_data: unknown } {
  return !!maybe && typeof maybe === "object" && typeof maybe.questions_data !== "undefined";
}
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
function useQueryParam(name: string): string | undefined {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get(name) ?? undefined;
}

// Page uses the actual attempt data.
const PerformanceReportPage = () => {
  // Try to get sessionId from params or query
  const params = useParams<{ sessionId?: string; subjectId?: string; classId?: string; chapterId?: string; setId?: string }>();
  const location = useLocation();
  const sessionId =
    params.sessionId ||
    useQueryParam("sessionId");

  // For "nice back" navigation
  const navigate = useNavigate();

  // Load data from test_sessions
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [scores, setScores] = useState({
    correct: 0,
    total: 0,
    unattempted: 0,
  });

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
      if (data && hasQuestionsData(data) && !ignore) {
        const qdata = safeQuestionsData(data.questions_data);
        setQuestions(qdata);
        const correct = qdata.filter((q: any) => q.isCorrect).length;
        const unattempted = qdata.filter((q: any) => !q.userAnswer).length;
        setScores({
          correct,
          total: qdata.length,
          unattempted,
        });
      }
      setLoading(false);
    }
    fetchSession();

    // Listen for changes to session info
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
          if (payload.new && hasQuestionsData(payload.new)) {
            const qdata = safeQuestionsData(payload.new.questions_data);
            setQuestions(qdata);
            const correct = qdata.filter((q: any) => q.isCorrect).length;
            const unattempted = qdata.filter((q: any) => !q.userAnswer).length;
            setScores({
              correct,
              total: qdata.length,
              unattempted,
            });
          }
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(sub);
    };
  }, [sessionId]);

  if (!sessionId) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FEF9F1] text-lg">No sessionId provided. Please complete a test and click "Analyze" to access your performance report.</div>;
  }
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FEF9F1]">Loading...</div>;

  // Split page into the three requested sections
  return (
    <div className="bg-[#FEF9F1] min-h-screen py-10 px-1">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Button variant="outline" onClick={() => navigate("/academics") } className="mb-6">
          ← Back to Academics
        </Button>
        {/* Title and quick stats */}
        <h2 className="text-2xl font-bold text-[#FFBD59] mb-2">Performance Report</h2>
        <div className="mb-5 flex flex-wrap gap-3 items-center">
          <div className="font-semibold text-md">Score:
            <span className="text-[#7356FF] ml-2">{scores.correct}/{scores.total}</span>
          </div>
          <div className="text-gray-500 text-sm ml-2">Unattempted: {scores.unattempted}</div>
        </div>

        {/* Tabs for flow between analytics */}
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="flex mb-4 bg-white rounded-xl shadow">
            <TabsTrigger value="academic" className="flex-1">Academic Analytics</TabsTrigger>
            <TabsTrigger value="wellness" className="flex-1">Mental Wellness</TabsTrigger>
            <TabsTrigger value="revision" className="flex-1">Revision Plan</TabsTrigger>
          </TabsList>
          {/* Section 1: Academic */}
          <TabsContent value="academic">
            <AcademicAnalyticsSection questions={questions} />
          </TabsContent>
          {/* Section 2: Wellness */}
          <TabsContent value="wellness">
            <WellnessAnalyticsSection questions={questions} />
          </TabsContent>
          {/* Section 3: Revision */}
          <TabsContent value="revision">
            <RevisionScheduleSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceReportPage;
