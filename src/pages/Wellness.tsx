
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/mockData";
import { Heart, Clock, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FocusScoreGauge from "@/components/FocusScoreGauge";

const Wellness = () => {
  const wellnessActivities = [
    {
      id: "wellness-1",
      title: "Breathing Exercise",
      description: "Quick 2-minute deep breathing to reduce stress",
      duration: 2,
      icon: "breathing",
    },
    {
      id: "wellness-2",
      title: "Guided Meditation",
      description: "5-minute meditation for improved focus",
      duration: 5,
      icon: "meditation",
    },
    {
      id: "wellness-3",
      title: "Mood Check-in",
      description: "Record your current mood and feelings",
      duration: 1,
      icon: "mood",
    },
    {
      id: "wellness-4",
      title: "Quick Stretch",
      description: "3-minute stretch routine for posture",
      duration: 3,
      icon: "stretch",
    },
  ];
  
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "breathing":
        return <div className="bg-blue-100 p-3 rounded-full"><Heart className="h-5 w-5 text-blue-500" /></div>;
      case "meditation":
        return <div className="bg-purple-100 p-3 rounded-full"><Heart className="h-5 w-5 text-purple-500" /></div>;
      case "mood":
        return <div className="bg-yellow-100 p-3 rounded-full"><Smile className="h-5 w-5 text-yellow-500" /></div>;
      case "stretch":
        return <div className="bg-green-100 p-3 rounded-full"><Heart className="h-5 w-5 text-green-500" /></div>;
      default:
        return <div className="bg-gray-100 p-3 rounded-full"><Heart className="h-5 w-5 text-gray-500" /></div>;
    }
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Wellness Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Activities</CardTitle>
              <CardDescription>Quick activities to improve your wellbeing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wellnessActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      {renderIcon(activity.icon)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{activity.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.duration}m
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                        <Button className="mt-3 w-full bg-learnzy-mint text-gray-700 hover:bg-learnzy-mint/80">
                          Start
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Suggestions Hub</CardTitle>
              <CardDescription>Personalized recommendations based on your activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{suggestion.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(suggestion.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={suggestion.applied ? "secondary" : "outline"}>
                        {suggestion.applied ? "Applied" : "New"}
                      </Badge>
                    </div>
                    {!suggestion.applied && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                      >
                        {suggestion.action}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Focus</CardTitle>
              <CardDescription>Your focus level right now</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <FocusScoreGauge size="lg" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Wellness Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-learnzy-mint/20 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  "Regular short breaks improve long-term focus and memory retention. Try the 25-5 method: 25 minutes of focused study, followed by a 5-minute break."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wellness;
