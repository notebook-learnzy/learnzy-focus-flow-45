
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type MoodTag = "happy" | "neutral" | "sad" | "anxious" | "focused" | "tired";

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  moodTag: MoodTag;
}

// Mock data for journal entries
const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: new Date(Date.now() - 86400000 * 1), // 1 day ago
    content: "Studied for biology test. Feeling prepared but a bit nervous about the photosynthesis questions.",
    moodTag: "anxious"
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    content: "Great study session today. Really understood the cell division concepts better after watching that video explanation.",
    moodTag: "happy"
  },
  {
    id: "3",
    date: new Date(Date.now() - 86400000 * 4), // 4 days ago
    content: "Feeling overwhelmed with the amount of material to review. Need to create a better study plan.",
    moodTag: "sad"
  }
];

const JournalSection = () => {
  const [journalText, setJournalText] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodTag>("neutral");
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);

  const moodOptions: {tag: MoodTag, label: string, color: string}[] = [
    { tag: "happy", label: "Happy", color: "bg-green-100 text-green-800 border-green-200" },
    { tag: "neutral", label: "Neutral", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { tag: "sad", label: "Sad", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    { tag: "anxious", label: "Anxious", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { tag: "focused", label: "Focused", color: "bg-purple-100 text-purple-800 border-purple-200" },
    { tag: "tired", label: "Tired", color: "bg-gray-100 text-gray-800 border-gray-200" }
  ];

  const getMoodColor = (mood: MoodTag) => {
    return moodOptions.find(m => m.tag === mood)?.color || "";
  };

  const handleSubmit = () => {
    if (!journalText.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something in your journal entry.",
        variant: "destructive"
      });
      return;
    }

    // Create new entry
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content: journalText,
      moodTag: selectedMood
    };

    // In a real application, this would be sent to Supabase
    // await supabase.from('user_journal').insert([{
    //   user_id: userId,
    //   entry_date: newEntry.date,
    //   mood_tag: newEntry.moodTag,
    //   content: newEntry.content
    // }]);

    // Add to local state
    setEntries([newEntry, ...entries]);
    
    // Reset form
    setJournalText("");
    setSelectedMood("neutral");
    
    toast({
      title: "Journal Entry Saved",
      description: "Your journal entry has been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Journal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How are you feeling today?
            </label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.tag}
                  type="button"
                  variant="outline"
                  className={`border ${selectedMood === mood.tag ? mood.color + " border-2" : ""}`}
                  onClick={() => setSelectedMood(mood.tag)}
                >
                  {mood.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Textarea
              placeholder="Write about your thoughts, feelings, or study experiences..."
              className="min-h-32 resize-none"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>
              Save Entry
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Past Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {format(entry.date, "MMM d, yyyy")}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getMoodColor(entry.moodTag)}`}>
                      {moodOptions.find(m => m.tag === entry.moodTag)?.label}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No journal entries yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalSection;
