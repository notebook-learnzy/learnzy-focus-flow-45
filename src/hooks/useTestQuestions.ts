
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSupabaseTableName } from "@/utils/chapterTableMapping";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";
import { useQuestionTiming } from "./useQuestionTiming";
import { useTestSession } from "./useTestSession";
import { buildQuestionsData } from "@/utils/questionDataBuilder";

export function useTestQuestions(
  chapterId: string | undefined,
  setId: string | undefined,
  isCustom: boolean
) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currQ, setCurrQ] = useState(0);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [hrvs, setHRVs] = useState<number[]>([]);

  const customPractice = useCustomPracticeTest();

  const { questionTimes, setQuestionTimes, recordQuestionLeft } = useQuestionTiming(
    null, // Will be set by session hook
    currQ,
    questions.length
  );

  const { sessionId, setSessionId, sessionError } = useTestSession(
    questions,
    isCustom,
    chapterId,
    setId,
    buildQuestionsData
  );

  // Update timing hook with sessionId
  const timingHook = useQuestionTiming(sessionId, currQ, questions.length);

  // Handle custom practice test
  useEffect(() => {
    if (isCustom && customPractice.session) {
      setQuestions(customPractice.session.questions);
      setSelected(new Array(customPractice.session.questions.length).fill(undefined));
      setHRVs(new Array(customPractice.session.questions.length).fill(70));
      setIsLoading(false);
    }
  }, [isCustom, customPractice.session]);

  // Fetch questions from database
  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setError(null);

      if (!chapterId || !setId) {
        setQuestions([]);
        setIsLoading(false);
        setError("Missing chapter or set information.");
        return;
      }
      const tableName = getSupabaseTableName(chapterId, setId);

      const { data, error } = await supabase
        .from(tableName as any)
        .select("*")
        .order("q_no", { ascending: true })
        .limit(50);

      if (error) {
        setError(error.message);
        setQuestions([]);
        setIsLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setError("No questions found for this set yet.");
        setQuestions([]);
        setIsLoading(false);
        return;
      }

      setQuestions(data || []);
      setSelected(new Array((data || []).length).fill(undefined));
      setHRVs(new Array((data || []).length).fill(70));
      setIsLoading(false);
    }
    fetchQuestions();
  }, [chapterId, setId]);

  // Update HRVs when question changes
  useEffect(() => {
    if (questions.length === 0) return;
    setHRVs(hrvs => {
      const newH = [...hrvs];
      newH[currQ] = 60 + Math.floor(Math.random() * 30);
      return newH;
    });
  }, [currQ, questions.length]);

  const handleOption = (idx: number) => {
    setSelected(sels => {
      const up = [...sels];
      up[currQ] = idx;
      return up;
    });
    setHRVs(h => {
      const hn = [...h];
      hn[currQ] = 60 + Math.floor(Math.random() * 30);
      return hn;
    });
  };

  const nextQ = async () => {
    await timingHook.recordQuestionLeft();
    setCurrQ((c) => Math.min(questions.length - 1, c + 1));
  };

  const prevQ = async () => {
    await timingHook.recordQuestionLeft();
    setCurrQ((c) => Math.max(0, c - 1));
  };

  // Merge session error with fetch error
  const finalError = error || sessionError;

  return {
    questions,
    isLoading,
    error: finalError,
    currQ,
    selected,
    questionTimes: timingHook.questionTimes,
    hrvs,
    sessionId,
    handleOption,
    nextQ,
    prevQ,
    setSessionId,
    buildQuestionsData
  };
}
