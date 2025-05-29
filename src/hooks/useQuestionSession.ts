
import { useState } from "react";

export type UserQuestionSession = {
  answers: (string | undefined)[]; // "a"/"b"/"c"/"d" or undefined
  times: number[]; // seconds spent per question
  focus: number[]; // simulated focus score per question
  startedAt: number; // ms
  finishedAt?: number;
  // New timing fields
  questionTimingEvents: Array<Array<{
    eventType: 'questionViewed' | 'questionLeft';
    timestamp: string;
    formattedTime: string;
  }>>;
};

// Helper to format timestamp in your preferred format
function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
  return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function useQuestionSession(questionCount: number) {
  const [session, setSession] = useState<UserQuestionSession>({
    answers: Array(questionCount).fill(undefined),
    times: Array(questionCount).fill(0),
    focus: Array(questionCount).fill(75),
    startedAt: Date.now(),
    questionTimingEvents: Array(questionCount).fill(null).map(() => []),
  });

  const saveAnswer = (idx: number, answer: string, time: number, focus: number) => {
    setSession(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[idx] = answer;
      const newTimes = [...prev.times];
      newTimes[idx] = time;
      const newFocus = [...prev.focus];
      newFocus[idx] = focus;
      return { ...prev, answers: newAnswers, times: newTimes, focus: newFocus };
    });
  };

  const recordQuestionTiming = (questionIndex: number, eventType: 'questionViewed' | 'questionLeft') => {
    const timestamp = new Date().toISOString();
    const formattedTime = formatTimestamp(timestamp);
    
    setSession(prev => {
      const newTimingEvents = [...prev.questionTimingEvents];
      if (!newTimingEvents[questionIndex]) {
        newTimingEvents[questionIndex] = [];
      }
      newTimingEvents[questionIndex] = [...newTimingEvents[questionIndex], {
        eventType,
        timestamp,
        formattedTime
      }];
      
      return { ...prev, questionTimingEvents: newTimingEvents };
    });
  };

  const markFinished = () => {
    setSession(prev => ({ ...prev, finishedAt: Date.now() }));
  };

  return { 
    session, 
    saveAnswer, 
    markFinished, 
    setSession,
    recordQuestionTiming 
  };
}
