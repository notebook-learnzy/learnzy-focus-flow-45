
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSupabaseTableName } from "@/utils/chapterTableMapping";
import { createTestSession, updateQuestionTiming } from "@/utils/testSessionUtils";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";

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
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [hrvs, setHRVs] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [sessionId, setSessionId] = useState<string | null>(null);

  const customPractice = useCustomPracticeTest();

  // Utility: builds questions_data as per your schema spec
  function buildQuestionsData(questions: any[]) {
    return questions.map((q: any, i: number) => {
      const options = [
        { id: "A", text: q.option_a },
        { id: "B", text: q.option_b },
        { id: "C", text: q.option_c },
        { id: "D", text: q.option_d },
      ];
      return {
        id: q.id || q.q_no?.toString() || `${i}`,
        text: q.question_text,
        correctAnswer: (q.correct_answer || "A").toUpperCase(),
        userAnswer: null,
        isCorrect: false,
        timeTaken: 0,
        tags: [],
        Subject: q.subject,
        Chapter_name: q.chapter_name,
        Topic: q.topic,
        Subtopic: q.subtopic,
        Difficulty_Level: q.difficulty_level,
        Question_Structure: q.question_type,
        Bloom_Taxonomy: q.bloom_taxonomy,
        Priority_Level: q.priority_level,
        Time_to_Solve: q.time_to_solve,
        Key_Concept_Tested: q.key_concept_tested,
        Common_Pitfalls: q.common_pitfalls,
        Option_A: q.option_a,
        Option_B: q.option_b,
        Option_C: q.option_c,
        Option_D: q.option_d,
        options,
        // Initialize timing fields
        questionViewedAt: undefined,
        questionLeftAt: undefined,
        detailedTimingEvents: [],
      };
    });
  }

  // Handle custom practice test
  useEffect(() => {
    if (isCustom && customPractice.session) {
      setQuestions(customPractice.session.questions);
      setSelected(new Array(customPractice.session.questions.length).fill(undefined));
      setQuestionTimes(new Array(customPractice.session.questions.length).fill(0));
      setHRVs(new Array(customPractice.session.questions.length).fill(70));
      setStartTime(Date.now());
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
      setQuestionTimes(new Array((data || []).length).fill(0));
      setHRVs(new Array((data || []).length).fill(70));
      setStartTime(Date.now());
      setIsLoading(false);
    }
    fetchQuestions();
  }, [chapterId, setId]);

  // Handle question timing and HRV updates when question changes
  useEffect(() => {
    if (questions.length === 0) return;

    // Reset timing for current question
    setQuestionTimes(times => {
      const newTimes = [...times];
      newTimes[currQ] = 0;
      return newTimes;
    });
    setStartTime(Date.now());
    setHRVs(hrvs => {
      const newH = [...hrvs];
      newH[currQ] = 60 + Math.floor(Math.random() * 30);
      return newH;
    });

    // Record question viewed timing
    if (sessionId) {
      console.log(`Recording questionViewed for question ${currQ + 1}`);
      updateQuestionTiming({
        sessionId,
        questionIndex: currQ,
        eventType: 'questionViewed'
      }).catch(error => {
        console.error('Failed to record question viewed timing:', error);
      });
    }
  }, [currQ, sessionId, questions.length]);

  // Update question times every second
  useEffect(() => {
    if (isLoading || questions.length === 0) return;
    
    const interval = setInterval(() => {
      setQuestionTimes(times => {
        const newTimes = [...times];
        newTimes[currQ] = Math.floor((Date.now() - startTime) / 1000);
        return newTimes;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currQ, startTime, isLoading, questions.length]);

  // Create test session
  useEffect(() => {
    if (isCustom || !questions.length || sessionId) return;
    const testUserId = "00000000-0000-0000-0000-000000000001";
    async function doCreateSession() {
      try {
        const questionsData = buildQuestionsData(questions);
        console.log('Creating session with timing-enabled questions:', questionsData[0]);
        const id = await createTestSession({
          user_id: testUserId,
          subject: "", // Will be filled by parent component
          class_id: "", // Will be filled by parent component
          chapter_id: chapterId ?? "",
          set_id: setId ?? "",
          questionsData,
        });
        setSessionId(id);
        console.log('Session created with ID:', id);
      } catch (error: any) {
        setError("Failed to save initial session. Please try again. " + error.message);
      }
    }
    doCreateSession();
  }, [questions, isCustom, chapterId, setId, sessionId]);

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
    if (sessionId) {
      console.log(`Recording questionLeft for question ${currQ + 1}`);
      await updateQuestionTiming({
        sessionId,
        questionIndex: currQ,
        eventType: 'questionLeft'
      }).catch(error => {
        console.error('Failed to record question left timing:', error);
      });
    }
    setCurrQ((c) => Math.min(questions.length - 1, c + 1));
  };

  const prevQ = async () => {
    if (sessionId) {
      console.log(`Recording questionLeft for question ${currQ + 1}`);
      await updateQuestionTiming({
        sessionId,
        questionIndex: currQ,
        eventType: 'questionLeft'
      }).catch(error => {
        console.error('Failed to record question left timing:', error);
      });
    }
    setCurrQ((c) => Math.max(0, c - 1));
  };

  return {
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
    setSessionId,
    buildQuestionsData
  };
}
