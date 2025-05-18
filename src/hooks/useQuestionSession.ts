
import { useState } from "react";

export type UserQuestionSession = {
  answers: (string | undefined)[]; // "a"/"b"/"c"/"d" or undefined
  times: number[]; // seconds spent per question
  focus: number[]; // simulated focus score per question
  startedAt: number; // ms
  finishedAt?: number;
};

export function useQuestionSession(questionCount: number) {
  const [session, setSession] = useState<UserQuestionSession>({
    answers: Array(questionCount).fill(undefined),
    times: Array(questionCount).fill(0),
    focus: Array(questionCount).fill(75),
    startedAt: Date.now(),
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

  const markFinished = () => {
    setSession(prev => ({ ...prev, finishedAt: Date.now() }));
  };

  return { session, saveAnswer, markFinished, setSession };
}
