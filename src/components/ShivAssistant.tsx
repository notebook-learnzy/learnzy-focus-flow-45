import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, BookOpen, GraduationCap, Brain, Clock, ArrowRight, Calendar, Settings, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { chapters, subjects } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'progress-report' | 'schedule' | 'study-tips';
  metadata?: any;
}

interface ShivAssistantProps {
  className?: string;
  onClose?: () => void;
}

// AI Assistant capabilities
const capabilities = [
  {
    name: "Progress Analysis",
    description: "Get a detailed analysis of your learning progress",
    icon: Brain,
  },
  {
    name: "Schedule Optimizer",
    description: "Optimize your study schedule based on your performance",
    icon: Calendar,
  },
  {
    name: "Revision Planning",
    description: "Get personalized revision plans for weak topics",
    icon: Clock,
  },
  {
    name: "Subject Insights",
    description: "Get insights on different subjects and chapters",
    icon: BookOpen,
  }
];

// Mental Health supportive LLM (Hugging Face: mistralai/Mixtral-8x7B-Instruct-v0.1, known for conversational support)
// NOTE: Uses a free public Hugging Face Inference Endpoint for demonstration.
const fetchMentalHealthResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', // demo key
      },
      body: JSON.stringify({
        inputs: `
        <system>
        You are a supportive, empathetic, and non-judgmental mental health supportive chatbot for students. Listen, encourage, and provide resources but never diagnose or replace professional help. Always recommend talking to a professional if serious distress or crisis is indicated. Respond with kindness and practical coping ideas.
        </system>
        <user>
        ${userMessage}
        </user>
        <assistant>
        `,
        parameters: {
          temperature: 0.7,
          max_new_tokens: 400,
        }
      })
    });
    if (!response.ok) throw new Error("API failed");
    const data = await response.json();
    return data[0]?.generated_text
      ? data[0].generated_text.trim()
      : "I'm here for you. Would you like to talk more about what's on your mind?";
  } catch (err) {
    return "Sorry, I couldn't reach the support service right now. Please try again.";
  }
};

const ShivAssistant = ({ className, onClose }: ShivAssistantProps) => {
  // NEW: Mode selection (default: academic)
  const [mode, setMode] = useState<'academic' | 'mental-health'>("academic");

  // Existing state for academic
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Shiv, your NEET preparation assistant. I can analyze your progress, create study schedules, suggest revisions, and more. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  // NEW: State for mental health chat
  const [mhMessages, setMhMessages] = useState<Message[]>([
    {
      id: "mh-welcome",
      content: "Hi! I'm Shiv, your friendly support bot. I'm here to listen if you want to talk about stress, motivation, or anything on your mind. How are you feeling today?",
      sender: "assistant",
      timestamp: new Date(),
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [capabilityOpen, setCapabilityOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [openAIKey, setOpenAIKey] = useState<string>(localStorage.getItem('openai_key') || '');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState<boolean>(false);
  const [isUsingAI, setIsUsingAI] = useState<boolean>(true); // Always use AI with free model

  const [mhInput, setMhInput] = useState('');
  const [mhLoading, setMhLoading] = useState(false);
  const [mhThinking, setMhThinking] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, mhMessages, mode]);

  const simulateTyping = async (content: string) => {
    setIsThinking(true);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
    setIsThinking(false);
    return content;
  };

  const saveApiKey = () => {
    if (openAIKey.trim()) {
      localStorage.setItem('openai_key', openAIKey);
      setIsUsingAI(true);
      setShowApiKeyDialog(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved. Shiv will use it for enhanced capabilities.",
      });
    } else {
      toast({
        title: "Using Free AI",
        description: "Shiv is now using the free AI model for responses.",
      });
      setShowApiKeyDialog(false);
    }
  };

  const fetchHuggingFaceResponse = async (userMessage: string): Promise<string> => {
    try {
      // Free Hugging Face model API
      const response = await fetch('https://api-inference.huggingface.co/models/google/gemma-7b-it', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Using a free shared API for demonstration
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          inputs: `
            <system>
            You are Shiv, an AI assistant for NEET (National Eligibility cum Entrance Test) exam preparation. 
            Your goal is to help students prepare for the NEET exam by providing personalized assistance. 
            Be concise, accurate, and focused on NEET-specific knowledge. 
            Respond in a supportive, encouraging tone. 
            Always provide evidence-based information aligned with NCERT syllabus. 
            When asked about topics not in the NEET syllabus, gently guide the conversation back to relevant subjects: Physics, Chemistry, and Biology for NEET.
            </system>
            <user>
            ${userMessage}
            </user>
            <assistant>
          `,
          parameters: {
            temperature: 0.7,
            max_new_tokens: 800,
            return_full_text: false,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data[0].generated_text.trim();
    } catch (error) {
      console.error("Error fetching from Hugging Face:", error);
      throw error;
    }
  };

  const fetchOpenAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are Shiv, an AI assistant for NEET (National Eligibility cum Entrance Test) exam preparation. Your goal is to help students prepare for the NEET exam by providing personalized assistance. Be concise, accurate, and focused on NEET-specific knowledge. Respond in a supportive, encouraging tone. Always provide evidence-based information aligned with NCERT syllabus. When asked about topics not in the NEET syllabus, gently guide the conversation back to relevant subjects: Physics, Chemistry, and Biology for NEET."
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching from OpenAI:", error);
      throw error;
    }
  };

  const generatePatternResponse = async (inputLower: string) => {
    // Mock responses based on pattern matching
    let responseType: 'text' | 'progress-report' | 'schedule' | 'study-tips' = 'text';
    let responseContent = '';
    let metadata = {};

    if (inputLower.includes('progress') || inputLower.includes('how am i doing')) {
      responseType = 'progress-report';
      responseContent = await simulateTyping("Here's your current progress across subjects:");
      
      metadata = {
        subjects: [
          { name: "Physics", progress: 68, recommendation: "Focus on Mechanics and Thermodynamics" },
          { name: "Chemistry", progress: 82, recommendation: "Review Organic Reactions" },
          { name: "Biology", progress: 75, recommendation: "Strengthen Cell Biology concepts" }
        ],
        overallProgress: 75,
        weakTopics: ["Thermodynamics", "Cell Division", "Organic Chemistry"],
        improvement: "+12% in the last month",
      };
    } 
    else if (inputLower.includes('study plan') || inputLower.includes('schedule')) {
      responseType = 'schedule';
      responseContent = await simulateTyping("I've analyzed your performance and created a personalized study schedule:");
      
      metadata = {
        schedule: [
          { day: "Monday", morning: "Physics - Mechanics", afternoon: "Biology - Cell Biology", evening: "Chemistry - Organic" },
          { day: "Tuesday", morning: "Physics - Waves", afternoon: "Biology - Genetics", evening: "Chemistry - Physical" },
          { day: "Wednesday", morning: "NEET Mock Test", afternoon: "Review Test Results", evening: "Weak Topics Revision" },
          { day: "Thursday", morning: "Physics - Electrostatics", afternoon: "Biology - Human Physiology", evening: "Chemistry - Inorganic" },
          { day: "Friday", morning: "Physics - Optics", afternoon: "Biology - Plant Physiology", evening: "Chemistry - Analytical" },
          { day: "Weekend", morning: "Revision of weak topics", afternoon: "Practice tests", evening: "Relaxation & rest" },
        ],
        studyPattern: {
          studyTime: "6 hours/day",
          breakSchedule: "50 min study + 10 min break",
          recommendedTimeOfDay: "Early morning and late afternoon"
        }
      };
    }
    else if (inputLower.includes('tips') || inputLower.includes('advice')) {
      responseType = 'study-tips';
      responseContent = await simulateTyping("Here are some personalized study tips based on your learning patterns:");
      
      metadata = {
        tips: [
          { tip: "Use the Feynman Technique", description: "Explain concepts as if teaching someone else to deepen your understanding." },
          { tip: "Optimize your study space", description: "Your focus score is highest in quiet environments with minimal distractions." },
          { tip: "Try time-blocking", description: "Schedule specific subjects at times when your focus is historically highest." },
          { tip: "Take meditation breaks", description: "Your performance improves by 15% after meditation sessions." },
        ],
        focusPattern: "Your focus peaks between 9-11 AM and 4-6 PM",
        retentionTip: "Review notes within 24 hours to increase retention by 60%"
      };
    }
    else if (inputLower.includes('biology') || inputLower.includes('chapter')) {
      responseContent = await simulateTyping("The Living World is a fundamental chapter in NEET Biology. Based on previous years, there are typically 2-3 questions from this chapter. Focus on characteristics of living organisms, taxonomical aids, and classification systems. Your practice sessions show you understand the concepts well, but need more work on distinguishing between taxonomical categories.");
    }
    else if (inputLower.includes('neet') || inputLower.includes('exam')) {
      responseContent = await simulateTyping("NEET 2025 is scheduled for May. Based on your current progress, you're on track with Biology (75%) and Chemistry (82%), but need to focus more on Physics (68%). I recommend allocating an extra hour daily to Physics while maintaining your current study pattern for other subjects. Your concept retention has improved by 15% in the last month, which is excellent!");
    }
    else {
      responseContent = await simulateTyping("I'm here to help with your NEET preparation journey. I can provide guidance on study plans, analyze your progress, help with revisions, or explain specific topics. What aspect of your preparation would you like assistance with today?");
    }

    return {
      content: responseContent,
      type: responseType,
      metadata
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let responseContent = '';
      let responseType: 'text' | 'progress-report' | 'schedule' | 'study-tips' = 'text';
      let metadata = {};

      // Try to use the free Hugging Face model
      try {
        // First check if user has OpenAI key and wants to use it
        if (openAIKey.trim() && localStorage.getItem('openai_key')) {
          responseContent = await fetchOpenAIResponse(input);
        } else {
          // Use Hugging Face model
          setIsThinking(true);
          responseContent = await fetchHuggingFaceResponse(input);
          setIsThinking(false);
        }
      } catch (error) {
        console.error("AI API error:", error);
        
        // Fallback to pattern matching if AI fails
        const fallbackResponse = await generatePatternResponse(input.toLowerCase());
        responseContent = fallbackResponse.content;
        responseType = fallbackResponse.type;
        metadata = fallbackResponse.metadata;
      }
      
      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
        type: responseType,
        metadata: metadata
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response from Shiv. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- MENTAL HEALTH HANDLERS ---
  const handleMentalHealthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mhInput.trim()) return;
    // Add user message
    const userMessage: Message = {
      id: `user-mh-${Date.now()}`,
      content: mhInput,
      sender: 'user',
      timestamp: new Date()
    };
    setMhMessages(prev => [...prev, userMessage]);
    setMhInput('');
    setMhLoading(true);
    setMhThinking(true);
    try {
      const responseContent = await fetchMentalHealthResponse(userMessage.content);
      setMhMessages(prev => [
        ...prev,
        {
          id: `assistant-mh-${Date.now()}`,
          content: responseContent,
          sender: 'assistant',
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      setMhMessages(prev => [
        ...prev,
        {
          id: `assistant-mh-${Date.now()}`,
          content: "Sorry, I couldn't process your message right now. Please try again later.",
          sender: 'assistant',
          timestamp: new Date()
        }
      ]);
    } finally {
      setMhLoading(false);
      setMhThinking(false);
    }
  };

  // Helper to render specialized message content based on type
  const renderMessageContent = (message: Message) => {
    if (message.sender === 'user' || !message.type || message.type === 'text') {
      return <p className="whitespace-pre-line">{message.content}</p>;
    }

    switch (message.type) {
      case 'progress-report':
        return (
          <div className="space-y-4">
            <p className="whitespace-pre-line">{message.content}</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="font-medium">{message.metadata.overallProgress}%</span>
              </div>
              <Progress value={message.metadata.overallProgress} className="mb-4" />
              
              <div className="space-y-3">
                {message.metadata.subjects.map((subject: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{subject.name}</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className={
                      subject.progress < 70 ? "bg-red-100" : 
                      subject.progress < 85 ? "bg-yellow-100" : 
                      "bg-green-100"
                    } />
                    <p className="text-xs text-gray-600">{subject.recommendation}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <p className="text-sm font-medium">Focus areas:</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {message.metadata.weakTopics.map((topic: string, index: number) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="space-y-4">
            <p className="whitespace-pre-line">{message.content}</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium mb-2">Weekly Schedule</p>
              <div className="space-y-3">
                {message.metadata.schedule.map((day: any, index: number) => (
                  <div key={index} className="border-b pb-2">
                    <p className="font-medium">{day.day}</p>
                    <div className="grid grid-cols-3 gap-1 mt-1 text-xs">
                      <div className="bg-blue-50 p-1 rounded">{day.morning}</div>
                      <div className="bg-green-50 p-1 rounded">{day.afternoon}</div>
                      <div className="bg-purple-50 p-1 rounded">{day.evening}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 text-sm">
                <p><span className="font-medium">Daily study:</span> {message.metadata.studyPattern.studyTime}</p>
                <p><span className="font-medium">Breaks:</span> {message.metadata.studyPattern.breakSchedule}</p>
                <p><span className="font-medium">Best time:</span> {message.metadata.studyPattern.recommendedTimeOfDay}</p>
              </div>
            </div>
          </div>
        );

      case 'study-tips':
        return (
          <div className="space-y-4">
            <p className="whitespace-pre-line">{message.content}</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="space-y-3">
                {message.metadata.tips.map((tip: any, index: number) => (
                  <div key={index} className="border-b pb-2">
                    <p className="font-medium">{tip.tip}</p>
                    <p className="text-xs text-gray-600">{tip.description}</p>
                  </div>
                ))}
                <div className="pt-2 text-sm">
                  <p className="bg-blue-50 p-2 rounded">{message.metadata.focusPattern}</p>
                  <p className="bg-green-50 p-2 rounded mt-2">{message.metadata.retentionTip}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <p className="whitespace-pre-line">{message.content}</p>;
    }
  };

  // --- UI RENDER ---
  return (
    <Card className={`flex flex-col h-[540px] ${className}`}>
      <CardHeader className="py-3">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-6 w-6 text-learnzy-purple" />
          <span className="font-semibold text-lg">Shiv Assistant</span>
          <Tabs
            defaultValue={mode}
            onValueChange={v => setMode(v as 'academic' | 'mental-health')}
            className="ml-4"
          >
            <TabsList>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="mental-health"><Heart className="h-4 w-4 mr-1" />Mental Health</TabsTrigger>
            </TabsList>
          </Tabs>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center ml-2">
            <Sparkles className="h-3 w-3 mr-1" />
            Free AI
          </span>
          {onClose && <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto">×</Button>}
        </div>
      </CardHeader>
      <Tabs defaultValue={mode} value={mode} className="flex-1 flex flex-col">
        {/* Academic Mode */}
        <TabsContent value="academic" className="p-0 flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-learnzy-purple text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {renderMessageContent(message)}
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Shiv about your NEET preparation..."
                disabled={isLoading}
                className="flex-1"
              />
              <Popover open={capabilityOpen} onOpenChange={setCapabilityOpen}>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="ghost" className="flex-shrink-0">
                    <BookOpen size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-medium">Assistant Capabilities</h4>
                    <p className="text-sm text-gray-500">Try asking about these topics</p>
                  </div>
                  <div className="p-2">
                    {capabilities.map((capability, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start h-auto py-2 px-3"
                        onClick={() => {
                          setInput(`Tell me about my ${capability.name.toLowerCase()}`);
                          setCapabilityOpen(false);
                        }}
                      >
                        <div className="flex items-start">
                          <div className="bg-learnzy-purple/10 p-1 rounded mr-2">
                            <capability.icon className="h-4 w-4 text-learnzy-purple" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{capability.name}</p>
                            <p className="text-xs text-gray-500">{capability.description}</p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button type="submit" disabled={isLoading} className="flex-shrink-0">
                {isLoading ? "..." : <ArrowRight size={16} />}
              </Button>
            </form>
          </CardFooter>
        </TabsContent>
        {/* Mental Health Mode */}
        <TabsContent value="mental-health" className="p-0 flex-1 flex flex-col">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
              {mhMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 shadow ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-teal-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {mhThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-teal-100 max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-teal-200 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-teal-200 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-teal-200 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleMentalHealthSubmit} className="flex w-full gap-2">
              <Input
                value={mhInput}
                onChange={e => setMhInput(e.target.value)}
                placeholder="Share how you're feeling or ask for support..."
                disabled={mhLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={mhLoading} className="flex-shrink-0 bg-blue-600">
                {mhLoading ? "..." : <Heart size={16} />}
              </Button>
            </form>
          </CardFooter>
        </TabsContent>
      </Tabs>
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Assistant Settings</DialogTitle>
            <DialogDescription>
              Shiv is already using a free AI model. Optionally, you can enter your OpenAI API key for enhanced capabilities.
              Your key is stored locally on your device and is not sent to our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Free AI is already enabled</span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">(Optional) OpenAI API Key for Enhanced Features</Label>
              <Input
                id="apiKey"
                placeholder="sk-..."
                type="password"
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Optional: Get an OpenAI API key from the <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OpenAI dashboard</a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveApiKey}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShivAssistant;
