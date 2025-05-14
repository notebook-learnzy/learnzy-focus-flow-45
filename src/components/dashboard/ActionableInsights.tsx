
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { bed, clock, trending-up, trending-down, book-open, book } from "lucide-react";

interface ActionableInsightsProps {
  summary: Array<{ label: string; value: string | number }>;
}

const ICONS = {
  sleep: <bed className="h-6 w-6 text-blue-700" />,
  time: <clock className="h-6 w-6 text-learnzy-purple" />,
  focus: <trending-up className="h-6 w-6 text-green-600" />,
  anxious: <trending-down className="h-6 w-6 text-pink-600" />,
  study: <book-open className="h-6 w-6 text-learnzy-orange" />,
  general: <book className="h-6 w-6 text-gray-600" />,
};

const ActionableInsights: React.FC<ActionableInsightsProps> = ({ summary }) => {
  const navigate = useNavigate();

  // Example: Get mock values for advanced insights.
  const wellness = summary.find((m) => m.label === "Wellness Sessions");
  const practice = summary.find((m) => m.label === "Questions Attempted");
  // For demo purposes, use static/mock values for user patterns:
  // In real use, below values would come from analytics, queries, etc.
  const sleepLast3Days = [5, 4, 4]; // hours slept
  const mostFocusedTime = "Evening";
  const anxiousAfterStudy = true; // correlates long study with anxiety

  // --- Advanced, youth-centric insight examples ---
  const actionableItems = [];

  // 1. Sleep trend (e.g., less than 6h for 3 days)
  if (sleepLast3Days.every(h => h < 6)) {
    actionableItems.push({
      icon: ICONS.sleep,
      title: "You're sleeping less recently",
      description: "You've slept under 6 hours for 3 days. Try heading to bed earlier for better focus and mood.",
      cta: "See Sleep Tips",
      onClick: () => navigate("/wellness"),
    });
  }

  // 2. Focus pattern ("most focused at X, try study then")
  actionableItems.push({
    icon: ICONS.focus,
    title: "Evenings boost your focus!",
    description: `Your focus is highest in the ${mostFocusedTime}. Try tackling tougher subjects at this time for better results.`,
    cta: "Optimize Study",
    onClick: () => navigate("/analytics"),
  });

  // 3. Study-anxiety link insight
  if (anxiousAfterStudy) {
    actionableItems.push({
      icon: ICONS.anxious,
      title: "Long study sessions = more stress",
      description: "You seem more anxious after studying 2+ hours at once. Try shorter, spaced sessions for a calmer mind.",
      cta: "Explore Pomodoro",
      onClick: () => navigate("/wellness"),
    });
  }

  // 4. Core: Wellness session below target (basic, but still useful)
  if (
    typeof wellness?.value === "number" &&
    wellness.value < 4
  ) {
    actionableItems.push({
      icon: ICONS.time,
      title: "Wellness sessions below target",
      description: "Boost your productivity and reduce stress by scheduling a wellness session.",
      cta: "Schedule Session",
      onClick: () => navigate("/wellness"),
    });
  }

  // 5. Core: Practice is low
  if (
    typeof practice?.value === "number" &&
    practice.value < 50
  ) {
    actionableItems.push({
      icon: ICONS.study,
      title: "Few questions attempted this week",
      description: "Consistent practice leads to better results! Try a quick session now.",
      cta: "Start Practice",
      onClick: () => navigate("/practice"),
    });
  }

  // --- Ensure we always have at least one insight ---
  if (actionableItems.length === 0) {
    actionableItems.push({
      icon: ICONS.general,
      title: "All caught up!",
      description: "You're on track with your study and wellness targets.",
      cta: "View Analytics",
      onClick: () => navigate("/analytics"),
    });
  }

  // Responsive scroll: grid on desktop, scroll snap row on mobile/tablet.
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 flex-nowrap scroll-smooth scroll-pl-3 snap-x">
        {actionableItems.map((item, idx) => (
          <div
            key={idx}
            className="snap-start min-w-[320px] sm:min-w-0 flex items-center p-4 bg-white rounded-lg shadow-sm border border-learnzy-purple/10 hover:shadow-md transition
            animate-fade-in"
          >
            <div className="mr-4">{item.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
            <Button
              className="ml-4 bg-learnzy-purple text-white hover:scale-105"
              onClick={item.onClick}
            >
              {item.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionableInsights;
