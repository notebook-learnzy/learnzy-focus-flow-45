export type SleepMetrics = {
  score: number;
  quality: string;
  duration: number; // in minutes
  date: string;
  remSleep: number; // in minutes
  deepSleep: number; // in minutes
  lightSleep: number; // in minutes
  efficiency: number; // percentage
  stressScore?: {
    beforeSleep: number;
    duringSleep: number;
  };
};

export type SedentaryMetrics = {
  totalSittingTime: number; // in minutes
  lastBreak: string; // timestamp
  breaks: number;
  breakSuggestion: string;
  movementScore: number; // 0-100
  hourlyActivity?: {
    hour: string;
    movementScore: number;
    sittingMinutes: number;
  }[];
};

export type MoodState = "calm" | "focused" | "stressed" | "tired" | "energetic";

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

export type RitualLog = {
  result: "completed" | "skipped";
  date: Date;
};
