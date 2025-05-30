
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTagOptions } from "@/utils/tagsManagement";
import { updateQuestionTags } from "@/utils/tagsManagement";

// Types for question and session
export interface QuestionData {
  id: string;
  question_text?: string;
  userAnswer?: string | null;
  isCorrect?: boolean;
  tags?: string[];
  [key: string]: any;
}
export interface TestSession {
  id: string;
  user_id: string;
  questions_data: QuestionData[];
}

export interface UsePreAnalysisStateProps {
  sessionId: string;
}

function safeQuestionsData(raw: any): QuestionData[] {
  if (Array.isArray(raw)) return raw as QuestionData[];
  if (typeof raw === "string") {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr as QuestionData[];
    } catch {}
  }
  if (raw && typeof raw === "object" && "length" in raw) {
    return Array.from(raw) as QuestionData[];
  }
  return [];
}

function hasSessionPayload(
  maybe: any
): maybe is { questions_data: unknown; id: string; user_id: string } {
  return (
    maybe &&
    typeof maybe === "object" &&
    typeof maybe.questions_data !== "undefined" &&
    typeof maybe.id === "string" &&
    typeof maybe.user_id === "string"
  );
}

export function usePreAnalysisState({ sessionId }: UsePreAnalysisStateProps) {
  const [session, setSession] = useState<TestSession | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    let ignore = false;
    async function fetchSession() {
      const { data } = await supabase
        .from("test_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      if (!ignore && hasSessionPayload(data)) {
        const questionList = safeQuestionsData(data.questions_data);
        setSession({
          id: data.id,
          user_id: data.user_id,
          questions_data: questionList
        });
        setQuestions(questionList);
      }
      setLoading(false);
    }
    fetchSession();

    // Listen for row changes and update in real-time
    const sub = supabase
      .channel("test_sessions_row")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "test_sessions",
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new && hasSessionPayload(payload.new)) {
            const questionList = safeQuestionsData(payload.new.questions_data);
            setSession({
              id: payload.new.id,
              user_id: payload.new.user_id,
              questions_data: questionList
            });
            setQuestions(questionList);
          }
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(sub);
    };
  }, [sessionId]);

  // Tag toggle logic
  async function handleTagToggle(qid: string, tag: string) {
    const qIdx = questions.findIndex((q) => q.id === qid);
    if (qIdx === -1) return;
    const q = questions[qIdx];
    const updatedTags = q.tags?.includes(tag)
      ? (q.tags || []).filter((t) => t !== tag)
      : [...(q.tags || []), tag];
    // Optimistic update UI
    const updatedQuestions = [...questions];
    updatedQuestions[qIdx] = { ...q, tags: updatedTags };
    setQuestions(updatedQuestions);

    // Supabase update
    await updateQuestionTags(sessionId, qid, updatedTags);
  }

  const incorrectQuestions = questions.filter(
    (q) => q.userAnswer && !q.isCorrect
  );
  const unattemptedQuestions = questions.filter((q) => !q.userAnswer);

  return {
    loading,
    questions,
    incorrectQuestions,
    unattemptedQuestions,
    handleTagToggle,
    tagOptions: getTagOptions(),
    session,
  };
}
