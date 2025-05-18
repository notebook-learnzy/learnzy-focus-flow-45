import { Chapter, Subject, QuestionSet } from "@/types";

// Update to include both chapters for Botany class 11
export const biologyChapters: Chapter[] = [
  {
    id: "cell-bio",
    name: "Cell: The Unit of Life",
    class: "11",
    subjectId: "botany",
    progress: 0,
    lastPracticed: null
  },
  {
    id: "the-living-world",
    name: "The Living World",
    class: "11",
    subjectId: "botany",
    progress: 0,
    lastPracticed: null
  },
  // Other biology chapters
  {
    id: "morphology-of-flowering-plants",
    name: "Morphology of Flowering Plants",
    class: "11",
    subjectId: "botany",
    progress: 25,
    lastPracticed: "2023-05-15T10:30:00Z"
  },
  {
    id: "anatomy-of-flowering-plants",
    name: "Anatomy of Flowering Plants",
    class: "11",
    subjectId: "botany",
    progress: 10,
    lastPracticed: "2023-05-10T14:20:00Z"
  },
  {
    id: "structural-organisation-in-animals",
    name: "Structural Organisation in Animals",
    class: "11",
    subjectId: "zoology",
    progress: 15,
    lastPracticed: "2023-05-12T09:45:00Z"
  },
  {
    id: "animal-kingdom",
    name: "Animal Kingdom",
    class: "11",
    subjectId: "zoology",
    progress: 30,
    lastPracticed: "2023-05-18T16:15:00Z"
  },
  {
    id: "biomolecules",
    name: "Biomolecules",
    class: "12",
    subjectId: "botany",
    progress: 40,
    lastPracticed: "2023-05-20T11:00:00Z"
  },
  {
    id: "reproduction-in-organisms",
    name: "Reproduction in Organisms",
    class: "12",
    subjectId: "botany",
    progress: 20,
    lastPracticed: "2023-05-14T13:30:00Z"
  },
  {
    id: "human-reproduction",
    name: "Human Reproduction",
    class: "12",
    subjectId: "zoology",
    progress: 35,
    lastPracticed: "2023-05-19T10:20:00Z"
  },
  {
    id: "human-health-and-disease",
    name: "Human Health and Disease",
    class: "12",
    subjectId: "zoology",
    progress: 45,
    lastPracticed: "2023-05-22T15:10:00Z"
  }
];

// Example subjects
export const subjects: Subject[] = [
  {
    id: "botany",
    name: "Botany",
    icon: "leaf",
    progress: 45
  },
  {
    id: "zoology",
    name: "Zoology",
    icon: "bug",
    progress: 60
  },
  {
    id: "physics",
    name: "Physics",
    icon: "atom",
    progress: 30
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "flask",
    progress: 55
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "calculator",
    progress: 50
  }
];

// Basic questionSet mock for fallback/other chapters
export const questionSets: QuestionSet[] = [
  {
    id: "botany-setA-cell",
    set_type: "A",
    chapter_id: "cell-bio",
    questions: [],
    scheduled_date: undefined,
    completed_date: undefined,
    focus_score: undefined,
    interval_adjusted: false
  },
  {
    id: "botany-setA-living",
    set_type: "A",
    chapter_id: "the-living-world",
    questions: [],
    scheduled_date: undefined,
    completed_date: undefined,
    focus_score: undefined,
    interval_adjusted: false
  },
  {
    id: "botany-setB-cell",
    set_type: "B",
    chapter_id: "cell-bio",
    questions: [],
    scheduled_date: "2023-06-15T10:00:00Z",
    completed_date: undefined,
    focus_score: undefined,
    interval_adjusted: false
  },
  {
    id: "botany-setB-living",
    set_type: "B",
    chapter_id: "the-living-world",
    questions: [],
    scheduled_date: "2023-06-18T14:00:00Z",
    completed_date: undefined,
    focus_score: undefined,
    interval_adjusted: false
  },
  {
    id: "zoology-setA-animal",
    set_type: "A",
    chapter_id: "animal-kingdom",
    questions: [],
    scheduled_date: undefined,
    completed_date: "2023-05-18T16:15:00Z",
    focus_score: 85,
    interval_adjusted: true
  },
  {
    id: "zoology-setA-structural",
    set_type: "A",
    chapter_id: "structural-organisation-in-animals",
    questions: [],
    scheduled_date: undefined,
    completed_date: "2023-05-12T09:45:00Z",
    focus_score: 72,
    interval_adjusted: true
  }
];

// Quick mock for tasks (should match type Task from '@/types/tasks')
export const tasks = [
  {
    id: "t1",
    title: "Practice Cell Biology MCQs",
    type: "practice",
    date: "2025-05-18",
    time: "16:00",
    duration: 45,
    completed: false,
    chapterId: "cell-bio",
    interval_adjusted: false,
    description: "Practice MCQs for Cell Biology - Set A",
    location: null,
    color: "#FFBD59"
  },
  {
    id: "t2",
    title: "Take Zoology Quiz",
    type: "practice",
    date: "2025-05-18",
    time: "18:00",
    duration: 30,
    completed: false,
    chapterId: "animal-kingdom",
    interval_adjusted: false,
    description: "Test yourself on Animal Kingdom.",
    location: null,
    color: "#7e82e6"
  },
  {
    id: "t3",
    title: "Breathing Exercise",
    type: "wellness",
    date: "2025-05-18",
    time: "20:00",
    duration: 10,
    completed: false,
    description: "Short relaxation and breathing exercise.",
    location: null,
    color: "#3b82f6"
  }
];

// Placeholders for other modules/pages using mockData
export const suggestions = [];
export const journalEntries = [];
export const weeklyAccuracyData = [];
export const focusScoreData = [];
export const weakTopicsData = [];
export const bloomSkillsProfile = [];
export const actionCards = [];

export const chapters = biologyChapters;
