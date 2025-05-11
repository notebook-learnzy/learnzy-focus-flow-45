
export type Subject = {
  id: string;
  name: string;
  icon: string;
  progress: number;
};

export type Chapter = {
  id: string;
  name: string;
  subjectId: string;
  progress: number;
  lastPracticed?: string;
};

export type TaskType = "practice" | "wellness" | "custom";

export type Task = {
  id: string;
  title: string;
  type: TaskType;
  date: string;
  time: string;
  duration: number;
  completed: boolean;
  chapterId?: string;
  interval_adjusted?: boolean;
};

export type Suggestion = {
  id: string;
  message: string;
  action: string;
  applied: boolean;
  date: string;
};

export type SleepMetrics = {
  score: number;
  quality: string; // Added this property
  duration: number; // in minutes
  date: string;
  remSleep: number; // in minutes
  deepSleep: number; // in minutes
  lightSleep: number; // in minutes
  efficiency: number; // percentage - Added this property
  stressScore?: {
    beforeSleep: number;
    duringSleep: number;
  };
};

export type SedentaryMetrics = {
  totalSittingTime: number; // in minutes
  lastBreak: string; // timestamp
  breaks: number; // Added this property
  breakSuggestion: string;
  movementScore: number; // 0-100 - Added this property
  hourlyActivity?: {
    hour: string;
    movementScore: number;
    sittingMinutes: number;
  }[];
};

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

export type UserStreaks = {
  meditation_days: number;
  high_focus_days: number;
  practice_days: number;
  last_updated: string; // ISO date string
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earned_date?: string; // ISO date string
  progress?: number; // percentage towards earning
  badge_type: "focus" | "meditation" | "accuracy" | "streak" | "completion";
};

export type Challenge = {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  chapter_id?: string;
  participants: number;
  progress: number; // 0-100
  joined: boolean;
};

export type StudyBuddy = {
  id: string;
  name: string;
  avatar?: string;
  focus_score: number;
  average_accuracy: number;
  current_chapter: string;
  compatibility_score: number; // 0-100
};

export type MoodState = "calm" | "focused" | "stressed" | "tired" | "energetic";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  current_mood?: MoodState;
  streak_count: {
    meditation: number;
    focus_threshold: number;
    daily_practice: number;
  };
  badges_earned: Badge[];
  theme_preference: "auto" | "soothing" | "focus" | "energizing";
  enable_mood_aware_theming: boolean;
};
