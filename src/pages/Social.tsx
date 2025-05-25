import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Trophy, UserRound, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockPeerComparison = [
  { chapter: "Cell Structure", yourScore: 82, classAverage: 75, focusYou: 78, focusClass: 72 },
  { chapter: "Photosynthesis", yourScore: 65, classAverage: 68, focusYou: 62, focusClass: 70 },
  { chapter: "Human Physiology", yourScore: 88, classAverage: 72, focusYou: 85, focusClass: 75 },
  { chapter: "Genetics", yourScore: 75, classAverage: 65, focusYou: 68, focusClass: 62 },
  { chapter: "Evolution", yourScore: 70, classAverage: 78, focusYou: 72, focusClass: 80 },
];

const mockChallenges = [
  { 
    id: "c1", 
    title: "Biology Marathon", 
    participants: 24, 
    chapter: "Cell Biology", 
    progress: 65, 
    endDate: "2025-05-25",
    yourPosition: 3
  },
  { 
    id: "c2", 
    title: "Physics Challenge", 
    participants: 18, 
    chapter: "Mechanics", 
    progress: 40, 
    endDate: "2025-05-30",
    yourPosition: 10
  },
  { 
    id: "c3", 
    title: "Chemistry Dash", 
    participants: 12, 
    chapter: "Organic Chemistry", 
    progress: 75, 
    endDate: "2025-05-20",
    yourPosition: 2
  }
];

const mockStudyBuddies = [
  {
    id: "b1",
    name: "Ananya S.",
    subject: "Biology",
    chapter: "Cell Biology",
    focusScore: 78,
    accuracy: 82,
    compatibility: 95,
  },
  {
    id: "b2",
    name: "Rahul M.",
    subject: "Physics",
    chapter: "Mechanics",
    focusScore: 72,
    accuracy: 75,
    compatibility: 88,
  },
  {
    id: "b3",
    name: "Priya K.",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    focusScore: 80,
    accuracy: 85,
    compatibility: 92,
  }
];

const CommunityFeed = () => {
  return (
    <div>
      <h2>Community Feed</h2>
      {/* Add community feed content here */}
    </div>
  );
};

const Social = () => {
  const [activeTab, setActiveTab] = useState("peers");
  const [compareWithClass, setCompareWithClass] = useState(true);
  const [showFocusScores, setShowFocusScores] = useState(false);

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Social Learning</h1>
      <Tabs defaultValue="peers" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="peers">
              <Users className="h-4 w-4 mr-2" />
              Peer Comparison
            </TabsTrigger>
            <TabsTrigger value="challenges">
              <Trophy className="h-4 w-4 mr-2" />
              Group Challenges
            </TabsTrigger>
            <TabsTrigger value="buddies">
              <UserRound className="h-4 w-4 mr-2" />
              Study Buddies
            </TabsTrigger>
            <TabsTrigger value="community">
              <MessageCircle className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="peers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Performance Comparison</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="compare" checked={compareWithClass} onCheckedChange={setCompareWithClass} />
                    <Label htmlFor="compare">Compare with class</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="focus" checked={showFocusScores} onCheckedChange={setShowFocusScores} />
                    <Label htmlFor="focus">Show focus scores</Label>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockPeerComparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="chapter" />
                    <YAxis />
                    <Tooltip />
                    {showFocusScores ? (
                      <>
                        <Bar dataKey="focusYou" name="Your Focus" fill="#8884d8" />
                        {compareWithClass && (
                          <Bar dataKey="focusClass" name="Class Average Focus" fill="#82ca9d" />
                        )}
                      </>
                    ) : (
                      <>
                        <Bar dataKey="yourScore" name="Your Score" fill="#8884d8" />
                        {compareWithClass && (
                          <Bar dataKey="classAverage" name="Class Average" fill="#82ca9d" />
                        )}
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Compare your performance across different chapters with the class average. Toggle focus scores to see mental wellness comparison.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChallenges.map(challenge => (
                    <div key={challenge.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{challenge.title}</h3>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {challenge.participants} participants
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        Chapter: {challenge.chapter} • Ends: {new Date(challenge.endDate).toLocaleDateString()}
                      </p>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress: {challenge.progress}%</span>
                          <span>Your position: #{challenge.yourPosition}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-learnzy-purple h-2 rounded-full" 
                            style={{ width: `${challenge.progress}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Create Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Start a new challenge and invite your friends or classmates to participate. Set goals, track progress, and see who can complete the challenge first!
                  </p>
                  
                  <Button className="w-full bg-learnzy-purple">
                    <Trophy className="h-4 w-4 mr-2" />
                    Create New Challenge
                  </Button>
                  
                  <p className="text-xs text-gray-500">
                    Challenges help you stay motivated and learn together. You can create topic-specific challenges or broader subject challenges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="buddies">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Study Buddies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Connect with peers who are studying the same topics and have similar focus patterns. Study buddies are matched based on chapter progress, focus scores, and learning style.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {mockStudyBuddies.map(buddy => (
                    <div 
                      key={buddy.id} 
                      className={cn(
                        "border rounded-lg p-4",
                        buddy.compatibility >= 90 ? "border-learnzy-purple/50 bg-learnzy-purple/5" : ""
                      )}
                    >
                      <div className="flex items-center mb-3">
                        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-500 mr-3">
                          {buddy.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{buddy.name}</h3>
                          <p className="text-xs text-gray-500">
                            {buddy.subject} • {buddy.chapter}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-1 mb-3">
                        <div className="text-center p-1 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">{buddy.focusScore}</div>
                          <div className="text-xs text-gray-500">Focus</div>
                        </div>
                        <div className="text-center p-1 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{buddy.accuracy}%</div>
                          <div className="text-xs text-gray-500">Accuracy</div>
                        </div>
                        <div className="text-center p-1 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">{buddy.compatibility}%</div>
                          <div className="text-xs text-gray-500">Match</div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full">
                  Find More Study Buddies
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="community">
          <CommunityFeed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Social;
