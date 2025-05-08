
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PeopleIcon, TrophyIcon, UserIcon } from 'lucide-react';

interface SocialLearningProps {
  className?: string;
}

// Mock data
const mockClassmates = [
  { id: '1', name: 'Alex Johnson', avatar: '', focusScore: 87, currentChapter: 'Mechanics', averageAccuracy: 82 },
  { id: '2', name: 'Jamie Smith', avatar: '', focusScore: 76, currentChapter: 'Mechanics', averageAccuracy: 79 },
  { id: '3', name: 'Morgan Lee', avatar: '', focusScore: 91, currentChapter: 'Thermodynamics', averageAccuracy: 88 },
  { id: '4', name: 'Casey Brown', avatar: '', focusScore: 81, currentChapter: 'Optics', averageAccuracy: 75 },
];

const mockChallenges = [
  { id: '1', name: 'Mechanics Marathon', participants: 8, startDate: '2025-05-10', endDate: '2025-05-17', progress: 60 },
  { id: '2', name: 'Weekly Physics Sprint', participants: 12, startDate: '2025-05-15', endDate: '2025-05-18', progress: 30 },
];

const SocialLearning = ({ className }: SocialLearningProps) => {
  const [showClassmates, setShowClassmates] = useState(false);
  const [joinChallenges, setJoinChallenges] = useState(false);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PeopleIcon className="h-5 w-5" />
          Social Learning
        </CardTitle>
        <CardDescription>Connect with peers and participate in challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-classmates">Show Classmates</Label>
                <p className="text-sm text-muted-foreground">
                  See anonymous stats from peers studying the same topics
                </p>
              </div>
              <Switch 
                id="show-classmates" 
                checked={showClassmates} 
                onCheckedChange={setShowClassmates}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="join-challenges">Join Challenges</Label>
                <p className="text-sm text-muted-foreground">
                  Participate in group learning activities and competitions
                </p>
              </div>
              <Switch 
                id="join-challenges" 
                checked={joinChallenges} 
                onCheckedChange={setJoinChallenges}
              />
            </div>
          </div>
          
          <Tabs defaultValue="classmates" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classmates">Classmates</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="classmates">
              {showClassmates ? (
                <div className="space-y-4 mt-4">
                  {mockClassmates.map((classmate) => (
                    <div key={classmate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={classmate.avatar} alt={classmate.name} />
                          <AvatarFallback>{classmate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{classmate.name}</p>
                          <p className="text-xs text-gray-500">Studying: {classmate.currentChapter}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Focus: <span className="text-purple-600">{classmate.focusScore}%</span>
                        </p>
                        <p className="text-sm">
                          Accuracy: <span className="text-blue-600">{classmate.averageAccuracy}%</span>
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Find Study Buddy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-500">
                    Enable "Show Classmates" to see peer statistics and find study partners
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="challenges">
              {joinChallenges ? (
                <div className="space-y-4 mt-4">
                  {mockChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium flex items-center">
                            <TrophyIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            {challenge.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {challenge.participants} participants • {challenge.startDate} to {challenge.endDate}
                          </p>
                        </div>
                        <Button size="sm" variant="secondary">Join</Button>
                      </div>
                      
                      <div className="mt-2">
                        <div className="bg-gray-200 h-2 rounded-full w-full mt-2">
                          <div 
                            className="bg-learnzy-purple h-2 rounded-full" 
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right mt-1">{challenge.progress}% complete</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <TrophyIcon className="h-4 w-4 mr-2" />
                    Create Challenge
                  </Button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-500">
                    Enable "Join Challenges" to participate in group learning activities
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLearning;
