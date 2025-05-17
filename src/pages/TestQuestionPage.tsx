
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RelaxStatusIndicator from "../components/RelaxStatusIndicator";
import { cn } from "@/lib/utils";

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

const MOCK_TIMER_SEC = 1800;

const TestQuestionPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();
  const [currQ, setCurrQ] = useState(0);
  const [selected, setSelected] = useState<(number|undefined)[]>(Array(mockQuestions.length));
  const [timer, setTimer] = useState(MOCK_TIMER_SEC);

  // Timer effect
  // ... Optionally, add timer logic if needed
  
  const handleOption = (idx: number) => {
    const updated = [...selected];
    updated[currQ] = idx;
    setSelected(updated);
  };

  const nextQ = () => setCurrQ((c) => Math.min(mockQuestions.length - 1, c + 1));
  const prevQ = () => setCurrQ((c) => Math.max(0, c - 1));

  const submitTest = () => {
    navigate(`/academics/${subjectId}/classes/${classId}/chapters/${chapterId}/sets/${setId}/analyze`, { state: { selected } });
  };

  return (
    <div className="bg-[#FEF9F1] min-h-screen pt-6 pb-6 px-1 sm:px-0">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-8 relative">
        {/* Palette Column */}
        <div className="shrink-0 md:w-52 mb-8 md:mb-0">
          <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-4">
            <RelaxStatusIndicator />
            <div className="mt-3 mb-1 text-sm font-semibold text-gray-800">Questions</div>
            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-2 gap-2">
              {mockQuestions.map((q, i) => (
                <button
                  key={q.id}
                  className={cn(
                    "w-9 h-9 rounded-full border text-base font-semibold",
                    currQ === i
                      ? "bg-[#FFBD59] text-white border-[#FFBD59]"
                      : selected[i] !== undefined
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  )}
                  onClick={() => setCurrQ(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Main Panel */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-bold text-lg text-neutral-700">Test - Set {setId?.toUpperCase() || "A"}</span>
              <div className="text-xs text-gray-400 mt-1">
                Cell Biology • Class XI • 3 Questions (Sample)
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-base font-medium">
                Time Left: <span className="font-mono">{Math.floor(timer/60)}:{("0"+(timer%60)).slice(-2)}</span>
              </div>
              <div className="hidden sm:flex">
                <RelaxStatusIndicator />
              </div>
            </div>
          </div>
          {/* Main Question Card */}
          <Card className="p-5 mb-6 bg-white shadow-md rounded-3xl">
            <div className="font-semibold text-gray-800 mb-4">Question {currQ+1} / {mockQuestions.length}</div>
            <div className="text-lg font-medium mb-8">{mockQuestions[currQ].text}</div>
            <div>
              {mockQuestions[currQ].options.map((opt, idx) => (
                <div
                  key={idx}
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
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleOption(idx); }}
                >
                  <span>
                    <span className="font-semibold mr-2">{String.fromCharCode(65+idx)}.</span>{opt}
                  </span>
                  <span>
                    {selected[currQ] === idx && <span className="ml-2">✔️</span>}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" disabled={currQ===0} onClick={prevQ}>Previous</Button>
              {currQ === mockQuestions.length-1 ? (
                <Button className="bg-[#FFBD59]" onClick={submitTest}>Submit Test</Button>
              ) : (
                <Button onClick={nextQ}>Next</Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionPage;
