import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Helper to map chapter keys to Supabase table names.
// For "tissues", the table is chapter_7_tissues_set_{setType} (per your example).
// You may extend this logic to other chapters as needed.
function getSupabaseTableName(chapterKey: string, setType: string) {
  // Mapping logic for Zoology 11: "tissues" --> chapter_7_tissues_set_{setType}
  if (chapterKey === "tissues") {
    return `chapter_7_tissues_set_${setType.toLowerCase()}`;
  }

  // Other example mappings (add more if needed, else assume: chapter_X_chapterKey_set_setType)
  // e.g. "the-living-world" => "chapter_1_living_world_set_a"
  if (chapterKey === "the-living-world") {
    return `chapter_1_living_world_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "biological-classification") {
    return `chapter_2_biological_classification_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "plant-kingdom") {
    return `chapter_3_plant_kingdom_set_${setType.toLowerCase()}`;
  }
  // ...extend with other mappings, or default fallback...

  // Fallback: generic mapping if table exists in this form
  return `chapter_${chapterKey}_set_${setType.toLowerCase()}`;
}

// Fetches from the Supabase table. Only for The Living World/Set A
export function useSupabaseQuestions(chapterKey: string, setType: string) {
  return useQuery({
    queryKey: ["supabase-questions", chapterKey, setType],
    queryFn: async () => {
      const tableName = getSupabaseTableName(chapterKey, setType);
      // Use "as any" to satisfy TS restrictions on dynamic table names.
      const { data, error } = await supabase
        .from(tableName as any)
        .select("*")
        .order("q_no", { ascending: true })
        .limit(50);
      if (error) throw new Error(error.message);
      if (!data) return [];
      // Map the data to frontend format (generic)
      return data.map((q: any, idx: number) => ({
        q_no: q.q_no,
        id: `${chapterKey}-q${q.q_no}`,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_answer: q.correct_answer?.toLowerCase?.() ?? "a",
        figure: q.figure,
        time_to_solve: q.time_to_solve ?? 60,
        topic: q.topic || "",
        subtopic: q.subtopic || "",
        difficulty_level: q.difficulty_level ?? "Easy",
        // ...add other fields if needed...
      }));
    }
  });
}
