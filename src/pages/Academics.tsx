import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutGrid, BookOpen, BookText, Brain, Atom } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { subjects, tasks } from "@/data/mockData";
import SubjectCard from "@/components/SubjectCard";
import { format } from "date-fns";

const Academics = () => {
  const navigate = useNavigate();
  const today = new Date();
  
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
    <div className="container mx-auto max-w-7xl pb-[72px] pt-2 px-2 sm:px-6">
      <h1 className="text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Academics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          {/* Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                NEET Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4">
                {neetSubjects.map((subject) => (
                  <SubjectCard 
                    key={subject.id} 
                    subject={subject} 
                    onClick={() => handleSubjectClick(subject.id)} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Custom Test */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Prepare for NEET
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-learnzy-purple/10 p-3 sm:p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Create Custom Practice Test</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Select any topic and create a customized test to enhance your preparation</p>
                  </div>
                  <Button className="bg-learnzy-purple w-full sm:w-auto mt-2 sm:mt-0" onClick={handleCreateTest}>
                    Create Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {/* Calendar Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayTasks.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {todayTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-learnzy-orange mr-2"></div>
                        <span className="text-xs sm:text-sm">{task.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{task.time}</span>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-learnzy-purple" onClick={() => navigate('/calendar')}>
                    View All
                  </Button>
                </div>
              ) : (
                <div className="text-center py-2 sm:py-4 text-gray-500">
                  <p className="text-xs sm:text-base">No tasks scheduled for today</p>
                  <Button variant="link" size="sm" className="mt-1 text-learnzy-purple" onClick={() => navigate('/calendar')}>
                    Add a task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Low Accuracy Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Atom className="h-5 w-5 mr-2" />
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                {lowAccuracyTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium">{topic.name}</p>
                      <p className="text-xs text-gray-500">{topic.subject}</p>
                    </div>
                    <div className={`text-2xs sm:text-xs px-2 py-1 rounded-full ${
                      topic.accuracy < 40 ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                    }`}>
                      {topic.accuracy}% accuracy
                    </div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-learnzy-purple"
                  onClick={() => navigate('/mistake-notebook')}
                >
                  View Mistake Notebook
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shiv Assistant */}
          <Card className="bg-learnzy-purple/10 border-learnzy-purple/30">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-learnzy-purple/20 p-2 sm:p-3 rounded-full">
                  <BookText className="h-5 w-5 text-learnzy-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm sm:text-base">Need help with studies?</h3>
                  <p className="text-xs text-gray-600 mb-2">Ask Shiv Assistant for guidance</p>
                  <Button 
                    size="sm" 
                    className="bg-learnzy-purple w-full" 
                    onClick={handleOpenAssistant}
                  >
                    Open Assistant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Academics;
