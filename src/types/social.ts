
import { MoodState, Badge } from './wellness';

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
