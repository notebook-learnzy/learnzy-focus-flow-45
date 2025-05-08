
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ShivAssistantProps {
  className?: string;
  onClose?: () => void;
}

// Mock NEET preparation data
const neetPreparationData = {
  idealStudyHours: {
    physics: 3,
    chemistry: 2.5,
    biology: 4
  },
  topicsImportance: {
    physics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"],
    chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
    biology: ["Human Physiology", "Plant Physiology", "Genetics", "Ecology"]
  }
};

const ShivAssistant = ({ className, onClose }: ShivAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Shiv, your NEET preparation assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      // In a real application, we would make an API call to an AI service
      // For now, we'll use a mock response based on the input
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      let responseContent = '';
      
      // Basic pattern matching to generate responses
      const inputLower = input.toLowerCase();
      
      if (inputLower.includes('how is my preparation')) {
        responseContent = "Based on your progress in the app, I see you've been consistent with your practice sets in Biology, but might need more focus on Physics. Your accuracy in Chemistry practice sets has improved by 15% in the last month, which is excellent! To stay on track for NEET, I recommend increasing your weekly practice hours for Physics by at least 2 hours.";
      } 
      else if (inputLower.includes('study plan')) {
        responseContent = "For optimal NEET preparation, I recommend: \n\n• Physics: 3 hours daily focusing on mechanics and electromagnetism\n• Chemistry: 2.5 hours daily with emphasis on organic reactions\n• Biology: 4 hours daily prioritizing human physiology and genetics\n\nYour current study pattern shows more time on Biology, which is good, but consider balancing with more Physics practice.";
      }
      else if (inputLower.includes('revise') || inputLower.includes('help me with')) {
        const topic = inputLower.includes('physics') ? 'Physics' : 
                      inputLower.includes('chemistry') ? 'Chemistry' : 
                      'Biology';
        responseContent = `Let's review the key concepts for ${topic}. Based on your practice history, I'd suggest focusing on these specific areas that align with NEET exam patterns. Would you like me to create a revision schedule for this topic or provide practice questions?`;
      }
      else if (inputLower.includes('ncert')) {
        responseContent = "The NCERT textbooks are essential for NEET preparation. Based on the chapter you mentioned, here are the key concepts to focus on: [Key concepts would be provided here]. Your practice sessions show you're stronger in conceptual questions but need more practice with numerical problems from this chapter.";
      }
      else {
        responseContent = "I'm here to help with your NEET preparation journey. I can provide guidance on study plans, analyze your progress, help with revisions, or explain specific topics. What aspect of your preparation would you like assistance with?";
      }
      
      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date()
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

  return (
    <Card className={`flex flex-col h-[500px] ${className}`}>
      <CardHeader className="py-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/shiv-avatar.png" alt="Shiv" />
              <AvatarFallback className="bg-learnzy-purple text-white">
                <GraduationCap className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span>Shiv - NEET Assistant</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-learnzy-purple text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ShivAssistant;
