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
