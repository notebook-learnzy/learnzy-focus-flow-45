
export type QuestionType = "MCQ" | "Assertion-Reason" | "Fill-in-the-blank" | "Match";
export type BloomTaxonomy = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
export type CorrectAnswer = "A" | "B" | "C" | "D";
export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export type Question = {
  id: string;
  question_text: string;
  figure?: string; // URL/File path
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: CorrectAnswer;
  subject: string;
  chapter_name: string;
  topic: string;
  subtopic: string;
  difficulty_level: DifficultyLevel;
  question_type: QuestionType;
  bloom_taxonomy: BloomTaxonomy;
  priority_level: 1 | 2 | 3 | 4 | 5; // 1 = highest
  time_to_solve: number; // seconds
  key_concept_tested: string;
  common_pitfalls?: string;
  creation_timestamp: string; // ISO date string
  last_updated_timestamp: string; // ISO date string
};

export type QuestionSet = {
  id: string;
  set_type: "A" | "B" | "C" | "D" | "E";
  chapter_id: string;
  questions: Question[];
  scheduled_date?: string; // ISO date string
  completed_date?: string; // ISO date string
  focus_score?: number; // 0-100
  interval_adjusted?: boolean; // If the interval was dynamically adjusted
};
