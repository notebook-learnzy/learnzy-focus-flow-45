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

export type SedentaryMetrics = {
  totalSittingTime: number; // in minutes
  lastBreak: string; // ISO date string
  breakSuggestion: string;
};

export type SleepMetrics = {
  score: number; // out of 100
  duration: number; // in minutes
  remSleep: number; // in minutes
  deepSleep: number; // in minutes
  lightSleep: number; // in minutes
  date: string; // ISO date string
};

// New question schema
export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type QuestionType = "MCQ" | "Assertion-Reason" | "Fill-in-the-blank" | "Match";
export type BloomTaxonomy = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
export type CorrectAnswer = "A" | "B" | "C" | "D";

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

// New types for social features and wellness streaks

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

// Biology Class 11 Chapters
export const biologyChapters = [
  { id: "bio11-ch01", name: "The Living World", subjectId: "biology", class: "11", progress: 10, lastPracticed: "2023-05-01" },
  { id: "bio11-ch02", name: "Biological Classification", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch03", name: "Plant Kingdom", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch04", name: "Animal Kingdom", subjectId: "biology", class: "11", progress: 5, lastPracticed: "2023-04-15" },
  { id: "bio11-ch05", name: "Morphology of Flowering Plants", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch06", name: "Anatomy of Flowering Plants", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch07", name: "Structural Organisation in Animals", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch08", name: "Cell: The Unit of Life", subjectId: "biology", class: "11", progress: 15, lastPracticed: "2023-04-28" },
  { id: "bio11-ch09", name: "Biomolecules", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch10", name: "Cell Cycle and Cell Division", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch11", name: "Photosynthesis in Higher Plants", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch12", name: "Respiration in Plants", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch13", name: "Plant Growth and Development", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch14", name: "Breathing and Exchange of Gases", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch15", name: "Body Fluids and Circulation", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch16", name: "Excretory Products and their Elimination", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch17", name: "Locomotion and Movement", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch18", name: "Neural Control and Coordination", subjectId: "biology", class: "11", progress: 0 },
  { id: "bio11-ch19", name: "Chemical Coordination and Integration", subjectId: "biology", class: "11", progress: 0 },
];

// Add biology subject
export const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: "flask-round",
    progress: 35,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "flask-round",
    progress: 42,
  },
  {
    id: "biology",
    name: "Biology",
    icon: "leaf",
    progress: 27,
  },
  {
    id: "maths",
    name: "Mathematics",
    icon: "book-open",
    progress: 18,
  },
];

// All chapters combined
export const chapters = [
  {
    id: "phy-ch01",
    name: "Laws of Motion",
    subjectId: "physics",
    progress: 75,
    lastPracticed: "2023-05-02"
  },
  {
    id: "phy-ch02",
    name: "Kinematics",
    subjectId: "physics",
    progress: 45,
    lastPracticed: "2023-04-28"
  },
  {
    id: "phy-ch03",
    name: "Waves",
    subjectId: "physics",
    progress: 20,
    lastPracticed: "2023-04-15"
  },
  {
    id: "phy-ch04",
    name: "Electricity and Magnetism",
    subjectId: "physics",
    progress: 10,
  },
  {
    id: "chem-ch01",
    name: "Atomic Structure",
    subjectId: "chemistry",
    progress: 65,
    lastPracticed: "2023-05-01"
  },
  {
    id: "chem-ch02",
    name: "Organic Chemistry",
    subjectId: "chemistry",
    progress: 30,
    lastPracticed: "2023-04-18"
  },
  {
    id: "chem-ch03",
    name: "Chemical Bonding",
    subjectId: "chemistry",
    progress: 50,
    lastPracticed: "2023-04-25"
  },
  ...biologyChapters,
  {
    id: "math-ch01",
    name: "Calculus",
    subjectId: "maths",
    progress: 40,
    lastPracticed: "2023-04-30"
  },
  {
    id: "math-ch02",
    name: "Algebra",
    subjectId: "maths",
    progress: 25,
    lastPracticed: "2023-04-20"
  },
  {
    id: "math-ch03",
    name: "Statistics",
    subjectId: "maths",
    progress: 15,
    lastPracticed: "2023-04-10"
  }
];

// Create question sets for the first chapter
export const questionSets = [
  {
    id: "qs-living-world-a",
    set_type: "A",
    chapter_id: "bio11-ch01",
    questions: [
      {
        id: "q1",
        question_text: "Which of the following is NOT a characteristic of living organisms?",
        option_a: "Growth",
        option_b: "Reproduction",
        option_c: "Crystallization",
        option_d: "Response to stimuli",
        correct_answer: "C",
        subject: "Biology",
        chapter_name: "The Living World",
        topic: "Characteristics of Life",
        subtopic: "Living vs Non-living",
        difficulty_level: "Easy",
        question_type: "MCQ",
        bloom_taxonomy: "Remember",
        priority_level: 1,
        time_to_solve: 45,
        key_concept_tested: "Distinguishing living from non-living",
        common_pitfalls: "Crystallization is a physical property of non-living things",
        creation_timestamp: "2023-01-01",
        last_updated_timestamp: "2023-01-01"
      },
      {
        id: "q2",
        question_text: "Taxonomic hierarchy refers to:",
        option_a: "Classification of plants only",
        option_b: "A sequence of taxonomic categories in descending order",
        option_c: "Classification based on habitat",
        option_d: "The process of identifying new species",
        correct_answer: "B",
        subject: "Biology",
        chapter_name: "The Living World",
        topic: "Taxonomy",
        subtopic: "Taxonomic Categories",
        difficulty_level: "Medium",
        question_type: "MCQ",
        bloom_taxonomy: "Understand",
        priority_level: 2,
        time_to_solve: 60,
        key_concept_tested: "Understanding taxonomic hierarchy",
        creation_timestamp: "2023-01-01",
        last_updated_timestamp: "2023-01-01"
      },
      {
        id: "q3",
        question_text: "Which of these is the correct scientific name format?",
        option_a: "homo sapiens",
        option_b: "Homo Sapiens",
        option_c: "Homo sapiens",
        option_d: "homo Sapiens",
        correct_answer: "C",
        subject: "Biology",
        chapter_name: "The Living World",
        topic: "Nomenclature",
        subtopic: "Binomial Nomenclature",
        difficulty_level: "Easy",
        question_type: "MCQ",
        bloom_taxonomy: "Remember",
        priority_level: 1,
        time_to_solve: 30,
        key_concept_tested: "Rules of binomial nomenclature",
        creation_timestamp: "2023-01-01",
        last_updated_timestamp: "2023-01-01"
      }
    ],
    completed_date: null,
    scheduled_date: "2023-05-10"
  },
  {
    id: "qs-living-world-b",
    set_type: "B",
    chapter_id: "bio11-ch01",
    questions: [
      // Similar question structure as set A
    ],
    completed_date: null,
    scheduled_date: null
  },
  {
    id: "qs-living-world-c",
    set_type: "C",
    chapter_id: "bio11-ch01",
    questions: [],
    completed_date: null,
    scheduled_date: null
  },
  {
    id: "qs-living-world-d",
    set_type: "D",
    chapter_id: "bio11-ch01",
    questions: [],
    completed_date: null,
    scheduled_date: null
  },
  {
    id: "qs-living-world-e",
    set_type: "E",
    chapter_id: "bio11-ch01",
    questions: [],
    completed_date: null,
    scheduled_date: null
  }
];

// Sample user journal entries
export const journalEntries = [
  {
    id: "j1",
    date: "2023-05-05",
    text: "Studied for 3 hours today. Feeling confident about the upcoming test.",
    mood_tag: "happy"
  },
  {
    id: "j2",
    date: "2023-05-04",
    text: "Had trouble focusing today. Need to get more sleep.",
    mood_tag: "tired"
  },
  {
    id: "j3",
    date: "2023-05-03",
    text: "Anxiety about the Physics exam. Should revise more examples.",
    mood_tag: "anxious"
  }
];

// Tasks (now with proper TaskType)
export const tasks = [
  {
    id: "task-1",
    title: "Practice Physics Set B",
    type: "practice" as TaskType, // Explicit type casting
    date: "2023-05-10",
    time: "14:00",
    duration: 60,
    completed: false,
    chapterId: "phy-ch01"
  },
  {
    id: "task-2",
    title: "Meditation Session",
    type: "wellness" as TaskType, // Explicit type casting
    date: "2023-05-10",
    time: "08:00",
    duration: 15,
    completed: true
  },
  {
    id: "task-3",
    title: "Chemistry Revision",
    type: "practice" as TaskType, // Explicit type casting
    date: "2023-05-11",
    time: "16:00",
    duration: 90,
    completed: false,
    chapterId: "chem-ch01"
  },
  {
    id: "task-4",
    title: "Biology - Living World Set A",
    type: "practice" as TaskType, // Explicit type casting
    date: "2023-05-12",
    time: "10:00",
    duration: 45,
    completed: false,
    chapterId: "bio11-ch01"
  },
  {
    id: "task-5",
    title: "Daily Planning",
    type: "custom" as TaskType, // Explicit type casting
    date: "2023-05-13",
    time: "07:30",
    duration: 15,
    completed: false
  }
];

// Suggestions
export const suggestions = [
  {
    id: "suggestion-1",
    message: "Your focus seems to drop after 45 minutes. Consider shorter study sessions with breaks.",
    action: "Update Schedule",
    applied: false,
    date: "2023-05-05"
  },
  {
    id: "suggestion-2",
    message: "Add a 5-minute meditation before your Physics practice to improve retention.",
    action: "Try Now",
    applied: true,
    date: "2023-05-04"
  },
  {
    id: "suggestion-3",
    message: "You perform better in the morning. Schedule important study sessions before noon.",
    action: "View Analysis",
    applied: false,
    date: "2023-05-03"
  }
];

// Institute assignments
export const instituteAssignments = [
  {
    id: "assignment-1",
    title: "Weekly Physics Test",
    deadline: "May 12, 2023"
  },
  {
    id: "assignment-2",
    title: "Chemistry Lab Report",
    deadline: "May 15, 2023"
  },
  {
    id: "assignment-3",
    title: "Biology Diagram Assignment",
    deadline: "May 16, 2023"
  }
];

// Announcements
export const announcements = [
  {
    id: "announcement-1",
    title: "Mock Test Schedule",
    content: "The NEET mock test series will begin on May 20th. Please prepare accordingly.",
    date: "2023-05-05"
  },
  {
    id: "announcement-2",
    title: "New Study Materials",
    content: "Updated NCERT solutions are now available in the resources section.",
    date: "2023-05-04"
  }
];

// Sleep metrics mock data
export const sleepMetrics: SleepMetrics[] = [
  {
    score: 80,
    quality: "Good",
    duration: 472, // 7h 52m
    date: "2025-05-10",
    remSleep: 108,
    deepSleep: 92,
    lightSleep: 272,
    efficiency: 92
  },
  {
    score: 68,
    quality: "Average",
    duration: 401, // 6h 41m
    date: "2025-05-09",
    remSleep: 85,
    deepSleep: 76,
    lightSleep: 240,
    efficiency: 84
  },
  {
    score: 92,
    quality: "Excellent",
    duration: 496, // 8h 16m
    date: "2025-05-08",
    remSleep: 125,
    deepSleep: 112,
    lightSleep: 259,
    efficiency: 95
  }
];

// Sedentary metrics mock data
export const sedentaryMetrics: SedentaryMetrics = {
  totalSittingTime: 340,
  lastBreak: "2025-05-10T14:30:00",
  breaks: 4,
  breakSuggestion: "You've been sitting for a while. Consider taking a 5-minute break soon.",
  movementScore: 45,
  hourlyActivity: [
    { hour: '08:00', movementScore: 65, sittingMinutes: 42 },
    { hour: '09:00', movementScore: 30, sittingMinutes: 55 },
    { hour: '10:00', movementScore: 45, sittingMinutes: 49 },
    { hour: '11:00', movementScore: 75, sittingMinutes: 28 },
    { hour: '12:00', movementScore: 85, sittingMinutes: 20 },
    { hour: '13:00', movementScore: 35, sittingMinutes: 52 },
    { hour: '14:00', movementScore: 40, sittingMinutes: 50 },
    { hour: '15:00', movementScore: 50, sittingMinutes: 44 }
  ]
};

// Focus sessions for analytics
export const focusSessions = [
  {
    id: "focus-1",
    date: "2023-05-08",
    duration: 55,
    average_score: 78,
    chapter_id: "phy-ch01"
  },
  {
    id: "focus-2",
    date: "2023-05-07",
    duration: 45,
    average_score: 82,
    chapter_id: "chem-ch02"
  },
  {
    id: "focus-3",
    date: "2023-05-05",
    duration: 60,
    average_score: 75,
    chapter_id: "bio11-ch08"
  }
];

// User's meditation logs
export const meditationLogs = [
  {
    id: "med-1",
    date: "2023-05-08",
    duration_completed: 60,
    meditation_skipped: false,
    before_session_id: "focus-1"
  },
  {
    id: "med-2",
    date: "2023-05-07",
    duration_completed: 60,
    meditation_skipped: false,
    before_session_id: "focus-2"
  },
  {
    id: "med-3",
    date: "2023-05-05",
    duration_completed: 0,
    meditation_skipped: true,
    before_session_id: "focus-3"
  }
];

// Completed question sets with performance data
export const completedSets = [
  {
    id: "completed-1",
    question_set_id: "qs-phy-ch01-a",
    date: "2023-05-08",
    score: 75,
    time_taken: 42,
    focus_score: 78,
    incorrect_questions: ["q2", "q5", "q8"],
    analytics: {
      bloom_levels: {
        remember: 80,
        understand: 70,
        apply: 60,
        analyze: 50
      },
      topic_performance: {
        "Newton's Laws": 85,
        "Friction": 65,
        "Circular Motion": 75
      }
    }
  }
];

// Analytics chart data
export const weeklyAccuracyData = [
  { day: "Mon", accuracy: 68, focus: 72 },
  { day: "Tue", accuracy: 74, focus: 78 },
  { day: "Wed", accuracy: 82, focus: 85 },
  { day: "Thu", accuracy: 78, focus: 75 },
  { day: "Fri", accuracy: 85, focus: 88 },
  { day: "Sat", accuracy: 90, focus: 92 },
  { day: "Sun", accuracy: 76, focus: 80 }
];

export const focusScoreData = [
  { time: "8 AM", score: 75 },
  { time: "9 AM", score: 82 },
  { time: "10 AM", score: 90 },
  { time: "11 AM", score: 85 },
  { time: "12 PM", score: 72 },
  { time: "1 PM", score: 68 },
  { time: "2 PM", score: 75 },
  { time: "3 PM", score: 80 },
  { time: "4 PM", score: 78 }
];

export const weakTopicsData = [
  { topic: "Photosynthesis", score: 45 },
  { topic: "Cell Division", score: 55 },
  { topic: "Newton's Laws", score: 60 },
  { topic: "Organic Chemistry", score: 65 },
  { topic: "Integration", score: 70 }
];

export const bloomSkillsProfile = {
  remember: 85,
  understand: 75,
  apply: 68,
  analyze: 62,
  evaluate: 55,
  create: 48
};

export const actionCards = [
  {
    id: "action-1",
    title: "Revise Photosynthesis",
    description: "Your accuracy dropped in this topic",
    completed: false,
    priority: "high"
  },
  {
    id: "action-2",
    title: "Take a 5-minute break",
    description: "You've been studying for 45 minutes",
    completed: true,
    priority: "medium"
  },
  {
    id: "action-3",
    title: "Practice Newton's Laws",
    description: "Recommended based on your schedule",
    completed: false,
    priority: "medium"
  },
  {
    id: "action-4",
    title: "Meditate before next session",
    description: "Improve focus for difficult topics",
    completed: false,
    priority: "low"
  }
];
