
import { useState, useEffect } from "react";
import { createTestSession } from "@/utils/testSessionUtils";

export function useTestSession(
  questions: any[],
  isCustom: boolean,
  chapterId: string | undefined,
  setId: string | undefined,
  buildQuestionsData: (questions: any[]) => any[]
) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  }, [questions, isCustom, chapterId, setId, sessionId, buildQuestionsData]);

  return {
    sessionId,
    setSessionId,
    sessionError: error
  };
}
