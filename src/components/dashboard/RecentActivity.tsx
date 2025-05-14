
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

type RecentActivityItem = {
  id: string;
  type: "practice" | "wellness" | "revision";
  title: string;
  date: string; // ISO
  description?: string;
};

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

const typeMap = {
  practice: { label: "Practice", color: "bg-orange-100 text-orange-800" },
  wellness: { label: "Wellness", color: "bg-green-100 text-green-800" },
  revision: { label: "Revision", color: "bg-indigo-100 text-indigo-800" }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => (
  <Card>
    <CardHeader>
      <span className="font-bold text-lg">Recent Activity</span>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {activities.map(activity => (
          <li key={activity.id} className="flex items-start gap-3">
            <div className={`px-2 py-1 rounded ${typeMap[activity.type].color} text-xs font-semibold`}>
              {typeMap[activity.type].label}
            </div>
            <div>
              <div className="font-medium">{activity.title}</div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} /> {new Date(activity.date).toLocaleString()}
              </div>
              {activity.description && (
                <div className="text-xs text-gray-500 mt-1">{activity.description}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {activities.length === 0 && (
        <div className="text-gray-400 text-center py-8">No recent activity yet!</div>
      )}
    </CardContent>
  </Card>
);

export default RecentActivity;
