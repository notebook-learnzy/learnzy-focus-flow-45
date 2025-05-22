import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import RelaxStatusIndicator from "@/components/RelaxStatusIndicator";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";

// Utility to convert a human/route chapter key to a Supabase table name.
// Handles all Botany & Zoology class 11 chapters and sets (A/B/C...).
function getSupabaseTableName(chapterKey: string, setType: string) {
  // These mappings are based on your table-naming scheme.
  // Add/adjust for chapters with special keys/numbers if necessary.
  // Standard fallback:
  // chapter_{N}_{chapter_key}_set_{setType}
  // When in doubt, use the chapterKey + setType + a mapping dictionary if needed.

  // If you have more "special" cases, add them here:
  const tableMap: Record<string, string> = {
    // Zoology 11
    "tissues": "chapter_7_tissues_set_", // STRUCTURAL ORGANISATION IN ANIMALS
    "body-fluids-circulation": "chapter_3_body_fluids_circulation_set_",
    // Botany 11
    "the-living-world": "chapter_1_living_world_set_",
    "biological-classification": "chapter_2_biological_classification_set_",
    "plant-kingdom": "chapter_3_plant_kingdom_set_",
    "plant-morphology": "chapter_5_morphology_of_flowering_plant_set_",
    "plant-anatomy": "chapter_6_anatomy_of_flowering_plant_set_",
    "cell-bio": "chapter_8_cell_bio_set_",
    "biomolecules": "chapter_9_biomolecules_set_",
    "cell-cycle": "chapter_10_cell_cycle_set_",
    "transport-plants": "chapter_11_transport_plants_set_",
    "mineral-nutrition": "chapter_12_mineral_nutrition_set_",
    "photosynthesis": "chapter_13_photosynthesis_set_",
    "respiration-plants": "chapter_14_respiration_plants_set_",
    "plant-growth": "chapter_15_plant_growth_set_",
    // Expand as needed!
  };

  if (tableMap[chapterKey]) {
    return `${tableMap[chapterKey]}${setType.toLowerCase()}`;
  }
  // Fallback for generic (for chapters without a special mapping)
  return `chapter_${chapterKey}_set_${setType.toLowerCase()}`;
}

function mapCorrectAnswerToIdx(ans: string) {
  if (!ans) return -1;
  return ['a', 'b', 'c', 'd'].indexOf(ans.toLowerCase());
}

const TestQuestionPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currQ, setCurrQ] = useState(0);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [hrvs, setHRVs] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(Date.now());

  const isCustom = window.location.pathname === "/academics/custom/test";
  const customPractice = useCustomPracticeTest();

  useEffect(() => {
    if (isCustom && customPractice.session) {
      setQuestions(customPractice.session.questions);
      setSelected(new Array(customPractice.session.questions.length).fill(undefined));
      setQuestionTimes(new Array(customPractice.session.questions.length).fill(0));
      setHRVs(new Array(customPractice.session.questions.length).fill(70));
      setStartTime(Date.now());
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [isCustom, customPractice.session]);

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      setError(null);

      if (!chapterId || !setId) {
        setQuestions([]);
        setIsLoading(false);
        setError("Missing chapter or set information.");
        return;
      }
      const tableName = getSupabaseTableName(chapterId, setId);

      const { data, error } = await supabase
        .from(tableName as any)
        .select("*")
        .order("q_no", { ascending: true })
        .limit(50);

      if (error) {
        setError(error.message);
        setQuestions([]);
        setIsLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setError("No questions found for this set yet.");
        setQuestions([]);
        setIsLoading(false);
        return;
      }

      setQuestions(data || []);
      setSelected(new Array((data || []).length).fill(undefined));
      setQuestionTimes(new Array((data || []).length).fill(0));
      setHRVs(new Array((data || []).length).fill(70)); // HRV baseline
      setStartTime(Date.now());
      setIsLoading(false);
    }
    fetchQuestions();
    // eslint-disable-next-line
  }, [chapterId, setId]);

  useEffect(() => {
    setQuestionTimes(times => {
      const newTimes = [...times];
      newTimes[currQ] = 0;
      return newTimes;
    });
    setStartTime(Date.now());
    setHRVs(hrvs => {
      const newH = [...hrvs];
      newH[currQ] = 60 + Math.floor(Math.random() * 30);
      return newH;
    });
    // eslint-disable-next-line
  }, [currQ]);

  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setQuestionTimes(times => {
        const newTimes = [...times];
        newTimes[currQ] = Math.floor((Date.now() - startTime) / 1000);
        return newTimes;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currQ, startTime, isLoading]);

  const handleOption = (idx: number) => {
    setSelected(sels => {
      const up = [...sels];
      up[currQ] = idx;
      return up;
    });
    setHRVs(h => {
      const hn = [...h];
      hn[currQ] = 60 + Math.floor(Math.random() * 30); // Simulate metric
      return hn;
    });
  };

  const nextQ = () => setCurrQ((c) => Math.min(questions.length - 1, c + 1));
  const prevQ = () => setCurrQ((c) => Math.max(0, c - 1));

  const [saving, setSaving] = useState(false);

  // --- UPDATED SUBMIT HANDLER (no auth) ---
  const submitTest = async () => {
    setSaving(true);

    // Build results data for each question
    const results = questions.map((q, i) => ({
      id: q.id || q.q_no?.toString() || `${i}`,
      q_no: q.q_no,
      question_text: q.question_text,
      userAnswer: selected[i] !== undefined ? ['a', 'b', 'c', 'd'][selected[i]!] : null,
      correct_answer: q.correct_answer,
      isCorrect: selected[i] !== undefined &&
        ['a', 'b', 'c', 'd'][selected[i]!] === (q.correct_answer?.toLowerCase() || "")
        ? true : false,
      topic: q.topic,
      subtopic: q.subtopic,
      time_spent: questionTimes[i],
      difficulty_level: q.difficulty_level,
      hrv: hrvs[i],
      tags: [], // start blank
    }));

    if (!isCustom) {
      // Always use user_id as a valid UUID for test purposes
      const testUserId = "00000000-0000-0000-0000-000000000001";
      const { data, error } = await supabase
        .from("test_sessions")
        .insert([{
          user_id: testUserId, // always use a valid UUID
          subject: subjectId ?? "",
          class_id: classId ?? "",
          chapter_id: chapterId ?? "",
          set_id: setId ?? "",
          total_questions: results.length,
          total_correct: results.filter(r => r.isCorrect).length,
          total_incorrect: results.filter(r => r.userAnswer && !r.isCorrect).length,
          total_unattempted: results.filter(r => !r.userAnswer).length,
          total_time: questionTimes.reduce((total, t) => total + (t || 0), 0),
          session_type: "practice",
          questions_data: results,
        }])
        .select("id")
        .single();
      setSaving(false);

      if (error || !data?.id) {
        setError("Failed to save results. Please try again.");
        return;
      }

      // Redirect to analyze mistakes page with sessionId
      navigate(
        `/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/analyze?sessionId=${data.id}`,
        { state: { sessionId: data.id } }
      );
    } else {
      setSaving(true);
      // Practice test, use existing logic
      customPractice.setCustomResults({
        questions,
        selected,
        questionTimes,
        hrvs,
        results,
      });
      setSaving(false);
      // For custom, send to a separate analyze page (if needed)
      window.location.assign(`/academics/custom/analyze`);
    }
  };

  if (isLoading)
    return <div className="p-14 text-lg text-center">Loading questions...</div>;

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF9F1] px-2">
        <Card className="p-8 text-center bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Whoops</h2>
          <p>{error}</p>
          <Button className="mt-8 bg-[#FFBD59]" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  if (!questions.length) return null;

  const q = questions[currQ];

  return (
    <div className="bg-[#FEF9F1] min-h-screen pt-6 pb-6 px-1 sm:px-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-bold text-lg text-neutral-700">
              Test - Set {setId?.toUpperCase() || "A"}
            </span>
            <div className="text-xs text-gray-400 mt-1">
              {chapterId || "Chapter"} • Class {classId ? classId.toUpperCase() : "XI"} • {questions.length} Questions
            </div>
          </div>
          <RelaxStatusIndicator />
        </div>
        <Card className="p-5 mb-6 bg-white shadow-md rounded-3xl">
          <div className="font-semibold text-gray-800 mb-4">
            Question {q.q_no} / {questions.length}
          </div>
          <div className="text-lg font-medium mb-6">{q.question_text}</div>
          <div>
            {["a", "b", "c", "d"].map((optKey, idx) => {
              const optVal = q[`option_${optKey}`];
              return (
                <div
                  key={optKey}
                  onClick={() => handleOption(idx)}
                  className={cn(
                    "p-3 border rounded-lg mb-3 cursor-pointer flex justify-between items-center hover:shadow transition-all",
                    selected[currQ] === idx
                      ? "border-[#FFBD59] bg-[#FFF7EB] text-[#e57311] font-semibold"
                      : "border-gray-200 bg-gray-50"
                  )}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected[currQ] === idx}
                >
                  <span>
                    <span className="font-semibold mr-2">{String.fromCharCode(65+idx)}.</span>{optVal}
                  </span>
                  <span>
                    {selected[currQ] === idx && <span className="ml-2">✔️</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" disabled={currQ===0} onClick={prevQ}>Previous</Button>
            {currQ === questions.length-1 ? (
              <Button className="bg-[#FFBD59]" onClick={submitTest} disabled={saving}>
                {saving ? "Saving..." : "Submit Test"}
              </Button>
            ) : (
              <Button onClick={nextQ}>Next</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestQuestionPage;
