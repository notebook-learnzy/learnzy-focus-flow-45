
// Example format for Ideal NEET Journey entry, for Shiv's training.
// You can upload, edit, or provide data in this structure to populate the `ideal_journey` table.

export type IdealJourneyEntry = {
  subject: string;
  chapter_id: string;
  day_number: number;
  task_title: string;
  ideal_date?: string; // ISO date string "2025-05-21"
  description?: string;
  extra?: Record<string, any>;
};

// Example array
export const exampleIdealJourney: IdealJourneyEntry[] = [
  {
    subject: "Botany",
    chapter_id: "the-living-world",
    day_number: 1,
    task_title: "Read Introduction to NEET Biology",
    ideal_date: "2025-05-21",
    description: "Cover fundamentals and MCQ habits for NEET bio success.",
    extra: {
      estimated_time: "45m",
      focus: "engagement"
    }
  },
  {
    subject: "Botany",
    chapter_id: "the-living-world",
    day_number: 2,
    task_title: "Complete Set A: Living World Questions",
    ideal_date: "2025-05-22",
    description: "Practice MCQs using Chapter 1, Set A.",
  }
  // ...add more as needed...
];
