
import { useParams, useNavigate } from "react-router-dom";
import MeditationRitual from "@/components/MeditationRitual";

const PracticeRitual = () => {
  const { subjectId, classId, chapterId, setId } = useParams<{ 
    subjectId: string; 
    classId: string; 
    chapterId: string; 
    setId: string;
  }>();
  
  const navigate = useNavigate();

  const handleComplete = () => {
    // In a real app, we would log completion to Supabase here
    // logMeditationCompletion(false, 60);
    
    // Navigate to the practice page
    navigate(`/practice/${subjectId}/${classId}/${chapterId}/set/${setId}`);
  };

  const handleSkip = () => {
    // In a real app, we would log skipped to Supabase here
    // logMeditationCompletion(true, 60 - timeRemaining);
    
    // Navigate to the practice page
    navigate(`/practice/${subjectId}/${classId}/${chapterId}/set/${setId}`);
  };

  return (
    <MeditationRitual
      onComplete={handleComplete}
      onSkip={handleSkip}
      duration={60}
    />
  );
};

export default PracticeRitual;
