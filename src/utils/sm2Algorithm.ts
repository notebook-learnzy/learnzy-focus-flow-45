
// SM2 Algorithm Implementation for Spaced Repetition
export interface SM2Data {
  set: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  lastReviewed: Date;
  nextReview: Date;
  quality: number;
  accuracy: number;
}

// Convert accuracy percentage to quality score (0-5)
export function accuracyToQuality(accuracy: number): number {
  if (accuracy >= 90) return 5;
  if (accuracy >= 80) return 4;
  if (accuracy >= 70) return 3;
  if (accuracy >= 50) return 2;
  if (accuracy >= 30) return 1;
  return 0;
}

// Calculate new ease factor based on quality
export function calculateEaseFactor(oldEF: number, quality: number): number {
  const newEF = oldEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(1.3, newEF); // Minimum EF is 1.3
}

// Calculate next interval using SM2
export function calculateInterval(
  quality: number, 
  repetitions: number, 
  interval: number, 
  easeFactor: number
): number {
  if (quality < 3) {
    // If quality is poor, restart
    return 1;
  }
  
  if (repetitions === 0) return 1;
  if (repetitions === 1) return 6;
  
  return Math.round(interval * easeFactor);
}

// Main SM2 calculation function
export function calculateSM2(
  previousData: Partial<SM2Data>,
  accuracy: number,
  currentDate: Date = new Date()
): SM2Data {
  const quality = accuracyToQuality(accuracy);
  const repetitions = (previousData.repetitions || 0) + 1;
  const oldEF = previousData.easeFactor || 2.5;
  const oldInterval = previousData.interval || 1;
  
  const newEF = calculateEaseFactor(oldEF, quality);
  const newInterval = calculateInterval(quality, repetitions, oldInterval, newEF);
  
  const nextReview = new Date(currentDate);
  nextReview.setDate(nextReview.getDate() + newInterval);
  
  return {
    set: previousData.set || 'A',
    easeFactor: newEF,
    interval: newInterval,
    repetitions: quality < 3 ? 0 : repetitions,
    lastReviewed: currentDate,
    nextReview,
    quality,
    accuracy
  };
}

// Get next set in sequence
export function getNextSet(currentSet: string): string | null {
  const setSequence = ['A', 'B', 'C', 'D', 'E', 'F'];
  const currentIndex = setSequence.indexOf(currentSet.toUpperCase());
  
  if (currentIndex === -1 || currentIndex === setSequence.length - 1) {
    return null; // Invalid set or last set
  }
  
  return setSequence[currentIndex + 1];
}

// Format interval for display
export function formatInterval(days: number): string {
  if (days === 1) return "1 day";
  if (days < 30) return `${days} days`;
  if (days < 365) return `${Math.round(days / 30)} months`;
  return `${Math.round(days / 365)} years`;
}
