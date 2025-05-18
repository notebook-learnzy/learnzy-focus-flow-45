
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
  classId: string; // ADDED THIS LINE
  progress: number;
  lastPracticed?: string | null;
};
