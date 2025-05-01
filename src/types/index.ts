
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
};

export type Suggestion = {
  id: string;
  message: string;
  action: string;
  applied: boolean;
  date: string;
};
