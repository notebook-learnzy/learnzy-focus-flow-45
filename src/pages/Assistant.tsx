import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ShivAssistant from "@/components/ShivAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Star, HelpCircle, Shield, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const Assistant = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">Shiv Assistant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Updated: ShivAssistant now supports both academic and mental health modes */}
          <ShivAssistant />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Assistant Capabilities
                </CardTitle>
                <Badge className="bg-green-500 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Free AI Powered
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="bg-learnzy-purple/10 p-1 rounded-full mt-0.5">
                    <BookOpen className="h-4 w-4 text-learnzy-purple" />
                  </div>
                  <span>Personalized study plans based on your progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-learnzy-purple/10 p-1 rounded-full mt-0.5">
                    <BookOpen className="h-4 w-4 text-learnzy-purple" />
                  </div>
                  <span>Chapter-specific revision assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-learnzy-purple/10 p-1 rounded-full mt-0.5">
                    <BookOpen className="h-4 w-4 text-learnzy-purple" />
                  </div>
                  <span>Progress tracking compared to ideal NEET journey</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-learnzy-purple/10 p-1 rounded-full mt-0.5">
                    <BookOpen className="h-4 w-4 text-learnzy-purple" />
                  </div>
                  <span>NCERT textbook summaries and key concepts</span>
                </li>
                <li className="flex items-start gap-2 mt-3 pt-3 border-t">
                  <div className="bg-green-100 p-1 rounded-full mt-0.5">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-green-700">Free AI-powered responses with Hugging Face models</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Sample Questions
              </CardTitle>
              <CardDescription>Try asking Shiv these questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="study">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="study">Study</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="revision">Revision</TabsTrigger>
                </TabsList>
                <TabsContent value="study" className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded-md">"What's the best study plan for NEET?"</li>
                    <li className="p-2 bg-gray-50 rounded-md">"How many hours should I study Physics daily?"</li>
                    <li className="p-2 bg-gray-50 rounded-md">"Which topics have the highest weightage in NEET?"</li>
                  </ul>
                </TabsContent>
                <TabsContent value="progress" className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded-md">"How is my preparation going?"</li>
                    <li className="p-2 bg-gray-50 rounded-md">"Am I on track with my Biology revision?"</li>
                    <li className="p-2 bg-gray-50 rounded-md">"What are my weak areas in Chemistry?"</li>
                  </ul>
                </TabsContent>
                <TabsContent value="revision" className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 rounded-md">"Help me revise Human Physiology"</li>
                    <li className="p-2 bg-gray-50 rounded-md">"Recite the NCERT for Thermodynamics"</li>
                    <li className="p-2 bg-gray-50 rounded-md">"Create a quick revision for Organic Chemistry"</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
