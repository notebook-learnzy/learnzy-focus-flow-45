
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { suggestions, journalEntries } from "@/data/mockData";
import { Heart, Clock, Smile, Send, Calendar, Edit3, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FocusScoreGauge from "@/components/FocusScoreGauge";
import WellnessRewards from "@/components/WellnessRewards";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Wellness = () => {
  const [journalText, setJournalText] = useState("");
  const [moodTag, setMoodTag] = useState("");
  const [entries, setEntries] = useState(journalEntries);
  
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
  
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy": return "bg-green-100 text-green-800";
      case "anxious": return "bg-orange-100 text-orange-800";
      case "tired": return "bg-blue-100 text-blue-800";
      case "sad": return "bg-purple-100 text-purple-800";
      case "focused": return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleJournalSubmit = () => {
    if (!journalText.trim() || !moodTag) {
      toast({
        title: "Incomplete Entry",
        description: "Please provide both journal text and mood",
        variant: "destructive",
      });
      return;
    }
    
    const newEntry = {
      id: `j${entries.length + 1}`,
      date: new Date().toISOString(),
      text: journalText,
      mood_tag: moodTag
    };
    
    setEntries([newEntry, ...entries]);
    setJournalText("");
    setMoodTag("");
    
    toast({
      title: "Journal Entry Added",
      description: "Your journal entry has been saved.",
    });
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Wellness Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Journal</CardTitle>
              <CardDescription>Track your mood and thoughts throughout your NEET journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="How are you feeling today?"
                    className="h-24"
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <Select value={moodTag} onValueChange={setMoodTag}>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="happy">Happy</SelectItem>
                        <SelectItem value="anxious">Anxious</SelectItem>
                        <SelectItem value="tired">Tired</SelectItem>
                        <SelectItem value="sad">Sad</SelectItem>
                        <SelectItem value="focused">Focused</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleJournalSubmit}>
                      <Send className="mr-2 h-4 w-4" /> Save Entry
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Recent Entries</h3>
                    <Button variant="ghost" size="sm">
                      <Calendar className="mr-2 h-4 w-4" /> View All
                    </Button>
                  </div>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {entries.map((entry) => (
                      <div key={entry.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <Badge className={getMoodColor(entry.mood_tag)}>
                            {entry.mood_tag.charAt(0).toUpperCase() + entry.mood_tag.slice(1)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {format(new Date(entry.date), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <p className="text-sm">{entry.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
          
          <WellnessRewards />
          
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
