
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
  // If it's already an array, just return
  if (Array.isArray(raw)) return raw as QuestionData[];
  // If it's a string, try to parse
  if (typeof raw === "string") {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr as QuestionData[];
    } catch {}
  }
  // If it's a JSON value or something else, attempt conversion
  if (raw && typeof raw === "object" && "length" in raw) {
    return Array.from(raw) as QuestionData[];
  }
  return [];
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
      const { data, error } = await supabase
        .from("test_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      if (!ignore) {
        if (data) {
          setSession({
            ...data,
            questions_data: safeQuestionsData(data.questions_data)
          });
          setQuestions(safeQuestionsData(data.questions_data));
        }
        setLoading(false);
      }
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
          if (payload.new && payload.new.questions_data) {
            setSession({
              ...payload.new,
              questions_data: safeQuestionsData(payload.new.questions_data)
            });
            setQuestions(safeQuestionsData(payload.new.questions_data));
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
