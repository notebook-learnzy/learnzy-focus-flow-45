
// Utility to convert a human/route chapter key to a Supabase table name.
// Handles all Botany & Zoology class 11 chapters and sets (A/B/C...).
export function getSupabaseTableName(chapterKey: string, setType: string) {
  // These mappings are based on your table-naming scheme.
  // Add/adjust for chapters with special keys/numbers if necessary.
  
  // If you have more "special" cases, add them here:
  const tableMap: Record<string, string> = {
    // Zoology 11
    "tissues": "chapter_7_tissues_set_", // STRUCTURAL ORGANISATION IN ANIMALS
    "body-fluids-circulation": "chapter_3_body_fluids_circulation_set_",
    // Botany 11
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
    // Expand as needed!
  };

  if (tableMap[chapterKey]) {
    return `${tableMap[chapterKey]}${setType.toLowerCase()}`;
  }
  // Fallback for generic (for chapters without a special mapping)
  return `chapter_${chapterKey}_set_${setType.toLowerCase()}`;
}
