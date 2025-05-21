import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AcademicAnalyticsSection from "@/components/Performance/AcademicAnalyticsSection";
import WellnessPerformanceSection from "@/components/Performance/WellnessPerformanceSection";
import RevisionScheduleSection from "@/components/Performance/RevisionScheduleSection";
import QualityScoreAndScheduler from "@/components/Performance/QualityScoreAndScheduler";
import { Button } from "@/components/ui/button";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";

const PerformanceReportPage = () => {
  const { subjectId, classId, chapterId, setId } = useParams();
  const navigate = useNavigate();
  const isCustom = window.location.pathname === "/academics/custom/performance";
  const custom = useCustomPracticeTest();

  if (isCustom && custom.session && custom.session.results) {
    const res = custom.session.results;
    const totalQuestions = custom.session.questions.length;
    const correctCount = res.results.filter((r: any) => r.user_answer === r.correct_answer).length;
    return (
      <div className="bg-[#FEF9F1] min-h-screen py-10 px-1">
        <div className="max-w-5xl mx-auto">
          <Button variant="outline" onClick={() => window.location.assign("/academics")} className="mb-6">
            ← Back to Academics
          </Button>
          <h2 className="text-lg font-bold text-[#FFBD59] mb-2">Custom Practice Test Performance</h2>
          <div className="mb-4">Questions: {totalQuestions}, Correct: {correctCount}</div>
          {/* Render summary as appropriate */}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF9F1] min-h-screen py-10 px-1">
      <div className="max-w-5xl mx-auto">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          ← Back
        </Button>
        <Tabs defaultValue="academics" className="w-full">
          <TabsList className="flex mb-4 bg-white rounded-xl shadow">
            <TabsTrigger value="academics" className="flex-1">Academic</TabsTrigger>
            <TabsTrigger value="wellness" className="flex-1">Wellness</TabsTrigger>
            <TabsTrigger value="revision" className="flex-1">Revision</TabsTrigger>
          </TabsList>
          <TabsContent value="academics">
            <AcademicAnalyticsSection />
          </TabsContent>
          <TabsContent value="wellness">
            <WellnessPerformanceSection />
          </TabsContent>
          <TabsContent value="revision">
            <QualityScoreAndScheduler chapterId={chapterId} setId={setId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default PerformanceReportPage;
