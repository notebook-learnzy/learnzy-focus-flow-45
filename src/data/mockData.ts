
export const subjects = [
  {
    id: "math",
    name: "Mathematics",
    icon: "book-open",
    progress: 65
  },
  {
    id: "physics",
    name: "Physics",
    icon: "flask-round",
    progress: 40
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "flask-round",
    progress: 25
  },
  {
    id: "biology",
    name: "Biology",
    icon: "leaf",
    progress: 50
  },
  {
    id: "botany",
    name: "Botany",
    icon: "leaf",
    progress: 10
  },
];

export const biologyChapters11 = [
  { id: "bio-11-1", name: "The Living World", progress: 0, subjectId: "biology" },
  { id: "bio-11-2", name: "Structural Organisation in Animals", progress: 0, subjectId: "biology" },
  { id: "bio-11-3", name: "Respiration in Plants", progress: 0, subjectId: "biology" },
  { id: "bio-11-4", name: "Plant Kingdom", progress: 0, subjectId: "biology" },
  { id: "bio-11-5", name: "Plant Growth and Development", progress: 0, subjectId: "biology" },
  { id: "bio-11-6", name: "Photosynthesis in Higher Plants", progress: 0, subjectId: "biology" },
  { id: "bio-11-7", name: "Neural Control and Coordination", progress: 0, subjectId: "biology" },
  { id: "bio-11-8", name: "Morphology of Flowering Plants", progress: 0, subjectId: "biology" },
  { id: "bio-11-9", name: "Locomotion and Movement", progress: 0, subjectId: "biology" },
  { id: "bio-11-10", name: "Chemical Coordination and Integration", progress: 0, subjectId: "biology" },
  { id: "bio-11-11", name: "Cell: The Unit of Life", progress: 0, subjectId: "biology" },
  { id: "bio-11-12", name: "Cell Cycle and Cell Division", progress: 0, subjectId: "biology" },
  { id: "bio-11-13", name: "Breathing and Exchange of Gases", progress: 0, subjectId: "biology" },
  { id: "bio-11-14", name: "Body Fluids and Circulation", progress: 0, subjectId: "biology" },
  { id: "bio-11-15", name: "Biomolecules", progress: 0, subjectId: "biology" },
  { id: "bio-11-16", name: "Biological Classification", progress: 0, subjectId: "biology" },
  { id: "bio-11-17", name: "Animal Kingdom", progress: 0, subjectId: "biology" },
  { id: "bio-11-18", name: "Excretory Products and their Elimination", progress: 0, subjectId: "biology" },
  { id: "bio-11-19", name: "Anatomy of Flowering Plants", progress: 0, subjectId: "biology" }
];

export const botanyChapters11 = [
  { id: "bot-11-1", name: "The Living World", progress: 0, subjectId: "botany" },
  { id: "bot-11-2", name: "Structural Organisation in Plants", progress: 0, subjectId: "botany" },
  { id: "bot-11-3", name: "Respiration in Plants", progress: 0, subjectId: "botany" },
  { id: "bot-11-4", name: "Plant Kingdom", progress: 0, subjectId: "botany" },
  { id: "bot-11-5", name: "Plant Growth and Development", progress: 0, subjectId: "botany" },
  { id: "bot-11-6", name: "Photosynthesis in Higher Plants", progress: 0, subjectId: "botany" },
  { id: "bot-11-7", name: "Morphology of Flowering Plants", progress: 0, subjectId: "botany" },
  { id: "bot-11-8", name: "Anatomy of Flowering Plants", progress: 0, subjectId: "botany" },
  { id: "bot-11-9", name: "Transport in Plants", progress: 0, subjectId: "botany" },
  { id: "bot-11-10", name: "Mineral Nutrition", progress: 0, subjectId: "botany" },
  { id: "bot-11-11", name: "Cell: The Unit of Life", progress: 0, subjectId: "botany" },
  { id: "bot-11-12", name: "Cell Cycle and Cell Division", progress: 0, subjectId: "botany" },
  { id: "bot-11-13", name: "Biological Classification", progress: 0, subjectId: "botany" },
  { id: "bot-11-14", name: "The Living World", progress: 0, subjectId: "botany" },
  { id: "bot-11-15", name: "Biomolecules", progress: 0, subjectId: "botany" }
];

// Modified chapters to include subjectId instead of subject string
export const chapters = [
  ...biologyChapters11.map(chapter => ({
    ...chapter,
    class: "11",
    lastPracticed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  })),
  ...botanyChapters11.map(chapter => ({
    ...chapter,
    class: "11",
    lastPracticed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
];

// Updated tasks to match the Task type
export const tasks = [
  {
    id: "task1",
    title: "Complete Physics Set A",
    type: "practice",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    time: "14:00",
    duration: 45,
    completed: false,
    subject: "Physics"
  },
  {
    id: "task2",
    title: "Review Biology Chapter 3",
    type: "practice",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    time: "16:30",
    duration: 60,
    completed: false,
    subject: "Biology"
  },
  {
    id: "task3",
    title: "Chemistry Weekly Test",
    type: "practice",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    time: "10:00",
    duration: 90,
    completed: false,
    subject: "Chemistry"
  },
  {
    id: "task4",
    title: "Mathematics Practice Problems",
    type: "practice",
    date: new Date(Date.now()).toISOString(),
    time: "18:00",
    duration: 45,
    completed: false,
    subject: "Mathematics"
  },
  {
    id: "task5",
    title: "Biology Revision Session",
    type: "practice",
    date: new Date(Date.now()).toISOString(),
    time: "20:00",
    duration: 30,
    completed: true,
    subject: "Biology"
  }
];

// Updated suggestions to match the Suggestion type
export const suggestions = [
  {
    id: "sug1",
    message: "Take a break! You've been studying for 2 hours", 
    action: "Set a timer",
    applied: false,
    date: new Date().toISOString()
  },
  {
    id: "sug2",
    message: "Physics chapter 7 needs attention. Your accuracy has dropped below 60%. Consider revisiting the core concepts.",
    action: "Review Chapter",
    applied: false,
    date: new Date().toISOString()
  },
  {
    id: "sug3",
    message: "Join upcoming Biology group study. 10 peers are meeting tomorrow at 6PM to review Cell Division.",
    action: "Join Group",
    applied: false,
    date: new Date().toISOString()
  }
];

// Mock data for institute assignments
export const instituteAssignments = [
  {
    id: "assign1",
    title: "Physics Weekly Assignment",
    deadline: "Today, 11:59 PM",
    subject: "Physics",
    status: "pending"
  },
  {
    id: "assign2",
    title: "Chemistry Lab Report",
    deadline: "Tomorrow, 3:00 PM",
    subject: "Chemistry",
    status: "pending"
  },
  {
    id: "assign3",
    title: "Mathematics Problem Set",
    deadline: "May 12, 11:59 PM",
    subject: "Mathematics",
    status: "pending"
  }
];

// Mock data for announcements
export const announcements = [
  {
    id: "ann1",
    title: "NEET Mock Test Schedule Updated",
    content: "The schedule for upcoming mock tests has been updated. Please check the calendar for new dates.",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "ann2",
    title: "Biology Special Lecture",
    content: "Dr. Sharma will be conducting a special lecture on Cell Biology this Saturday at 10 AM.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const sedentaryMetrics = {
  totalSittingTime: 240, // in minutes
  lastBreak: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  breakSuggestion: "Take a 5-minute walk to improve circulation."
};

export const sleepMetrics = {
  score: 85, // out of 100
  duration: 480, // in minutes
  remSleep: 90, // in minutes
  deepSleep: 120, // in minutes
  lightSleep: 270, // in minutes
  date: new Date(Date.now() - 86400000).toISOString() // Yesterday
};

// Updated question type to match the Question type in types.ts
export const questionSets = [
  {
    id: "set1",
    chapter_id: "bio-11-1",
    set_type: "A" as const,
    questions: [
      { 
        id: "q1", 
        question_text: "What is the definition of taxonomy?", 
        option_a: "The study of plants",
        option_b: "The science of classification of organisms",
        option_c: "The study of animals",
        option_d: "The study of microorganisms",
        correct_answer: "B" as const,
        subject: "Biology",
        chapter_name: "The Living World",
        topic: "Taxonomy",
        subtopic: "Definition",
        difficulty_level: "Easy" as const,
        question_type: "MCQ" as const,
        bloom_taxonomy: "Remember" as const,
        priority_level: 1,
        time_to_solve: 30,
        key_concept_tested: "Understanding of basic taxonomic principles",
        creation_timestamp: new Date().toISOString(),
        last_updated_timestamp: new Date().toISOString()
      },
      { 
        id: "q2", 
        question_text: "Explain the binomial nomenclature system.", 
        option_a: "System where organisms are named based on their habitat",
        option_b: "System where organisms are named using two Latin words",
        option_c: "System where organisms are classified based on their appearance",
        option_d: "System where organisms are named after their discoverers",
        correct_answer: "B" as const,
        subject: "Biology",
        chapter_name: "The Living World",
        topic: "Nomenclature",
        subtopic: "Binomial Nomenclature",
        difficulty_level: "Medium" as const,
        question_type: "MCQ" as const,
        bloom_taxonomy: "Understand" as const,
        priority_level: 2,
        time_to_solve: 45,
        key_concept_tested: "Understanding of Linnaeus' binomial system",
        creation_timestamp: new Date().toISOString(),
        last_updated_timestamp: new Date().toISOString()
      }
    ],
    completed_date: null,
    scheduled_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "set2",
    chapter_id: "bio-11-2",
    set_type: "B" as const,
    questions: [
      { 
        id: "q3", 
        question_text: "Describe the structure of epithelial tissue.", 
        option_a: "Loose cells with large intercellular spaces",
        option_b: "Closely packed cells forming a continuous sheet",
        option_c: "Star-shaped cells with long projections",
        option_d: "Cells arranged in a fibrous network",
        correct_answer: "B" as const,
        subject: "Biology",
        chapter_name: "Structural Organisation in Animals",
        topic: "Tissues",
        subtopic: "Epithelial Tissue",
        difficulty_level: "Medium" as const,
        question_type: "MCQ" as const,
        bloom_taxonomy: "Understand" as const,
        priority_level: 2,
        time_to_solve: 45,
        key_concept_tested: "Characteristics of epithelial tissue",
        creation_timestamp: new Date().toISOString(),
        last_updated_timestamp: new Date().toISOString()
      },
      { 
        id: "q4", 
        question_text: "What are the functions of connective tissue?", 
        option_a: "Only structural support",
        option_b: "Only protection of organs",
        option_c: "Only binding different tissues",
        option_d: "Support, protection, binding and insulation",
        correct_answer: "D" as const,
        subject: "Biology",
        chapter_name: "Structural Organisation in Animals",
        topic: "Tissues",
        subtopic: "Connective Tissue",
        difficulty_level: "Medium" as const,
        question_type: "MCQ" as const,
        bloom_taxonomy: "Understand" as const,
        priority_level: 2,
        time_to_solve: 45,
        key_concept_tested: "Functions of connective tissues",
        creation_timestamp: new Date().toISOString(),
        last_updated_timestamp: new Date().toISOString()
      }
    ],
    completed_date: null,
    scheduled_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "set3",
    chapter_id: "bio-11-3",
    set_type: "C" as const,
    questions: [
      { 
        id: "q5", 
        question_text: "Explain the process of glycolysis.", 
        option_a: "Breaking down of fats in the liver",
        option_b: "Conversion of glucose to pyruvate in the cytoplasm",
        option_c: "Conversion of protein to amino acids",
        option_d: "Breakdown of glycogen in muscles",
        correct_answer: "B" as const,
        subject: "Biology",
        chapter_name: "Respiration in Plants",
        topic: "Cellular Respiration",
        subtopic: "Glycolysis",
        difficulty_level: "Hard" as const,
        question_type: "MCQ" as const,
        bloom_taxonomy: "Analyze" as const,
        priority_level: 3,
        time_to_solve: 60,
        key_concept_tested: "Understanding of glycolysis pathway",
        creation_timestamp: new Date().toISOString(),
        last_updated_timestamp: new Date().toISOString()
      },
      { 
        id: "q6", 
        question_text: "What is the role of mitochondria in cellular respiration?", 
        option_a: "Site for protein synthesis",
        option_b: "Site for lipid synthesis",
        option_c: "Site for aerobic respiration and ATP production",
        option_d: "Site for DNA replication",
        correct_answer: "C" as const,
        subject: "Biology",
        chapter_name: "Respiration in Plants",
        topic: "Cellular Respiration",
        subtopic: "Mitochondrial Function",
        difficulty_level: "Hard" as const,
        question_type: "MCQ" as const,
        bloom_taxonomy: "Analyze" as const,
        priority_level: 3,
        time_to_solve: 60,
        key_concept_tested: "Function of mitochondria in respiration",
        creation_timestamp: new Date().toISOString(),
        last_updated_timestamp: new Date().toISOString()
      }
    ],
    completed_date: null,
    scheduled_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock data for analytics
export const weeklyAccuracyData = [
  { name: 'Mon', accuracy: 65 },
  { name: 'Tue', accuracy: 59 },
  { name: 'Wed', accuracy: 80 },
  { name: 'Thu', accuracy: 81 },
  { name: 'Fri', accuracy: 76 },
  { name: 'Sat', accuracy: 85 },
  { name: 'Sun', accuracy: 90 },
];

export const focusScoreData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 75 },
  { name: 'Week 4', score: 80 },
];

export const weakTopicsData = [
  { name: 'Cell Division', score: 45 },
  { name: 'Photosynthesis', score: 52 },
  { name: 'DNA Replication', score: 58 },
  { name: 'Nervous System', score: 60 },
];

export const bloomSkillsProfile = {
  remember: 85,
  understand: 75,
  apply: 65,
  analyze: 60,
  evaluate: 50,
  create: 45
};

export const actionCards = [
  {
    id: "action1",
    title: "Practice Cell Division",
    description: "10 questions to improve your understanding",
    actionLabel: "Start Practice",
    priority: "high",
    completed: false,
    action_type: "practice",
    target: "Cell Division",
    created_at: new Date().toISOString()
  },
  {
    id: "action2",
    title: "Review Photosynthesis",
    description: "Revisit key concepts and mechanisms",
    actionLabel: "Review Now",
    priority: "medium",
    completed: false,
    action_type: "revision",
    target: "Photosynthesis",
    created_at: new Date().toISOString()
  },
  {
    id: "action3",
    title: "Take DNA Quiz",
    description: "Test your knowledge on DNA structure",
    actionLabel: "Take Quiz",
    priority: "medium",
    completed: false,
    action_type: "practice",
    target: "DNA Structure",
    created_at: new Date().toISOString()
  }
];

// Fixed the ActionCard properties to meet the type requirements
export const typedActionCards = actionCards.map(card => ({
  id: card.id,
  title: card.title,
  description: card.description,
  action_type: card.action_type as "revision" | "practice" | "wellness",
  target: card.target,
  priority: typeof card.priority === "string" ? 
    (card.priority === "high" ? 1 : card.priority === "medium" ? 2 : 3) : 
    card.priority,
  completed: Boolean(card.completed),
  created_at: card.created_at,
  impact_score: 75
}));
