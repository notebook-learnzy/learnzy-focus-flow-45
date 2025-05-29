
// Utility: builds questions_data as per schema spec
export function buildQuestionsData(questions: any[]) {
  return questions.map((q: any, i: number) => {
    const options = [
      { id: "A", text: q.option_a },
      { id: "B", text: q.option_b },
      { id: "C", text: q.option_c },
      { id: "D", text: q.option_d },
    ];
    return {
      id: q.id || q.q_no?.toString() || `${i}`,
      text: q.question_text,
      correctAnswer: (q.correct_answer || "A").toUpperCase(),
      userAnswer: null,
      isCorrect: false,
      timeTaken: 0,
      tags: [],
      Subject: q.subject,
      Chapter_name: q.chapter_name,
      Topic: q.topic,
      Subtopic: q.subtopic,
      Difficulty_Level: q.difficulty_level,
      Question_Structure: q.question_type,
      Bloom_Taxonomy: q.bloom_taxonomy,
      Priority_Level: q.priority_level,
      Time_to_Solve: q.time_to_solve,
      Key_Concept_Tested: q.key_concept_tested,
      Common_Pitfalls: q.common_pitfalls,
      Option_A: q.option_a,
      Option_B: q.option_b,
      Option_C: q.option_c,
      Option_D: q.option_d,
      options,
      // Initialize timing fields
      questionViewedAt: undefined,
      questionLeftAt: undefined,
      detailedTimingEvents: [],
    };
  });
}
