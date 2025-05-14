
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Activity } from "lucide-react";

interface ActionableInsightsProps {
  summary: Array<{ label: string; value: string | number }>;
}

const ActionableInsights: React.FC<ActionableInsightsProps> = ({ summary }) => {
  const navigate = useNavigate();

  // Example logic: you can add more rules here based on summary props.
  const actionableItems = [];

  // Find summary values by label for easy rule implementation
  const wellness = summary.find((m) => m.label === "Wellness Sessions");
  const practice = summary.find((m) => m.label === "Questions Attempted");

  // Example insight for wellness sessions below 4 in a week
  if (
    typeof wellness?.value === "number" &&
    wellness.value < 4
  ) {
    actionableItems.push({
      icon: <Clock className="h-6 w-6 text-learnzy-purple" />,
      title: "Wellness sessions below target",
      description: "Boost your productivity and reduce stress by scheduling a wellness session.",
      cta: "Schedule Session",
      onClick: () => navigate("/wellness"),
    });
  }

  // Example insight for questions per week low (<50). Adjust as needed
  if (
    typeof practice?.value === "number" &&
    practice.value < 50
  ) {
    actionableItems.push({
      icon: <Activity className="h-6 w-6 text-learnzy-orange" />,
      title: "Few questions attempted this week",
      description: "Consistent practice leads to better results! Try a quick session now.",
      cta: "Start Practice",
      onClick: () => navigate("/practice"),
    });
  }

  // Default fallback
  if (actionableItems.length === 0) {
    actionableItems.push({
      icon: <AlertTriangle className="h-6 w-6 text-learnzy-purple" />,
      title: "All caught up!",
      description: "You're on track with your study and wellness targets.",
      cta: "View Analytics",
      onClick: () => navigate("/analytics"),
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {actionableItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-learnzy-purple/10"
        >
          <div className="mr-4">{item.icon}</div>
          <div className="flex-1">
            <div className="font-bold text-gray-900">{item.title}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </div>
          <Button className="ml-4 bg-learnzy-purple text-white" onClick={item.onClick}>
            {item.cta}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ActionableInsights;
