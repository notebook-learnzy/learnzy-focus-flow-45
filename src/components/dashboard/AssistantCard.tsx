
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface AssistantCardProps {
  onOpenAssistant: () => void;
}

const AssistantCard = ({ onOpenAssistant }: AssistantCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-learnzy-purple/10 to-learnzy-purple/5 border-learnzy-purple/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-learnzy-purple" />
          Shiv Assistant
        </CardTitle>
        <CardDescription>Your personalized NEET guide</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">Ask Shiv about your progress, revision tips, or study plans tailored for NEET preparation.</p>
        <Button onClick={onOpenAssistant} className="w-full">
          Chat with Shiv
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssistantCard;
