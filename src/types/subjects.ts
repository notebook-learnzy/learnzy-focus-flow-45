
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
