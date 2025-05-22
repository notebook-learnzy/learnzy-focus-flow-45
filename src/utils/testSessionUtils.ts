
import { supabase } from "@/integrations/supabase/client";

export interface QuestionDataBlock {
  id: string;
  text: string;
  correctAnswer: string;
  userAnswer: string | null;
  isCorrect: boolean;
  timeTaken: number;
  tags: string[];
  Subject: string;
  Chapter_name: string;
  Topic: string;
  Subtopic: string;
  Difficulty_Level: string;
  Question_Structure: string;
  Bloom_Taxonomy: string;
  Priority_Level: string | number;
  Time_to_Solve: number | null;
  Key_Concept_Tested: string;
  Common_Pitfalls: string;
  Option_A: string;
  Option_B: string;
  Option_C: string;
  Option_D: string;
  options: { id: string; text: string }[];
}

// Create new test session
export async function createTestSession({
  user_id,
  subject,
  class_id,
  chapter_id,
  set_id,
  questionsData,
  firstQuestionMeta,
}: {
  user_id: string;
  subject: string;
  class_id: string;
  chapter_id: string;
  set_id: string;
  questionsData: QuestionDataBlock[];
  firstQuestionMeta: any;
}) {
  const now = new Date().toISOString();
  const row = {
    user_id,
    subject,
    class_id,
    chapter_id,
    set_id,
    start_time: now,
    end_time: null,
    score: null,
    total_questions: questionsData.length,
    chapter_name: firstQuestionMeta.chapter_name ?? "",
    topic: firstQuestionMeta.topic ?? "",
    subtopic: firstQuestionMeta.subtopic ?? "",
    difficulty_level: firstQuestionMeta.difficulty_level ?? "",
    question_structure: firstQuestionMeta.question_type ?? "",
    bloom_taxonomy: firstQuestionMeta.bloom_taxonomy ?? "",
    priority_level: firstQuestionMeta.priority_level ?? "",
    time_to_solve: firstQuestionMeta.time_to_solve ?? null,
    key_concept_tested: firstQuestionMeta.key_concept_tested ?? "",
    common_pitfalls: firstQuestionMeta.common_pitfalls ?? "",
    questions_data: questionsData,
  };
  const { data, error } = await supabase
    .from("test_sessions")
    .insert([row])
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

// Finalize test session
export async function completeTestSession({
  sessionId,
  questionsData,
  questionTimes,
}: {
  sessionId: string;
  questionsData: QuestionDataBlock[];
  questionTimes: number[];
}) {
  const now = new Date().toISOString();
  const totalCorrect = questionsData.filter(q => q.isCorrect).length;
  const total = questionsData.length;
  const score = Math.round((totalCorrect / total) * 100);
  const patch = {
    end_time: now,
    score,
    questions_data: questionsData,
    total_correct: totalCorrect,
    total_incorrect: questionsData.filter(q => q.userAnswer && !q.isCorrect).length,
    total_unattempted: questionsData.filter(q => !q.userAnswer).length,
    total_time: questionTimes.reduce((sum, v) => sum + (v || 0), 0),
  };
  const { error } = await supabase
    .from("test_sessions")
    .update(patch)
    .eq("id", sessionId);

  if (error) throw new Error(error.message);
}

// [OPTIONAL] Update a question answer/tag (stub for future): currently not required if all update at completion.
