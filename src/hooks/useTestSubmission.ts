
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { completeTestSession, updateQuestionTiming } from "@/utils/testSessionUtils";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";

export function useTestSubmission() {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const customPractice = useCustomPracticeTest();

  const submitTest = async ({
    isCustom,
    sessionId,
    currQ,
    questions,
    selected,
    questionTimes,
    hrvs,
    subjectId,
    classId,
    chapterId,
    setId
  }: {
    isCustom: boolean;
    sessionId: string | null;
    currQ: number;
    questions: any[];
    selected: (number | undefined)[];
    questionTimes: number[];
    hrvs: number[];
    subjectId?: string;
    classId?: string;
    chapterId?: string;
    setId?: string;
  }) => {
    setSaving(true);

    // Record leaving the final question
    if (sessionId) {
      await updateQuestionTiming({
        sessionId,
        questionIndex: currQ,
        eventType: 'questionLeft'
      }).catch(error => {
        console.error('Failed to record final question left timing:', error);
      });
    }

    // Get the current session data with timing information
    const { data: currentSession } = await supabase
      .from("test_sessions")
      .select("questions_data")
      .eq("id", sessionId)
      .single();

    let questionsWithTiming = [];
    
    if (currentSession?.questions_data) {
      // Use existing questions data that already has timing information
      questionsWithTiming = Array.isArray(currentSession.questions_data) 
        ? currentSession.questions_data 
        : [];
    }

    // Update only the answer-related fields, preserving timing data
    const updatedQuestionsData = questionsWithTiming.map((q: any, i: number) => {
      const userAnsIdx = selected[i];
      const userAnswer = userAnsIdx !== undefined ? ["A", "B", "C", "D"][userAnsIdx] : null;
      const correctAns = (questions[i]?.correct_answer || "A").toUpperCase();
      const isCorrect = userAnswer && userAnswer === correctAns;
      
      return {
        ...q, // Preserve all existing data including timing
        userAnswer,
        isCorrect: !!isCorrect,
        timeTaken: questionTimes[i],
      };
    });

    if (!isCustom && sessionId) {
      try {
        const { accuracy } = await completeTestSession({
          sessionId,
          questionsData: updatedQuestionsData,
          questionTimes,
          chapterId,
          setId
        });
        
        setSaving(false);
        
        // Navigate with additional SM2 context
        navigate(
          `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/analyze?sessionId=${sessionId}&accuracy=${accuracy}`,
          { 
            state: { 
              sessionId: sessionId,
              accuracy,
              chapterId,
              setId
            } 
          }
        );
      } catch (error: any) {
        setSaving(false);
        throw new Error("Failed to finalize and save results. " + error.message);
      }
    } else if (isCustom) {
      setSaving(true);
      customPractice.setCustomResults({
        questions,
        selected,
        questionTimes,
        hrvs,
        results: updatedQuestionsData,
      });
      setSaving(false);
      window.location.assign(`/academics/custom/analyze`);
    }
  };

  return { submitTest, saving };
}
