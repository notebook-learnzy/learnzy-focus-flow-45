
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Helper to map chapter keys to Supabase table names.
function getSupabaseTableName(chapterKey: string, setType: string) {
  // Base chapter mapping for existing chapters
  if (chapterKey === "tissues") {
    return `chapter_7_tissues_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "the-living-world") {
    return `chapter_1_living_world_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "biological-classification") {
    return `chapter_2_biological_classification_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "plant-kingdom") {
    return `chapter_3_plant_kingdom_set_${setType.toLowerCase()}`;
  }
  
  // New mappings for biomolecules, photosynthesis, and respiration
  if (chapterKey === "biomolecules") {
    return `chapter_9_biomolecules_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "photosynthesis") {
    return `chapter_11_photosynthesis_in_higher_plants_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "respiration-plants") {
    return `chapter_12_respiration_in_plants_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "cell-bio") {
    return `chapter_8_cell_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "cell-cycle") {
    return `chapter_10_cell_cycle_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "plant-morphology") {
    return `chapter_5_morphology_of_flowering_plant_set_${setType.toLowerCase()}`;
  }
  if (chapterKey === "plant-anatomy") {
    return `chapter_6_anatomy_of_flowering_plant_set_${setType.toLowerCase()}`;
  }

  // Fallback: generic mapping if table exists in this form
  return `chapter_${chapterKey}_set_${setType.toLowerCase()}`;
}

// Fetches from the Supabase table
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
