
import { DifficultyLevel, QuestionSet } from '@/types';

/**
 * Adjusts difficulty level based on user performance
 */
export const calculateNextSetDifficulty = (
  accuracy: number,
  focusScore: number
): { 
  difficultyAdjustment: 'easier' | 'harder' | 'same';
  intervalAdjustment: number; // percentage to adjust interval (positive = longer, negative = shorter)
} => {
  // Adaptive difficulty logic
  if (accuracy >= 80 && focusScore < 50) {
    // High accuracy but low focus - make slightly easier to reduce cognitive load
    return { difficultyAdjustment: 'easier', intervalAdjustment: 0 };
  } else if (accuracy < 70) {
    // Low accuracy - make easier and shorten interval
    return { difficultyAdjustment: 'easier', intervalAdjustment: -20 };
  } else if (accuracy > 90) {
    // Very high accuracy - make slightly harder and potentially extend interval
    return { difficultyAdjustment: 'harder', intervalAdjustment: 10 };
  }
  
  // Default case: maintain current difficulty
  return { difficultyAdjustment: 'same', intervalAdjustment: 0 };
};

/**
 * Adjusts the difficulty distribution of questions in a set
 */
export const adjustQuestionDifficulty = (
  questions: any[],
  adjustment: 'easier' | 'harder' | 'same'
): any[] => {
  if (adjustment === 'same') {
    return questions;
  }
  
  // Create a difficulty mapping where each level can be adjusted up or down
  const difficultyMap: Record<DifficultyLevel, DifficultyLevel> = {
    'Easy': adjustment === 'easier' ? 'Easy' : 'Medium',
    'Medium': adjustment === 'easier' ? 'Easy' : 'Hard',
    'Hard': adjustment === 'easier' ? 'Medium' : 'Hard'
  };
  
  // Adjust the questions based on the mapping
  return questions.map(question => ({
    ...question,
    difficulty_level: difficultyMap[question.difficulty_level]
  }));
};
