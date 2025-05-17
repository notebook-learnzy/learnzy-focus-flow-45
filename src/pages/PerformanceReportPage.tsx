
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const mockQuestions = [
  {
    id: "q1",
    text: "Sample Q1: What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    answer: 1,
    user: 0,
    time: 48,
  },
  {
    id: "q2",
    text: "Sample Q2: DNA is mainly present in?",
    options: ["Mitochondria", "Nucleus", "Cytoplasm", "Cell Membrane"],
    answer: 1,
    user: undefined,
    time: 75,
  },
  {
    id: "q3",
    text: "Sample Q3: Which cell organelle has its own DNA?",
    options: ["Lysosome", "Golgi", "Mitochondria", "Ribosome"],
    answer: 2,
    user: 1,
    time: 62,
  },
];

const mistakePatternStats = [
  { tag: "Didn't Revise", count: 2 },
  { tag: "Misread", count: 1 },
];

const PerformanceReportPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();
  // Section 1: Time per question
  const chartData = mockQuestions.map((q, i) => ({
    name: "Q"+(i+1),
    time: q.time,
  }));
  // Section 2: Mistake pattern
  // Section 3: Chapter accuracy (mock)
  const accuracy = [84, 67, 90];
  const chapters = ["Cell Bio", "Genetics", "Biomolecules"];

  return (
    <div className="bg-[#FEF9F1] min-h-screen py-10 px-1">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← Back
        </Button>
        <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
          <h2 className="text-lg font-bold text-[#FFBD59] mb-4">🕑 Time Spent Per Question</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="time" fill="#FFBD59" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
          <h2 className="text-lg font-bold text-[#FFBD59] mb-4">❌ Mistake Pattern</h2>
          {(mistakePatternStats.length === 0) ? (
            <div className="text-gray-400 py-6 text-center">No mistakes detected!</div>
          ) : (
            <div className="flex gap-3 flex-wrap">
              {mistakePatternStats.map(pattern => (
                <div key={pattern.tag} className="bg-[#FFF7EB] px-4 py-2 rounded-2xl shadow-sm font-semibold text-[#FFBD59]">{pattern.tag}: {pattern.count}</div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-6 mb-8 bg-white shadow rounded-3xl">
          <h2 className="text-lg font-bold text-[#FFBD59] mb-4">📖 Performance by Chapter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {chapters.map((ch, i) => (
              <div key={ch} className="bg-yellow-50 p-5 rounded-xl text-center">
                <div className="font-bold text-md mb-2">{ch}</div>
                <div className="text-3xl font-black text-[#FFBD59]">{accuracy[i]}%</div>
                <div className="text-xs text-gray-400 mt-1">Mastery</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="text-center mt-10">
          <Button className="bg-[#FFBD59]" onClick={() => navigate(`/subject/${subjectId}`)}>Return to Dashboard</Button>
        </div>
      </div>
    </div>
  );
};
export default PerformanceReportPage;
