
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  subjects, 
  chapters, 
  tasks, 
  suggestions, 
  instituteAssignments, 
  announcements, 
  sedentaryMetrics, 
  sleepMetrics 
} from "@/data/mockData";
import InstituteMode from "@/components/dashboard/InstituteMode";
import SelfStudyMode from "@/components/dashboard/SelfStudyMode";
import { CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const Dashboard = () => {
  const { mode } = useAppContext();
  const [activeSuggestion] = useState(suggestions[0]);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get the latest sleep metrics
  const latestSleepMetric = sleepMetrics[0]; 
  
  const handleOpenAssistant = () => {
    setAssistantOpen(true);
  };

  const handleAssistantFullPage = () => {
    setAssistantOpen(false);
    navigate('/assistant');
  };

  const handleViewSubject = (subjectId: string) => {
    navigate(`/${subjectId}`);
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {mode === "institute" ? (
        <InstituteMode
          activeSuggestion={activeSuggestion}
          tasks={tasks}
          instituteAssignments={instituteAssignments}
          announcements={announcements}
          latestSleepMetric={latestSleepMetric}
          sedentaryMetrics={sedentaryMetrics}
          handleOpenAssistant={handleOpenAssistant}
        />
      ) : (
        <SelfStudyMode
          subjects={subjects}
          chapters={chapters}
          tasks={tasks}
          activeSuggestion={activeSuggestion}
          latestSleepMetric={latestSleepMetric}
          sedentaryMetrics={sedentaryMetrics}
          assistantOpen={assistantOpen}
          setAssistantOpen={setAssistantOpen}
          handleOpenAssistant={handleOpenAssistant}
          handleAssistantFullPage={handleAssistantFullPage}
          handleViewSubject={handleViewSubject}
        />
      )}
    </div>
  );
};

export default Dashboard;
