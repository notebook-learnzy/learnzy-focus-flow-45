
import { addDays, format, parseISO } from 'date-fns';
import { QuestionSet } from '@/types';

/**
 * Schedules spaced revision sets based on completion date of Set A
 */
export const scheduleSpacedRevision = (
  completionDate: string,
  chapterId: string,
  performanceScore: number = 100
): Partial<QuestionSet>[] => {
  const baseDate = typeof completionDate === 'string' ? parseISO(completionDate) : completionDate;
  
  // Dynamic adjustment based on performance
  const performanceMultiplier = performanceScore < 70 ? 0.7 : 1;
  
  // Standard spacing intervals for Sets B-E
  const intervals = [
    7, // Set B: base + 7 days
    14, // Set C: base + 14 days
    21, // Set D: base + 21 days
    49, // Set E: base + 49 days
  ];
  
  // Create scheduled sets
  return [
    { set_type: 'B', chapter_id: chapterId, scheduled_date: format(addDays(baseDate, Math.round(intervals[0] * performanceMultiplier)), 'yyyy-MM-dd') },
    { set_type: 'C', chapter_id: chapterId, scheduled_date: format(addDays(baseDate, Math.round(intervals[1] * performanceMultiplier)), 'yyyy-MM-dd') },
    { set_type: 'D', chapter_id: chapterId, scheduled_date: format(addDays(baseDate, Math.round(intervals[2] * performanceMultiplier)), 'yyyy-MM-dd') },
    { set_type: 'E', chapter_id: chapterId, scheduled_date: format(addDays(baseDate, Math.round(intervals[3] * performanceMultiplier)), 'yyyy-MM-dd') }
  ];
};

/**
 * Converts a scheduled question set to a calendar task
 */
export const createTaskFromQuestionSet = (
  questionSet: Partial<QuestionSet>, 
  chapterName: string
): { 
  id: string; 
  title: string; 
  type: "practice"; 
  date: string; 
  time: string; 
  duration: number; 
  completed: boolean; 
  chapterId: string; 
} => {
  return {
    id: `task-${questionSet.chapter_id}-${questionSet.set_type}`,
    title: `${chapterName}: Practice Set ${questionSet.set_type}`,
    type: "practice",
    date: questionSet.scheduled_date!,
    time: "18:00", // Default time
    duration: 45, // Default duration in minutes
    completed: false,
    chapterId: questionSet.chapter_id!
  };
};
