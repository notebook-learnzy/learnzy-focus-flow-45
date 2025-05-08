
import { addDays, format, parseISO } from 'date-fns';
import { QuestionSet } from '@/types';

/**
 * Schedules spaced revision sets based on completion date of Set A
 * with dynamic interval adjustments based on performance
 */
export const scheduleSpacedRevision = (
  completionDate: string,
  chapterId: string,
  performanceScore: number = 100,
  intervalAdjustments: Record<string, number> = {}
): Partial<QuestionSet>[] => {
  const baseDate = typeof completionDate === 'string' ? parseISO(completionDate) : completionDate;
  
  // Dynamic adjustment based on performance
  const performanceMultiplier = performanceScore < 70 ? 0.7 : 1;
  
  // Standard spacing intervals for Sets B-E
  const baseIntervals = {
    'B': 7,  // Set B: base + 7 days
    'C': 14, // Set C: base + 14 days
    'D': 21, // Set D: base + 21 days
    'E': 49, // Set E: base + 49 days
  };
  
  // Apply dynamic interval adjustments
  const intervals = Object.entries(baseIntervals).map(([setType, interval]) => {
    const adjustmentPercent = intervalAdjustments[setType] || 0;
    const adjustedInterval = interval * (1 + adjustmentPercent/100);
    return { 
      set_type: setType as "B" | "C" | "D" | "E", 
      interval: Math.round(adjustedInterval * performanceMultiplier) 
    };
  });
  
  // Create scheduled sets
  return intervals.map(({ set_type, interval }) => ({
    set_type,
    chapter_id: chapterId,
    scheduled_date: format(addDays(baseDate, interval), 'yyyy-MM-dd'),
    interval_adjusted: intervalAdjustments[set_type] !== undefined && intervalAdjustments[set_type] !== 0
  }));
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
  interval_adjusted?: boolean;
} => {
  return {
    id: `task-${questionSet.chapter_id}-${questionSet.set_type}`,
    title: `${chapterName}: Practice Set ${questionSet.set_type}`,
    type: "practice",
    date: questionSet.scheduled_date!,
    time: "18:00", // Default time
    duration: 45, // Default duration in minutes
    completed: false,
    chapterId: questionSet.chapter_id!,
    interval_adjusted: questionSet.interval_adjusted
  };
};
