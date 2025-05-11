
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight, BookOpen, CheckCircle, X } from "lucide-react";

type WeakTopic = {
  id: string;
  topicName: string;
  subjectId: string;
  chapterId: string;
  accuracy: number;
  questionsAttempted: number;
  lastPracticed?: string;
};

// This would typically come from an API or store
const weakTopics: WeakTopic[] = [
  {
    id: "wt1",
    topicName: "Cell Division",
    subjectId: "botany",
    chapterId: "bot-ch03",
    accuracy: 45,
    questionsAttempted: 24,
    lastPracticed: "2023-05-02"
  },
  {
    id: "wt2",
    topicName: "Newton's Laws",
    subjectId: "physics",
    chapterId: "phy-ch01",
    accuracy: 62,
    questionsAttempted: 18,
    lastPracticed: "2023-04-28"
  },
  {
    id: "wt3",
    topicName: "Organic Reactions",
    subjectId: "chemistry",
    chapterId: "chem-ch02",
    accuracy: 58,
    questionsAttempted: 32,
    lastPracticed: "2023-05-01"
  },
  {
    id: "wt4",
    topicName: "Human Nervous System",
    subjectId: "zoology",
    chapterId: "zoo-ch03",
    accuracy: 65,
    questionsAttempted: 15,
    lastPracticed: "2023-04-25"
  }
];

const getSubjectName = (subjectId: string): string => {
  const subjectMap: { [key: string]: string } = {
    "botany": "Botany",
    "zoology": "Zoology",
    "physics": "Physics",
    "chemistry": "Chemistry"
  };
  return subjectMap[subjectId] || subjectId;
};

const getAccuracyColor = (accuracy: number): string => {
  if (accuracy < 50) return "bg-red-100 text-red-800";
  if (accuracy < 65) return "bg-amber-100 text-amber-800";
  return "bg-yellow-100 text-yellow-800";
};

const MistakeNotebook = () => {
  const [topics, setTopics] = useState<WeakTopic[]>(weakTopics);
  
  const handleRemoveTopic = (id: string) => {
    setTopics(topics.filter(topic => topic.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">
            Mistake Notebook
          </CardTitle>
          <CardDescription>
            Topics with accuracy below 70%
          </CardDescription>
        </div>
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      </CardHeader>
      <CardContent className="pt-4">
        {topics.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              No weak topics found. Great job!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic.id} className="border rounded-lg p-3 relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={() => handleRemoveTopic(topic.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{topic.topicName}</h4>
                    <p className="text-xs text-gray-500">
                      {getSubjectName(topic.subjectId)} • {topic.questionsAttempted} questions attempted
                    </p>
                  </div>
                  <Badge className={getAccuracyColor(topic.accuracy)}>
                    {topic.accuracy}% Accuracy
                  </Badge>
                </div>
                
                <Progress value={topic.accuracy} className="h-1.5 mb-3" />
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Last practiced: {topic.lastPracticed ? new Date(topic.lastPracticed).toLocaleDateString() : 'Never'}
                  </span>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <BookOpen className="h-3 w-3 mr-1" /> Practice Now
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end pt-2">
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MistakeNotebook;
