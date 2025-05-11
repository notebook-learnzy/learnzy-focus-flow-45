
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
