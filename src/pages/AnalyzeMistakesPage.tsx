import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const mistakeTags = [
  "Didn't Revise Concept", "Misread Question", "Time Pressure", "Silly Mistake", "Careless Error", "Need Practice"
];

const AnalyzeMistakesPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any | null>(null);
  const [tags, setTags] = useState<{[qid:string]: string[]}>({});
  const [loading, setLoading] = useState(false);
  // Supports only The Living World for Supabase fetch
  useEffect(() => {
    async function fetchSession() {
      if (chapterId === "the-living-world") {
        setLoading(true);
        // Try fetch result for user: session_results based on chapter/set (fake, for demo, first found)
        const { data } = await supabase
          .from("session_results")
          .select("*")
          .eq("chapter_id", chapterId)
          .eq("set_id", setId)
          .order("created_at", { ascending: false })
          .limit(1);
        if (data && data.length > 0) setSession(data[0]);
        setLoading(false);
      }
    }
    fetchSession();
  }, [chapterId, setId]);

  // Fallback mock data in case no session found
  const mockQuestions = [
    {
      id: "q1",
      text: "Sample Q1: What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      answer: 1,
    },
    {
      id: "q2",
      text: "Sample Q2: DNA is mainly present in?",
      options: ["Mitochondria", "Nucleus", "Cytoplasm", "Cell Membrane"],
      answer: 1,
    },
    {
      id: "q3",
      text: "Sample Q3: Which cell organelle has its own DNA?",
      options: ["Lysosome", "Golgi", "Mitochondria", "Ribosome"],
      answer: 2,
    },
  ];

  let analyzedQuestions = mockQuestions;
  let selected = (location.state?.selected ?? [undefined, undefined, undefined]) as (number|undefined)[];
  if (session && session.questions) {
    analyzedQuestions = session.questions.map((q:any, idx:number) => ({
      id: q.question_id?.toString() || `q${idx+1}`,
      text: q.question_text || `Q${idx+1}`,
      options: [q.option_a, q.option_b, q.option_c, q.option_d],
      answer: ['a','b','c','d'].indexOf(q.correct_answer?.toLowerCase?.()),
    }));
    selected = session.questions.map((q:any) => q.user_answer ? ['a','b','c','d'].indexOf(q.user_answer?.toLowerCase?.()) : undefined);
  }

  // Mistakes: if answer incorrect or unattempted
  const mistakeIndexes = analyzedQuestions.map(
    (q, idx) =>
      selected[idx] === undefined || selected[idx] !== q.answer
  );
  const incorrectIds = analyzedQuestions.filter((_,i)=>mistakeIndexes[i]).map(q=>q.id);

  const handleTag = (qid: string, tag: string) => {
    setTags(prev => ({
      ...prev,
      [qid]: prev[qid]?.includes(tag)
        ? prev[qid].filter(t => t !== tag)
        : [...(prev[qid]||[]), tag]
    }))
  };

  const finish = () => {
    // Save tags -- skip for demo
    navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/performance`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF9F1]">Loading...</div>
  );

  if (!session && chapterId === "the-living-world") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF9F1]">
        <Card className="p-8 text-center bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Mock Data Displayed</h2>
          <p>Could not find any real session results.<br/>You're seeing example questions for demo purposes.</p>
          <Button className="mt-8 bg-[#FFBD59]" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF9F1] py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <h2 className="text-lg font-bold mb-2 text-[#FFBD59]">Analyze Your Mistakes</h2>
          <p className="mb-6 text-gray-500">
            Review incorrect or unattempted questions. Tag common reasons—it will help Shiv guide your revision!
          </p>
          {analyzedQuestions.map((q, idx) => {
            if (!mistakeIndexes[idx]) return null;
            return (
              <div className="mb-8" key={q.id}>
                <div className="mb-1 text-sm font-medium text-gray-700">
                  Q{idx+1}. {q.text}
                </div>
                <div className="mb-2">
                  <div>
                    <span className="mr-2 text-xs text-gray-500">Your Answer: </span>
                    <span className="font-medium">{selected[idx] !== undefined ? q.options[selected[idx]!] : "Unattempted"}</span>
                  </div>
                  <div>
                    <span className="mr-2 text-xs text-gray-500">Correct: </span>
                    <span className="font-semibold text-green-600">{q.options[q.answer]}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 my-3">
                  {mistakeTags.map(tag => (
                    <Button
                      key={tag}
                      variant={tags[q.id]?.includes(tag) ? "default" : "outline"}
                      className={tags[q.id]?.includes(tag) ? "bg-[#FFBD59] border-[#FFBD59]" : ""}
                      size="sm"
                      onClick={() => handleTag(q.id, tag)}
                    >{tag}</Button>
                  ))}
                </div>
              </div>
            );
          })}

          <Button className="mt-4 w-full bg-[#FFBD59]" onClick={finish}>
            Complete and Link to Mistake Notebook
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AnalyzeMistakesPage;
