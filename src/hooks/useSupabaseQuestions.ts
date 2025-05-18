
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fetches from the Supabase table. Only for The Living World/Set A
export function useSupabaseQuestions(chapterKey: string, setType: string) {
  return useQuery({
    queryKey: ["supabase-questions", chapterKey, setType],
    queryFn: async () => {
      if (chapterKey === "the-living-world" && setType === "A") {
        const { data, error } = await supabase
          .from("chapter_1_living_world_set_a")
          .select("*")
          .order("q_no", { ascending: true })
          .limit(50);

        if (error) throw new Error(error.message);

        return (data || []).map((q, idx) => ({
          q_no: q.q_no,
          id: `living-world-q${q.q_no}`,
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          correct_answer: q.correct_answer?.toLowerCase() ?? "a",
          figure: q.figure,
          time_to_solve: q.time_to_solve ?? 60,
          topic: q.topic || "",
          subtopic: q.subtopic || "",
          difficulty_level: q.difficulty_level ?? "Easy",
        }));
      }
      return [];
    }
  });
}
