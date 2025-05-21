
import { supabase } from "@/integrations/supabase/client";

// Returns a promise of unique sorted topic strings for a chapter (across sets a-e)
export async function useAvailableTopics(chapterId: string): Promise<string[]> {
  const setIds = ["a", "b", "c", "d", "e"];
  const allTopicSets: string[][] = [];

  for (let setId of setIds) {
    const table = getSupabaseTableName(chapterId, setId);
    const { data, error } = await supabase.from(table as any).select("topic");

    if (error || !Array.isArray(data)) {
      continue; // skip this set if error or data isn't an array
    }

    const topics: string[] = data
      .filter(row => typeof row === "object" && row !== null && "topic" in row && typeof row.topic === "string")
      .map(row => row.topic as string)
      .filter(Boolean);

    allTopicSets.push(topics);
  }

  // Flatten, dedup, and sort topics
  const allTopics = [...new Set(allTopicSets.flat().filter(Boolean))];
  return allTopics.sort();
}

// App table name logic copied from TestQuestionPage
function getSupabaseTableName(chapterKey: string, setType: string) {
  // Use same logic as your codebase's
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
