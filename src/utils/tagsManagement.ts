
import { supabase } from "@/integrations/supabase/client";

export const tagOptions = [
  "Didn't Revise Concept",
  "Misread Question",
  "Time Pressure",
  "Silly Mistake",
  "Careless Error",
  "Need Practice",
];

export function getTagOptions() {
  return tagOptions;
}

export async function updateQuestionTags(
  sessionId: string,
  qId: string,
  updatedTags: string[]
): Promise<void> {
  // Fetch test session
  const { data: session } = await supabase
    .from("test_sessions")
    .select("questions_data")
    .eq("id", sessionId)
    .maybeSingle();
  if (!session || typeof session.questions_data === "undefined") return;
  let questions: any[] = [];
  if (Array.isArray(session.questions_data)) {
    questions = session.questions_data;
  } else if (typeof session.questions_data === "string") {
    try {
      questions = JSON.parse(session.questions_data);
    } catch {
      questions = [];
    }
  }
  const idx = questions.findIndex((q) => q.id === qId);
  if (idx === -1) return;

  questions[idx].tags = updatedTags;
  // Dummy user_id placeholder since RLS requires it
  const dummyUserId = "00000000-0000-0000-0000-000000000000";
  await supabase
    .from("test_sessions")
    .update({ questions_data: questions, user_id: dummyUserId })
    .eq("id", sessionId);
}

// Stat analysis for results page
export function getTagStats(questions: { tags?: string[] }[]) {
  const tagCount: Record<string, number> = {};
  questions.forEach((q) => {
    (q.tags || []).forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  // Sorted descending
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}
