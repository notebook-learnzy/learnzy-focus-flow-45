
import React from "react";
import { Flame } from "lucide-react";

const StreakCard: React.FC<{ days: number }> = ({ days }) => (
  <div className="rounded-xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 shadow flex items-center p-4 animate-fade-in cursor-pointer hover:scale-105 transition-transform duration-200">
    <Flame className="text-orange-500 w-10 h-10 mr-4 drop-shadow-lg" />
    <div>
      <div className="text-lg font-bold text-gray-800">
        {days}-Day Learning Streak!
      </div>
      <div className="text-sm text-gray-600">
        Keep it up—consistency pays off!
      </div>
    </div>
  </div>
);

export default StreakCard;
