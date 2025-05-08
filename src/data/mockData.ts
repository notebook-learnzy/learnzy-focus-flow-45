import { Subject, Chapter, Task, Suggestion, SedentaryMetrics, SleepMetrics, Question, QuestionSet, BloomSkillProfile, ActionCard } from "../types";

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "flask-round",
    progress: 65,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "flask-round",
    progress: 48,
  },
  {
    id: "botany",
    name: "Botany",
    icon: "leaf",
    progress: 72,
  },
  {
    id: "zoology",
    name: "Zoology",
    icon: "heart",
    progress: 55,
  },
];

export const chapters: Chapter[] = [
  // Physics chapters
  {
    id: "phys-mechanics",
    name: "Mechanics",
    subjectId: "physics",
    progress: 85,
    lastPracticed: "2025-04-25",
  },
  {
    id: "phys-thermodynamics",
    name: "Thermodynamics",
    subjectId: "physics",
    progress: 70,
    lastPracticed: "2025-04-20",
  },
  {
    id: "phys-waves",
    name: "Waves & Oscillations",
    subjectId: "physics",
    progress: 60,
    lastPracticed: "2025-04-15",
  },
  {
    id: "phys-optics",
    name: "Optics",
    subjectId: "physics",
    progress: 45,
    lastPracticed: "2025-04-10",
  },
  // Chemistry chapters
  {
    id: "chem-atomic",
    name: "Atomic Structure",
    subjectId: "chemistry",
    progress: 75,
    lastPracticed: "2025-04-22",
  },
  {
    id: "chem-periodic",
    name: "Periodic Table",
    subjectId: "chemistry",
    progress: 60,
    lastPracticed: "2025-04-18",
  },
  {
    id: "chem-organic",
    name: "Organic Chemistry",
    subjectId: "chemistry",
    progress: 40,
    lastPracticed: "2025-04-12",
  },
  {
    id: "chem-equilibrium",
    name: "Chemical Equilibrium",
    subjectId: "chemistry",
    progress: 30,
    lastPracticed: "2025-04-05",
  },
  // Botany chapters
  {
    id: "bot-cell",
    name: "Cell Biology",
    subjectId: "botany",
    progress: 90,
    lastPracticed: "2025-04-28",
  },
  {
    id: "bot-genetics",
    name: "Genetics",
    subjectId: "botany",
    progress: 80,
    lastPracticed: "2025-04-23",
  },
  {
    id: "bot-morphology",
    name: "Plant Morphology",
    subjectId: "botany",
    progress: 65,
    lastPracticed: "2025-04-16",
  },
  {
    id: "bot-physiology",
    name: "Plant Physiology",
    subjectId: "botany",
    progress: 55,
    lastPracticed: "2025-04-08",
  },
  // Zoology chapters
  {
    id: "zoo-evolution",
    name: "Evolution",
    subjectId: "zoology",
    progress: 70,
    lastPracticed: "2025-04-26",
  },
  {
    id: "zoo-anatomy",
    name: "Human Anatomy",
    subjectId: "zoology",
    progress: 60,
    lastPracticed: "2025-04-21",
  },
  {
    id: "zoo-physiology",
    name: "Animal Physiology",
    subjectId: "zoology",
    progress: 50,
    lastPracticed: "2025-04-14",
  },
  {
    id: "zoo-ecology",
    name: "Ecology",
    subjectId: "zoology",
    progress: 40,
    lastPracticed: "2025-04-07",
  },
];

// Current date for reference
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Practice Mechanics Quiz",
    type: "practice",
    date: today.toISOString().split("T")[0],
    time: "10:00",
    duration: 30,
    completed: false,
    chapterId: "phys-mechanics",
  },
  {
    id: "task-2",
    title: "5-min Breathing Exercise",
    type: "wellness",
    date: today.toISOString().split("T")[0],
    time: "14:30",
    duration: 5,
    completed: false,
  },
  {
    id: "task-3",
    title: "Cell Biology Review",
    type: "practice",
    date: tomorrow.toISOString().split("T")[0],
    time: "09:00",
    duration: 45,
    completed: false,
    chapterId: "bot-cell",
  },
  {
    id: "task-4",
    title: "Guided Meditation",
    type: "wellness",
    date: tomorrow.toISOString().split("T")[0],
    time: "18:00",
    duration: 10,
    completed: false,
  },
  {
    id: "task-5",
    title: "Chemistry Mock Test",
    type: "practice",
    date: dayAfterTomorrow.toISOString().split("T")[0],
    time: "11:00",
    duration: 60,
    completed: false,
  },
  {
    id: "task-6",
    title: "Journal Entry",
    type: "wellness",
    date: dayAfterTomorrow.toISOString().split("T")[0],
    time: "20:00",
    duration: 15,
    completed: false,
  },
];

export const suggestions: Suggestion[] = [
  {
    id: "sugg-1",
    message: "You've been studying for 5 hours. Take a short break.",
    action: "Schedule a 5-min breathing exercise",
    applied: false,
    date: today.toISOString(),
  },
  {
    id: "sugg-2",
    message: "Your focus score is low. Try a quick meditation.",
    action: "Add to calendar",
    applied: false,
    date: today.toISOString(),
  },
  {
    id: "sugg-3",
    message: "You perform better in mornings. Schedule tough topics early.",
    action: "Optimize schedule",
    applied: true,
    date: new Date(today.setDate(today.getDate() - 2)).toISOString(),
  },
];

export const instituteAssignments = [
  {
    id: "inst-1",
    title: "Daily Practice Problems: Physics",
    deadline: tomorrow.toISOString().split("T")[0],
    status: "pending",
  },
  {
    id: "inst-2",
    title: "Chemistry Weekly Assessment",
    deadline: dayAfterTomorrow.toISOString().split("T")[0],
    status: "pending",
  },
  {
    id: "inst-3",
    title: "Biology Mock Exam",
    deadline: new Date(today.setDate(today.getDate() + 5)).toISOString().split("T")[0],
    status: "pending",
  },
];

export const announcements = [
  {
    id: "ann-1",
    title: "Physics Revision Session",
    content: "Join the online revision session for Optics chapter tomorrow at 5:00 PM.",
    date: today.toISOString(),
  },
  {
    id: "ann-2",
    title: "Mock Test Results",
    content: "Last week's mock test results are now available in your dashboard.",
    date: new Date(today.setDate(today.getDate() - 1)).toISOString(),
  },
];

// Focus score data points for visualization
export const focusScoreData = [
  { time: "09:00", score: 85 },
  { time: "10:00", score: 90 },
  { time: "11:00", score: 75 },
  { time: "12:00", score: 60 },
  { time: "13:00", score: 50 },
  { time: "14:00", score: 65 },
  { time: "15:00", score: 80 },
  { time: "16:00", score: 85 },
  { time: "17:00", score: 70 },
];

export const weeklyAccuracyData = [
  { day: "Mon", accuracy: 75, focus: 80 },
  { day: "Tue", accuracy: 80, focus: 85 },
  { day: "Wed", accuracy: 70, focus: 65 },
  { day: "Thu", accuracy: 85, focus: 80 },
  { day: "Fri", accuracy: 90, focus: 90 },
  { day: "Sat", accuracy: 80, focus: 75 },
  { day: "Sun", accuracy: 75, focus: 70 },
];

// Sedentary metrics data
export const sedentaryMetrics: SedentaryMetrics = {
  totalSittingTime: 225, // 3h 45m in minutes
  lastBreak: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
  breakSuggestion: "Consider a 5-min stretch quiz break"
};

// Sleep metrics data
export const sleepMetrics: SleepMetrics = {
  score: 72,
  duration: 435, // 7h 15m in minutes
  remSleep: 60, // 1h in minutes
  deepSleep: 120, // 2h in minutes
  lightSleep: 255, // 4h 15m in minutes
  date: new Date().toISOString().split('T')[0]
};

// New mock data for weak topics
export const weakTopicsData = [
  { topic: "Kinematics", score: 45 },
  { topic: "Chemical Bonding", score: 55 },
  { topic: "Cell Division", score: 60 },
  { topic: "Optics", score: 50 },
  { topic: "Thermodynamics", score: 70 },
];

// Bloom's taxonomy skill profile
export const bloomSkillsProfile: BloomSkillProfile = {
  remember: 85,
  understand: 75,
  apply: 65,
  analyze: 50,
  evaluate: 40,
  create: 30
};

// Action cards for recommendations
export const actionCards: ActionCard[] = [
  {
    id: "action-1",
    title: "Review Kinematics Concepts",
    description: "Your accuracy in Kinematics questions is 45%. Practice 10 more questions.",
    action_type: "revision",
    target: "Kinematics",
    priority: 1,
    completed: false,
    created_at: new Date().toISOString()
  },
  {
    id: "action-2",
    title: "Try a Guided Meditation",
    description: "Your focus dips after 2 hours of study. A 3-minute meditation may help.",
    action_type: "wellness",
    target: "meditation",
    priority: 3,
    completed: false,
    created_at: new Date().toISOString()
  },
  {
    id: "action-3",
    title: "Complete Thermodynamics Set B",
    description: "Scheduled for spaced repetition. Due in 2 days.",
    action_type: "practice",
    target: "phys-thermodynamics",
    priority: 2,
    completed: false,
    created_at: new Date().toISOString()
  },
  {
    id: "action-4",
    title: "Take a Study Break",
    description: "You've been studying for 3+ hours. Schedule a 15-minute break.",
    action_type: "wellness",
    target: "break",
    priority: 4,
    completed: true,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];

// Questions for the mechanics chapter
const mechanicsQuestions: Question[] = [
  {
    id: "q-mech-1",
    question_text: "What is the SI unit of force?",
    option_a: "Newton",
    option_b: "Joule",
    option_c: "Watt",
    option_d: "Pascal",
    correct_answer: "A",
    subject: "Physics",
    chapter_name: "Mechanics",
    topic: "Forces",
    subtopic: "Units and Dimensions",
    difficulty_level: "Easy",
    question_type: "MCQ",
    bloom_taxonomy: "Remember",
    priority_level: 3,
    time_to_solve: 30,
    key_concept_tested: "Understanding of basic physical units",
    common_pitfalls: "Confusing force units with energy or pressure units",
    creation_timestamp: "2025-01-15T10:30:00Z",
    last_updated_timestamp: "2025-01-15T10:30:00Z"
  },
  {
    id: "q-mech-2",
    question_text: "Which law of motion states that for every action, there is an equal and opposite reaction?",
    option_a: "First law",
    option_b: "Second law",
    option_c: "Third law",
    option_d: "Fourth law",
    correct_answer: "C",
    subject: "Physics",
    chapter_name: "Mechanics",
    topic: "Newton's Laws",
    subtopic: "Third Law",
    difficulty_level: "Easy",
    question_type: "MCQ",
    bloom_taxonomy: "Remember",
    priority_level: 3,
    time_to_solve: 25,
    key_concept_tested: "Knowledge of Newton's laws of motion",
    creation_timestamp: "2025-01-15T11:00:00Z",
    last_updated_timestamp: "2025-01-15T11:00:00Z"
  },
  {
    id: "q-mech-3",
    question_text: "A 2kg object moving at 4 m/s collides with a stationary 6kg object. If the collision is perfectly inelastic, what is the velocity of the combined objects after collision?",
    option_a: "0.5 m/s",
    option_b: "1 m/s",
    option_c: "1.5 m/s",
    option_d: "2 m/s",
    correct_answer: "B",
    subject: "Physics",
    chapter_name: "Mechanics",
    topic: "Collisions",
    subtopic: "Inelastic Collisions",
    difficulty_level: "Medium",
    question_type: "MCQ",
    bloom_taxonomy: "Apply",
    priority_level: 2,
    time_to_solve: 60,
    key_concept_tested: "Conservation of momentum in inelastic collisions",
    common_pitfalls: "Not accounting for the combined mass after collision",
    creation_timestamp: "2025-01-16T09:15:00Z",
    last_updated_timestamp: "2025-01-16T09:15:00Z"
  }
];

// Add more questions for other chapters
const thermodynamicsQuestions: Question[] = [
  {
    id: "q-therm-1",
    question_text: "Which law of thermodynamics states that energy cannot be created or destroyed?",
    option_a: "Zeroth law",
    option_b: "First law",
    option_c: "Second law",
    option_d: "Third law",
    correct_answer: "B",
    subject: "Physics",
    chapter_name: "Thermodynamics",
    topic: "Laws of Thermodynamics",
    subtopic: "First Law",
    difficulty_level: "Easy",
    question_type: "MCQ",
    bloom_taxonomy: "Remember",
    priority_level: 3,
    time_to_solve: 30,
    key_concept_tested: "Understanding of the first law of thermodynamics",
    creation_timestamp: "2025-01-20T10:00:00Z",
    last_updated_timestamp: "2025-01-20T10:00:00Z"
  },
  // Add more thermodynamics questions
];

// Create question sets
export const questionSets: QuestionSet[] = [
  {
    id: "set-mech-a",
    set_type: "A",
    chapter_id: "phys-mechanics",
    questions: mechanicsQuestions,
    scheduled_date: today.toISOString().split("T")[0]
  },
  {
    id: "set-therm-a",
    set_type: "A",
    chapter_id: "phys-thermodynamics",
    questions: thermodynamicsQuestions,
    scheduled_date: tomorrow.toISOString().split("T")[0]
  }
];
