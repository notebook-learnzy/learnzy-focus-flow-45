
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyAccuracyData, focusScoreData, weakTopicsData, bloomSkillsProfile, actionCards } from "@/data/mockData";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import BloomSkillsRadar from "@/components/BloomSkillsRadar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Plus } from "lucide-react";

const Analytics = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      <Tabs defaultValue="performance" className="mb-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cognitive">Cognitive Skills</TabsTrigger>
          <TabsTrigger value="focus">Focus & Wellness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Accuracy vs. Focus Score</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyAccuracyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="accuracy" stroke="#F97316" activeDot={{ r: 8 }} name="Accuracy %" />
                    <Line type="monotone" dataKey="focus" stroke="#9b87f5" name="Focus Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Focus Trend</CardTitle>
                <CardDescription>Focus score throughout the day</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={focusScoreData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Weak Topics</CardTitle>
                <CardDescription>Focus on improving these areas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={weakTopicsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="topic" type="category" />
                    <Tooltip />
                    <Bar dataKey="score" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Your focus is highest between 9-11 AM. Schedule challenging topics during this time.
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <p className="text-sm font-medium text-amber-800">
                      Your accuracy drops after 2+ hours of continuous study. Consider taking short breaks.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      You perform better in Physics after practicing Biology topics. Consider alternating subjects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cognitive" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BloomSkillsRadar skills={bloomSkillsProfile} className="md:col-span-2" />
            
            <Card>
              <CardHeader>
                <CardTitle>Cognitive Development</CardTitle>
                <CardDescription>Bloom's Taxonomy Progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">
                      <span className="font-bold">Analysis Skills:</span> Your ability to break down complex problems has improved 15% this month.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <p className="text-sm font-medium text-amber-800">
                      <span className="font-bold">Evaluation Skills:</span> Focus on comparing and critiquing solutions to strengthen this area.
                    </p>
                  </div>
                  
                  <Button className="w-full mt-2" variant="outline">
                    View Detailed Skill Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Bloom's Taxonomy Level Distribution</CardTitle>
              <CardDescription>Questions attempted by cognitive level</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { level: 'Remember', attempted: 85, mastered: 70 },
                    { level: 'Understand', attempted: 65, mastered: 50 },
                    { level: 'Apply', attempted: 55, mastered: 40 },
                    { level: 'Analyze', attempted: 40, mastered: 25 },
                    { level: 'Evaluate', attempted: 25, mastered: 15 },
                    { level: 'Create', attempted: 15, mastered: 10 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attempted" name="Questions Attempted" fill="#9b87f5" />
                  <Bar dataKey="mastered" name="Questions Mastered" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="focus" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Focus Score by Time of Day</CardTitle>
                <CardDescription>When you're most focused</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { hour: '6 AM', score: 75 },
                      { hour: '8 AM', score: 85 },
                      { hour: '10 AM', score: 90 },
                      { hour: '12 PM', score: 70 },
                      { hour: '2 PM', score: 65 },
                      { hour: '4 PM', score: 75 },
                      { hour: '6 PM', score: 85 },
                      { hour: '8 PM', score: 80 },
                      { hour: '10 PM', score: 60 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#9b87f5" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sedentary vs Focus Correlation</CardTitle>
                <CardDescription>How breaks affect your focus</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { sitting: 30, focus: 85 },
                      { sitting: 60, focus: 82 },
                      { sitting: 90, focus: 78 },
                      { sitting: 120, focus: 72 },
                      { sitting: 150, focus: 65 },
                      { sitting: 180, focus: 60 },
                      { sitting: 210, focus: 55 },
                      { sitting: 240, focus: 50 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sitting" label={{ value: 'Minutes sitting', position: 'insideBottom', offset: -5 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Focus score', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}`, 'Focus Score']} />
                    <Line type="monotone" dataKey="focus" stroke="#F97316" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Based on your performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionCards.map(card => (
                    <div key={card.id} className="border rounded-lg p-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{card.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {card.completed ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <Button size="sm" variant="outline" className="flex gap-1">
                            <Calendar size={14} />
                            <span>Schedule</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-2" variant="outline">
                    <Plus size={14} className="mr-2" /> Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Wellness Impact</CardTitle>
                <CardDescription>How wellness affects performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Meditation sessions:</span>
                    <span className="font-medium">12 this month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Average meditation time:</span>
                    <span className="font-medium">2.5 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Focus improvement:</span>
                    <span className="font-medium text-green-500">+15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Accuracy improvement:</span>
                    <span className="font-medium text-green-500">+8%</span>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Students who meditate before practice sessions score 12% higher on average.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
