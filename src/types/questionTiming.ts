
export interface QuestionTimingEvent {
  eventType: 'questionViewed' | 'questionLeft';
  timestamp: string; // ISO format: yyyy-mm-ddThh:mm:ss.sssZ
  formattedTime: string; // Your preferred format: yyyy-mm-dd, hh:mm:ss.000
}

export interface QuestionTimingData {
  questionId: string;
  timingEvents: QuestionTimingEvent[];
  totalTimeSpent?: number; // in seconds
}
