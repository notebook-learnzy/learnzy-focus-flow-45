
export type FocusData = {
  question_id: string;
  focus_score: number;
  time_spent: number; // seconds
  is_correct: boolean;
};

export type SessionReport = {
  id: string;
  question_set_id: string;
  date: string; // ISO date string
  overall_focus_score: number;
  focus_timeline: FocusData[];
  meditation_completed: boolean;
  meditation_skipped: boolean;
  total_time: number; // seconds
  correct_answers: number;
  total_questions: number;
};

export type BloomSkillProfile = {
  remember: number; // 0-100 proficiency
  understand: number;
  apply: number;
  analyze: number;
  evaluate: number;
  create: number;
};

export type ActionCard = {
  id: string;
  title: string;
  description: string;
  action_type: "revision" | "practice" | "wellness";
  target: string; // topic, chapter, or wellness activity
  priority: number; // 1-5
  completed: boolean;
  created_at: string; // ISO date string
  impact_score?: number; // 0-100, for prioritization
};
