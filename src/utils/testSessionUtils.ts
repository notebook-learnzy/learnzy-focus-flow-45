
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
  // New timing fields
  questionViewedAt?: string;
  questionLeftAt?: string;
  detailedTimingEvents?: Array<{
    eventType: 'questionViewed' | 'questionLeft';
    timestamp: string;
    formattedTime: string;
  }>;
}

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
  // Initialize timing events for each question
  const questionsWithTiming = questionsData.map(q => ({
    ...q,
    detailedTimingEvents: []
  }));

  const row = {
    user_id,
    subject,
    class_id,
    chapter_id,
    set_id,
    total_questions: questionsData.length,
    questions_data: questionsWithTiming as any,
  };
  
  const { data, error } = await supabase
    .from("test_sessions")
    .insert([row])
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

// Update question timing in session
export async function updateQuestionTiming({
  sessionId,
  questionIndex,
  eventType,
}: {
  sessionId: string;
  questionIndex: number;
  eventType: 'questionViewed' | 'questionLeft';
}) {
  // Get current session
  const { data: session, error: fetchError } = await supabase
    .from("test_sessions")
    .select("questions_data")
    .eq("id", sessionId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const questionsData = Array.isArray(session.questions_data) 
    ? session.questions_data 
    : [];

  if (questionIndex >= 0 && questionIndex < questionsData.length) {
    const timestamp = new Date().toISOString();
    const formattedTime = formatTimestamp(timestamp);
    
    const timingEvent = {
      eventType,
      timestamp,
      formattedTime
    };

    // Add timing event to the question
    if (!questionsData[questionIndex].detailedTimingEvents) {
      questionsData[questionIndex].detailedTimingEvents = [];
    }
    questionsData[questionIndex].detailedTimingEvents.push(timingEvent);

    // Update specific timestamp fields
    if (eventType === 'questionViewed') {
      questionsData[questionIndex].questionViewedAt = formattedTime;
    } else if (eventType === 'questionLeft') {
      questionsData[questionIndex].questionLeftAt = formattedTime;
    }

    // Update the session
    const { error: updateError } = await supabase
      .from("test_sessions")
      .update({ questions_data: questionsData })
      .eq("id", sessionId);

    if (updateError) throw new Error(updateError.message);
  }
}

// Finalize test session with SM2 integration
export async function completeTestSession({
  sessionId,
  questionsData,
  questionTimes,
  chapterId,
  setId,
}: {
  sessionId: string;
  questionsData: QuestionDataBlock[];
  questionTimes: number[];
  chapterId?: string;
  setId?: string;
}) {
  const totalCorrect = questionsData.filter(q => q.isCorrect).length;
  const total = questionsData.length;
  const accuracy = Math.round((totalCorrect / total) * 100);
  
  const patch = {
    questions_data: questionsData as any,
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

  // Trigger SM2 update if we have chapter and set info
  if (chapterId && setId && typeof window !== 'undefined') {
    // Dispatch custom event with SM2 data for the hook to pick up
    window.dispatchEvent(new CustomEvent('sm2-update', {
      detail: { chapterId, setId, accuracy }
    }));
  }

  return { accuracy, totalCorrect, total };
}
