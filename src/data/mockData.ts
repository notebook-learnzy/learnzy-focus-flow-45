
import { Subject, Chapter, Task, Suggestion } from "../types";

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
