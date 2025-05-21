import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutGrid, BookOpen, BookText, Brain, Atom, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { subjects, tasks } from "@/data/mockData";
import SubjectCard from "@/components/SubjectCard";
import { format } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";
import ModeToggle from "@/components/ModeToggle";
import SelfStudyMode from "@/components/dashboard/SelfStudyMode";
import InstituteMode from "@/components/dashboard/InstituteMode";
import CustomPracticeTestModal from "@/components/CustomPracticeTestModal";
import { CustomPracticeTestProvider } from "@/contexts/CustomPracticeTestContext";

// Mock assignments and announcements for institute mode
const mockAssignments = [
  {
    id: "a1",
    title: "Physics Test Series - 1",
    deadline: "2025-05-21",
  },
  {
    id: "a2",
    title: "Zoology Worksheet - Genetics",
    deadline: "2025-05-24",
  },
];

const mockAnnouncements = [
  {
    id: "n1",
    title: "NEET Webinar by Experts",
    date: "2025-05-16",
    content: "Attend the online NEET tips session Saturday at 10AM!",
  },
  {
    id: "n2",
    title: "Holiday",
    date: "2025-05-15",
    content: "Institute will remain closed on Sunday (public holiday).",
  },
];

const Academics = () => {
  const { mode } = useAppContext();
  const navigate = useNavigate();
  const today = new Date();
  const [showCustomModal, setShowCustomModal] = React.useState(false);

  // Get today's tasks
  const todayTasks = tasks.filter(task =>
    task.date === format(today, "yyyy-MM-dd") && task.type === "practice"
  ).slice(0, 3);

  // NEET subjects
  const neetSubjects = [
    {
      id: "botany",
      name: "Botany",
      icon: "leaf",
      progress: 45
    },
    {
      id: "zoology",
      name: "Zoology",
      icon: "heart",
      progress: 60
    },
    {
      id: "physics",
      name: "Physics",
      icon: "book-open",
      progress: 30
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: "flask-round",
      progress: 55
    }
  ];

  // Sample low accuracy topics
  const lowAccuracyTopics = [
    { id: "t1", name: "Circular Motion", subject: "Physics", accuracy: 40 },
    { id: "t2", name: "Genetic Disorders", subject: "Zoology", accuracy: 35 },
    { id: "t3", name: "Organic Chemistry", subject: "Chemistry", accuracy: 45 }
  ];

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/${subjectId}`);
  };

  const handleCreateTest = () => {
    navigate('/practice/create-test');
  };

  const handleOpenAssistant = () => {
    navigate('/assistant');
  };

  return (
    <CustomPracticeTestProvider>
      <div className="container mx-auto max-w-7xl pb-[72px] pt-2 px-2 sm:px-6">
        <div className="flex justify-end mb-4">
          <Button className="bg-[#FFBD59]" onClick={() => setShowCustomModal(true)}>
            Create Custom Practice Test
          </Button>
        </div>
        <CustomPracticeTestModal open={showCustomModal} onOpenChange={setShowCustomModal} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-2xl font-bold text-center sm:text-left">Academics</h1>
          <div className="flex justify-center sm:justify-end">
            <ModeToggle />
          </div>
        </div>
        {/* Backlog Shortcut */}
        <div className="mb-4 flex items-center gap-4">
          <div
            className="flex items-center gap-2 bg-[#FFF7EB] border border-[#FFBD59] text-gray-700 px-4 py-3 rounded-xl shadow hover:shadow-lg cursor-pointer transition hover:bg-[#FFE8B2]"
            onClick={() => navigate('/backlog')}
            role="button"
          >
            <List size={24} className="text-[#FFBD59]" />
            <span className="font-bold">Backlog Center</span>
            <span className="ml-2 text-xs text-gray-500">AI fix for overdue study topics</span>
          </div>
        </div>
        {/* Existing self-study or institute mode blocks */}
        {
          mode === "self-study" ? (
            <SelfStudyMode
              neetSubjects={neetSubjects}
              todayTasks={todayTasks}
              lowAccuracyTopics={lowAccuracyTopics}
              onSubjectClick={handleSubjectClick}
              onCreateTest={handleCreateTest}
              onOpenAssistant={handleOpenAssistant}
              navigate={navigate}
            />
          ) : (
            <InstituteMode
              assignments={mockAssignments}
              announcements={mockAnnouncements}
              onOpenAssistant={handleOpenAssistant}
            />
          )
        }
      </div>
    </CustomPracticeTestProvider>
  );
};

export default Academics;
