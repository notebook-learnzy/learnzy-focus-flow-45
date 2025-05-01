
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyAccuracyData, focusScoreData } from "@/data/mockData";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Analytics = () => {
  // Mock data for weak topics heat map
  const weakTopicsData = [
    { topic: "Kinematics", score: 45 },
    { topic: "Chemical Bonding", score: 55 },
    { topic: "Cell Division", score: 60 },
    { topic: "Optics", score: 50 },
    { topic: "Thermodynamics", score: 70 },
  ];
  
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
    </div>
  );
};

export default Analytics;
