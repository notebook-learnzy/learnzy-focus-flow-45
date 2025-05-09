
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";

// Mock journal entries
const mockEntries = [
  { 
    id: "j1", 
    date: subDays(new Date(), 1), 
    content: "Feeling optimistic about my NEET preparation. Biology is starting to make more sense now.",
    moodTag: "positive" 
  },
  { 
    id: "j2", 
    date: subDays(new Date(), 3), 
    content: "Studied for 6 hours today. Feeling tired but accomplished. Cellular respiration is still challenging.",
    moodTag: "neutral" 
  },
  { 
    id: "j3", 
    date: subDays(new Date(), 5), 
    content: "Struggling with plant morphology. Need to find better study resources.",
    moodTag: "negative" 
  }
];

const JournalSection = () => {
  const [journalText, setJournalText] = useState("");
  const [mood, setMood] = useState<"positive" | "neutral" | "negative">("neutral");
  const [entries, setEntries] = useState(mockEntries);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!journalText.trim()) {
      toast({
        title: "Journal entry cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    // Add new entry
    const newEntry = {
      id: `j${Date.now()}`,
      date: new Date(),
      content: journalText,
      moodTag: mood
    };
    
    // In a real app, we would save to Supabase here
    // saveJournalEntry(newEntry);
    
    setEntries([newEntry, ...entries]);
    setJournalText("");
    
    toast({
      title: "Journal entry saved",
      description: "Your thoughts have been recorded."
    });
  };
  
  const getMoodEmoji = (moodTag: string) => {
    switch (moodTag) {
      case "positive": return "😊";
      case "negative": return "😔";
      default: return "😐";
    }
  };
  
  const getMoodColor = (moodTag: string) => {
    switch (moodTag) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Journaling</CardTitle>
        <CardDescription>
          Record your thoughts and feelings about your study journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="journal" className="block text-sm font-medium mb-2">
              How are you feeling today?
            </label>
            <Textarea
              id="journal"
              placeholder="Write your thoughts here..."
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="mb-4">
            <p className="block text-sm font-medium mb-2">Select your mood:</p>
            <div className="flex space-x-2">
              <Button 
                type="button"
                variant={mood === "positive" ? "default" : "outline"} 
                onClick={() => setMood("positive")}
                className="flex-1"
              >
                😊 Positive
              </Button>
              <Button 
                type="button"
                variant={mood === "neutral" ? "default" : "outline"} 
                onClick={() => setMood("neutral")}
                className="flex-1"
              >
                😐 Neutral
              </Button>
              <Button 
                type="button"
                variant={mood === "negative" ? "default" : "outline"} 
                onClick={() => setMood("negative")}
                className="flex-1"
              >
                😔 Negative
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full">Save Entry</Button>
        </form>
        
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Recent entries</h4>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className={`px-2 py-1 rounded text-xs ${getMoodColor(entry.moodTag)}`}>
                    {getMoodEmoji(entry.moodTag)} {entry.moodTag.charAt(0).toUpperCase() + entry.moodTag.slice(1)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(entry.date), "MMM d, yyyy")}
                  </div>
                </div>
                <p className="mt-3 text-sm">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalSection;
