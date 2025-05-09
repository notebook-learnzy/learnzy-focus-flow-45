
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
  { id: "bio-11-1", name: "The Living World", progress: 0 },
  { id: "bio-11-2", name: "Structural Organisation in Animals", progress: 0 },
  { id: "bio-11-3", name: "Respiration in Plants", progress: 0 },
  { id: "bio-11-4", name: "Plant Kingdom", progress: 0 },
  { id: "bio-11-5", name: "Plant Growth and Development", progress: 0 },
  { id: "bio-11-6", name: "Photosynthesis in Higher Plants", progress: 0 },
  { id: "bio-11-7", name: "Neural Control and Coordination", progress: 0 },
  { id: "bio-11-8", name: "Morphology of Flowering Plants", progress: 0 },
  { id: "bio-11-9", name: "Locomotion and Movement", progress: 0 },
  { id: "bio-11-10", name: "Chemical Coordination and Integration", progress: 0 },
  { id: "bio-11-11", name: "Cell: The Unit of Life", progress: 0 },
  { id: "bio-11-12", name: "Cell Cycle and Cell Division", progress: 0 },
  { id: "bio-11-13", name: "Breathing and Exchange of Gases", progress: 0 },
  { id: "bio-11-14", name: "Body Fluids and Circulation", progress: 0 },
  { id: "bio-11-15", name: "Biomolecules", progress: 0 },
  { id: "bio-11-16", name: "Biological Classification", progress: 0 },
  { id: "bio-11-17", name: "Animal Kingdom", progress: 0 },
  { id: "bio-11-18", name: "Excretory Products and their Elimination", progress: 0 },
  { id: "bio-11-19", name: "Anatomy of Flowering Plants", progress: 0 }
];

export const botanyChapters11 = [
  { id: "bot-11-1", name: "The Living World", progress: 0 },
  { id: "bot-11-2", name: "Structural Organisation in Plants", progress: 0 },
  { id: "bot-11-3", name: "Respiration in Plants", progress: 0 },
  { id: "bot-11-4", name: "Plant Kingdom", progress: 0 },
  { id: "bot-11-5", name: "Plant Growth and Development", progress: 0 },
  { id: "bot-11-6", name: "Photosynthesis in Higher Plants", progress: 0 },
  { id: "bot-11-7", name: "Morphology of Flowering Plants", progress: 0 },
  { id: "bot-11-8", name: "Anatomy of Flowering Plants", progress: 0 },
  { id: "bot-11-9", name: "Transport in Plants", progress: 0 },
  { id: "bot-11-10", name: "Mineral Nutrition", progress: 0 },
  { id: "bot-11-11", name: "Cell: The Unit of Life", progress: 0 },
  { id: "bot-11-12", name: "Cell Cycle and Cell Division", progress: 0 },
  { id: "bot-11-13", name: "Biological Classification", progress: 0 },
  { id: "bot-11-14", name: "The Living World", progress: 0 },
  { id: "bot-11-15", name: "Biomolecules", progress: 0 }
];

// Added chapters - combining all chapters for simplicity
export const chapters = [
  ...biologyChapters11.map(chapter => ({
    ...chapter,
    subject: "biology",
    class: "11",
    lastPracticed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  })),
  ...botanyChapters11.map(chapter => ({
    ...chapter,
    subject: "botany",
    class: "11",
    lastPracticed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
];

// Mock data for tasks
export const tasks = [
  {
    id: "task1",
    title: "Complete Physics Set A",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    subject: "Physics"
  },
  {
    id: "task2",
    title: "Review Biology Chapter 3",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    subject: "Biology"
  },
  {
    id: "task3",
    title: "Chemistry Weekly Test",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    subject: "Chemistry"
  },
  {
    id: "task4",
    title: "Mathematics Practice Problems",
    date: new Date(Date.now()).toISOString(),
    completed: false,
    subject: "Mathematics"
  },
  {
    id: "task5",
    title: "Biology Revision Session",
    date: new Date(Date.now()).toISOString(),
    completed: true,
    subject: "Biology"
  }
];

// Mock data for suggestions
export const suggestions = [
  {
    id: "sug1",
    title: "Take a break! You've been studying for 2 hours",
    description: "Research shows taking short breaks improves retention. Try a 5-minute walk.",
    actionLabel: "Set a timer",
    type: "wellness"
  },
  {
    id: "sug2",
    title: "Physics chapter 7 needs attention",
    description: "Your accuracy has dropped below 60%. Consider revisiting the core concepts.",
    actionLabel: "Review Chapter",
    type: "academic"
  },
  {
    id: "sug3",
    title: "Join upcoming Biology group study",
    description: "10 peers are meeting tomorrow at 6PM to review Cell Division.",
    actionLabel: "Join Group",
    type: "social"
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

// Mock data for question sets
export const questionSets = [
  {
    id: "set1",
    chapter_id: "bio-11-1",
    set_type: "A",
    questions: [
      { id: "q1", text: "What is the definition of taxonomy?", difficulty: 1 },
      { id: "q2", text: "Explain the binomial nomenclature system.", difficulty: 2 }
    ],
    completed_date: null,
    scheduled_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "set2",
    chapter_id: "bio-11-2",
    set_type: "B",
    questions: [
      { id: "q3", text: "Describe the structure of epithelial tissue.", difficulty: 2 },
      { id: "q4", text: "What are the functions of connective tissue?", difficulty: 2 }
    ],
    completed_date: null,
    scheduled_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "set3",
    chapter_id: "bio-11-3",
    set_type: "C",
    questions: [
      { id: "q5", text: "Explain the process of glycolysis.", difficulty: 3 },
      { id: "q6", text: "What is the role of mitochondria in cellular respiration?", difficulty: 3 }
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
    priority: "high"
  },
  {
    id: "action2",
    title: "Review Photosynthesis",
    description: "Revisit key concepts and mechanisms",
    actionLabel: "Review Now",
    priority: "medium"
  },
  {
    id: "action3",
    title: "Take DNA Quiz",
    description: "Test your knowledge on DNA structure",
    actionLabel: "Take Quiz",
    priority: "medium"
  }
];
