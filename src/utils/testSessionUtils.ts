
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
}: {
  user_id: string;
  subject: string;
  class_id: string;
  chapter_id: string;
  set_id: string;
  questionsData: QuestionDataBlock[];
}) {
  const now = new Date().toISOString();
  // Only allowed fields
  const row = {
    user_id,
    subject,
    class_id,
    chapter_id,
    set_id,
    total_questions: questionsData.length,
    questions_data: questionsData as any, // Cast to any for supabase-js Json
    // 'created_at' and 'updated_at' are auto-set if defined in Supabase table
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
  // NOTE: All analytic metadata must go inside questions_data JSON!
  const totalCorrect = questionsData.filter(q => q.isCorrect).length;
  const total = questionsData.length;
  const score = Math.round((totalCorrect / total) * 100);
  const patch = {
    questions_data: questionsData as any,
    total_correct: totalCorrect,
    total_incorrect: questionsData.filter(q => q.userAnswer && !q.isCorrect).length,
    total_unattempted: questionsData.filter(q => !q.userAnswer).length,
    total_time: questionTimes.reduce((sum, v) => sum + (v || 0), 0),
    // 'updated_at' will auto-update if configured in Supabase
  };
  const { error } = await supabase
    .from("test_sessions")
    .update(patch)
    .eq("id", sessionId);

  if (error) throw new Error(error.message);
}
