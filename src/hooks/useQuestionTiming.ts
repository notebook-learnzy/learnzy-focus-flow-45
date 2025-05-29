
import { useState, useEffect } from "react";
import { updateQuestionTiming } from "@/utils/testSessionUtils";

export function useQuestionTiming(
  sessionId: string | null,
  currQ: number,
  questionsLength: number
) {
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());

  // Initialize timing arrays when questions change
  useEffect(() => {
    if (questionsLength > 0) {
      setQuestionTimes(new Array(questionsLength).fill(0));
    }
  }, [questionsLength]);

  // Handle question timing when question changes
  useEffect(() => {
    if (questionsLength === 0) return;

    // Reset timing for current question
    setQuestionTimes(times => {
      const newTimes = [...times];
      newTimes[currQ] = 0;
      return newTimes;
    });
    setStartTime(Date.now());

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
  }, [currQ, sessionId, questionsLength]);

  // Update question times every second
  useEffect(() => {
    if (questionsLength === 0) return;
    
    const interval = setInterval(() => {
      setQuestionTimes(times => {
        const newTimes = [...times];
        newTimes[currQ] = Math.floor((Date.now() - startTime) / 1000);
        return newTimes;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currQ, startTime, questionsLength]);

  const recordQuestionLeft = async () => {
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
  };

  return {
    questionTimes,
    setQuestionTimes,
    recordQuestionLeft
  };
}
