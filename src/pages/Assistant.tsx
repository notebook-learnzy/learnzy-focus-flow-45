
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, HelpCircle, Volume2 } from "lucide-react";
import ShivAssistant from "@/components/ShivAssistant";
import { toast } from "@/hooks/use-toast";

const Assistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");

  // List of available chapters for audio book
  const availableChapters = [
    { id: "bio-11-1", name: "The Living World" },
    { id: "bio-11-2", name: "Structural Organisation in Animals" },
    { id: "bio-11-3", name: "Respiration in Plants" },
    { id: "bot-11-1", name: "Plant Kingdom" }
  ];

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the interactive assistant.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setResponse("");
    
    try {
      // This would be replaced with an actual API call to OpenAI
      // For now, we'll simulate a response
      setTimeout(() => {
        setResponse(`Shiv Assistant: ${query.includes("hello") ? 
          "Hello! How can I help you with your studies today?" : 
          "I understand your question about " + query + ". Let me provide some insights on this topic..."}`);
        setLoading(false);
      }, 1500);
      
      // Actual OpenAI implementation would look like this:
      /*
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are Shiv, an educational assistant for high school students studying Biology and Botany."
            },
            {
              role: "user",
              content: query
            }
          ],
          temperature: 0.7
        })
      });
      
      const data = await response.json();
      setResponse(data.choices[0].message.content);
      setLoading(false);
      */
    } catch (error) {
      console.error(error);
      setResponse("Sorry, I encountered an error processing your request.");
      setLoading(false);
    }
  };

  const speakText = (text) => {
    if (!text) return;
    
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(false);
      
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech Not Supported",
        description: "Your browser does not support text-to-speech functionality.",
        variant: "destructive"
      });
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleChapterRecital = () => {
    if (!selectedChapter) {
      toast({
        title: "No Chapter Selected",
        description: "Please select a chapter for me to recite.",
        variant: "destructive"
      });
      return;
    }
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the audio book feature.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Get the chapter name from the selected ID
    const chapter = availableChapters.find(ch => ch.id === selectedChapter);
    
    // Simulate chapter content (would be fetched from backend/API)
    setTimeout(() => {
      const chapterContent = `Introduction to ${chapter.name}. This chapter explores the fundamental concepts and principles related to ${chapter.name.toLowerCase()}. Students will learn about the key theories, structures, and mechanisms that are essential to understanding this topic in depth.`;
      
      setResponse(chapterContent);
      speakText(chapterContent);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Shiv Assistant</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="audio-book">Audio Book</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="flex">
                <Textarea 
                  placeholder="Ask Shiv a question about your studies..."
                  className="min-h-28 resize-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <Button 
                  className="ml-2 self-end"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Thinking..." : "Ask"}
                </Button>
              </div>
              
              {response && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-md">Response</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2" 
                      onClick={() => speaking ? stopSpeaking() : speakText(response)}
                    >
                      <Volume2 size={16} className="mr-1" />
                      {speaking ? "Stop" : "Listen"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap">{response}</div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="audio-book" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Listen to Chapters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Chapter</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={selectedChapter}
                        onChange={(e) => setSelectedChapter(e.target.value)}
                      >
                        <option value="">Select a chapter...</option>
                        {availableChapters.map(chapter => (
                          <option key={chapter.id} value={chapter.id}>
                            {chapter.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={handleChapterRecital}
                        disabled={loading || !selectedChapter}
                      >
                        <BookOpen size={16} className="mr-2" />
                        {loading ? "Loading..." : "Start Reading"}
                      </Button>
                      
                      {speaking && (
                        <Button 
                          variant="outline" 
                          onClick={stopSpeaking}
                        >
                          Stop
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {response && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="text-sm text-gray-500 flex items-center">
                <HelpCircle size={14} className="mr-1" />
                <span>Tip: The audio book feature can read chapters aloud to help with your studies.</span>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Assistant Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your API key is required for the interactive and audio features.
                      It's stored locally in your browser and never sent to our servers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Meet Shiv</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ShivAssistant className="w-40 h-40" />
              
              <div className="mt-6 text-center">
                <h3 className="font-semibold">Your Study Companion</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Shiv helps you understand difficult concepts, explains topics
                  in simple terms, and can even read chapters aloud to improve
                  your learning experience.
                </p>
              </div>
              
              <div className="mt-6 w-full">
                <h4 className="font-medium text-sm mb-2">Popular Questions</h4>
                <div className="space-y-2">
                  {["Explain photosynthesis simply", "What are the phases of mitosis?", "How do plants respond to stimuli?"].map((q, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => {
                        setQuery(q);
                        setSelectedChapter("");
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
