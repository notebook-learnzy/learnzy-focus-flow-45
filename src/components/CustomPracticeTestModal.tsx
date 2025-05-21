import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAvailableTopics } from "@/hooks/useAvailableTopics";
import { fetchQuestionsForCustomPractice } from "@/hooks/useFetchCustomPracticeQuestions";
import { useCustomPracticeTest } from "@/contexts/CustomPracticeTestContext";

const SUBJECTS = [
  { id: "botany", label: "Botany", classes: ["11", "12"] },
  { id: "zoology", label: "Zoology", classes: ["11", "12"] },
  // Add Chemistry/Physics when ready
];

const CHAPTERS: Record<string, Record<string, { id: string; label: string; sets: string[] }[]>> = {
  botany: {
    "11": [
      { id: "the-living-world", label: "The Living World", sets: ["a", "b", "c", "d", "e"] },
      { id: "biological-classification", label: "Biological Classification", sets: ["a", "b", "c", "d", "e"] },
      { id: "plant-kingdom", label: "Plant Kingdom", sets: ["a", "b", "c", "d", "e"] },
      // ...add other Botany 11 chapters as needed
    ],
    "12": [],
  },
  zoology: {
    "11": [
      { id: "tissues", label: "Tissues", sets: ["a", "b", "c", "d", "e"] },
      { id: "body-fluids-circulation", label: "Body Fluids & Circulation", sets: ["a", "b", "c", "d", "e"] },
      // ...add more as needed
    ],
    "12": [],
  },
};

const QUESTION_NUM_CHOICES = [5, 10, 15, 20, 25, 30];

const CustomPracticeTestModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (val: boolean) => void }) => {
  const [subject, setSubject] = useState<string>("");
  const [classId, setClassId] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState<number>(15);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const { setCustomPracticeSession } = useCustomPracticeTest();

  // Fetch topics
  useEffect(() => {
    if (subject && classId && chapter) {
      setIsLoadingTopics(true);
      setSelectedTopics([]);
      // fetch topics across 5 set tables
      useAvailableTopics(chapter)
        .then(topics => {
          setAvailableTopics(topics);
        })
        .finally(() => setIsLoadingTopics(false));
    } else {
      setAvailableTopics([]);
      setSelectedTopics([]);
    }
  }, [subject, classId, chapter]);

  // Launch custom test flow
  const handleStart = async () => {
    if (!subject || !classId || !chapter || !selectedTopics.length || !numQuestions) return;
    setLoadingQuestions(true);
    try {
      const questions = await fetchQuestionsForCustomPractice(chapter, selectedTopics, numQuestions);
      setCustomPracticeSession({
        subject,
        classId,
        chapter,
        selectedTopics,
        questions,
        results: null
      });
      onOpenChange(false);
      // begin custom test pre-ritual step
      window.location.assign(`/academics/${subject}/classes/${classId}/chapters/${chapter}/sets/custom/preritual`);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Candidates for multi-select topics, but keeping simple for now (tick boxes instead of ui Select):
  const handleToggleTopic = (topic: string) => {
    setSelectedTopics(topics =>
      topics.includes(topic)
        ? topics.filter(t => t !== topic)
        : [...topics, topic]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Create Custom Practice Test</DialogTitle>
        <Card className="p-4 mt-2 space-y-4" style={{ minWidth: 320 }}>
          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <Select value={subject} onValueChange={val => { setSubject(val); setClassId(""); setChapter(""); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(sub => (
                  <SelectItem key={sub.id} value={sub.id}>{sub.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Class */}
          <div>
            <label className="block font-semibold mb-1">Class</label>
            <Select value={classId} onValueChange={val => { setClassId(val); setChapter(""); }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {subject &&
                  SUBJECTS.find(s => s.id === subject)?.classes.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {/* Chapter */}
          <div>
            <label className="block font-semibold mb-1">Chapter</label>
            <Select value={chapter} onValueChange={setChapter} disabled={!subject || !classId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                {subject && classId && CHAPTERS[subject][classId]?.map(ch => (
                  <SelectItem key={ch.id} value={ch.id}>{ch.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Topics */}
          <div>
            <label className="block font-semibold mb-1">Topics</label>
            <div className="flex flex-wrap gap-2">
              {isLoadingTopics ? (
                <span className="text-sm text-gray-400">Loading topics...</span>
              ) : (
                availableTopics.map(topic => (
                  <Button
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "default" : "outline"}
                    className={selectedTopics.includes(topic) ? "bg-[#FFBD59] border-[#FFBD59]" : ""}
                    size="sm"
                    onClick={() => handleToggleTopic(topic)}
                  >
                    {topic}
                  </Button>
                ))
              )}
            </div>
          </div>
          {/* Number of Questions */}
          <div>
            <label className="block font-semibold mb-1">Number of Questions</label>
            <Select value={String(numQuestions)} onValueChange={val => setNumQuestions(Number(val))}>
              <SelectTrigger>
                <SelectValue placeholder="15" />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_NUM_CHOICES.map(q => (
                  <SelectItem key={q} value={String(q)}>{q}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full bg-[#FFBD59]"
            onClick={handleStart}
            disabled={!subject || !classId || !chapter || selectedTopics.length === 0 || loadingQuestions}
          >
            {loadingQuestions ? "Fetching..." : "Start Custom Practice Test"}
          </Button>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CustomPracticeTestModal;
