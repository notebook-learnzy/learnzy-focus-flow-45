
import { supabase } from "@/integrations/supabase/client";

// For a chapter, topics array, and question count, get questions across all 5 sets
export async function fetchQuestionsForCustomPractice(
  chapterId: string,
  topics: string[],
  numQuestions: number
) {
  const setIds = ["a", "b", "c", "d", "e"];
  let allQuestions: any[] = [];
  for (let setId of setIds) {
    const table = getSupabaseTableName(chapterId, setId);
    const { data } = await supabase
      .from(table as any)
      .select("*")
      .in("topic", topics)
      .order("q_no", { ascending: true })
      .limit(50); // Defensive: don't fetch more than 50 per set
    if (Array.isArray(data)) {
      allQuestions = allQuestions.concat(data);
    }
  }
  // Shuffle and take up to numQuestions
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
}

function getSupabaseTableName(chapterKey: string, setType: string) {
  // Copy logic from TestQuestionPage and topic hook
  const tableMap: Record<string, string> = {
    "tissues": "chapter_7_tissues_set_",
    "body-fluids-circulation": "chapter_3_body_fluids_circulation_set_",
    "the-living-world": "chapter_1_living_world_set_",
    "biological-classification": "chapter_2_biological_classification_set_",
    "plant-kingdom": "chapter_3_plant_kingdom_set_",
    "plant-morphology": "chapter_5_morphology_of_flowering_plant_set_",
    "plant-anatomy": "chapter_6_anatomy_of_flowering_plant_set_",
    "cell-bio": "chapter_8_cell_bio_set_",
    "biomolecules": "chapter_9_biomolecules_set_",
    "cell-cycle": "chapter_10_cell_cycle_set_",
    "transport-plants": "chapter_11_transport_plants_set_",
    "mineral-nutrition": "chapter_12_mineral_nutrition_set_",
    "photosynthesis": "chapter_13_photosynthesis_set_",
    "respiration-plants": "chapter_14_respiration_plants_set_",
    "plant-growth": "chapter_15_plant_growth_set_",
  };
  if (tableMap[chapterKey]) return `${tableMap[chapterKey]}${setType.toLowerCase()}`;
  return `chapter_${chapterKey}_set_${setType.toLowerCase()}`;
}
