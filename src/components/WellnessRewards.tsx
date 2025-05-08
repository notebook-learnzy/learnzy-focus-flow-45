
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Award, Flame, TrendingUp } from "lucide-react";

interface WellnessRewardsProps {
  className?: string;
}

// Mock data
const mockBadges = [
  { id: '1', name: 'Focus Master', description: '5 consecutive sessions with focus score above 80', earned: true, icon: 'focus', color: 'bg-purple-100 text-purple-800' },
  { id: '2', name: '7-Day Calm', description: 'Complete pre-quiz meditation for 7 days straight', earned: true, icon: 'meditation', color: 'bg-blue-100 text-blue-800' },
  { id: '3', name: 'Perfect Recall', description: 'Score 100% on a Set B quiz', earned: false, icon: 'accuracy', color: 'bg-green-100 text-green-800', progress: 80 },
  { id: '4', name: 'Consistency Champion', description: 'Complete all scheduled practice for 2 weeks', earned: false, icon: 'streak', color: 'bg-amber-100 text-amber-800', progress: 60 },
];

const currentStreaks = {
  meditation: 5,
  focusThreshold: 3, 
  dailyPractice: 4
};

const WellnessRewards = ({ className }: WellnessRewardsProps) => {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'focus':
        return <TrendingUp className="h-5 w-5" />;
      case 'meditation':
        return <Heart className="h-5 w-5" />;
      case 'accuracy':
        return <Award className="h-5 w-5" />;
      case 'streak':
        return <Flame className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Wellness Rewards
        </CardTitle>
        <CardDescription>Your achievements and current streaks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Current Streaks</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <Heart className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-purple-700">{currentStreaks.meditation}</p>
              <p className="text-xs text-purple-600">Meditation Days</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-700">{currentStreaks.focusThreshold}</p>
              <p className="text-xs text-blue-600">High Focus Days</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <Flame className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-700">{currentStreaks.dailyPractice}</p>
              <p className="text-xs text-green-600">Practice Days</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Earned Badges</h3>
          <div className="space-y-3">
            {mockBadges.map((badge) => (
              <div key={badge.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className={`p-2 rounded-full ${badge.color}`}>
                  {renderIcon(badge.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{badge.name}</h4>
                    {badge.earned && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                  
                  {!badge.earned && badge.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-1.5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Keep up your practice and meditation to earn more badges!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessRewards;
