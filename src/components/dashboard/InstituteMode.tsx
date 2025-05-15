
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, LayoutGrid, BookText, GraduationCap } from "lucide-react";

// Types for incoming props
interface Assignment {
  id: string;
  title: string;
  deadline: string;
}
interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
}

interface InstituteModeProps {
  assignments: Assignment[];
  announcements: Announcement[];
  onOpenAssistant: () => void;
}

const InstituteMode: React.FC<InstituteModeProps> = ({
  assignments,
  announcements,
  onOpenAssistant,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div className="md:col-span-2 space-y-4 sm:space-y-6">
        {/* Assignments Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Assigned to You
            </CardTitle>
          </CardHeader>
          <CardContent>
            {assignments.length ? (
              <div className="space-y-3">
                {assignments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-gray-500"><Clock size={14} className="inline mb-0.5 mr-1" />Due: {a.deadline}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-learnzy-purple">
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">No assignments at the moment.</div>
            )}
          </CardContent>
        </Card>

        {/* Announcements Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <LayoutGrid className="h-5 w-5 mr-2" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((n) => (
                <div key={n.id} className="p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{n.title}</p>
                    <span className="text-xs text-gray-500">{n.date}</span>
                  </div>
                  <p className="text-xs text-gray-600">{n.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {/* Shiv Assistant in institute mode */}
        <Card className="bg-learnzy-purple/10 border-learnzy-purple/30">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-learnzy-purple/20 p-2 sm:p-3 rounded-full">
                <BookText className="h-5 w-5 text-learnzy-purple" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm sm:text-base">Need help with your assignments?</h3>
                <p className="text-xs text-gray-600 mb-2">Ask Shiv Assistant for help or clarifications.</p>
                <Button
                  size="sm"
                  className="bg-learnzy-purple w-full"
                  onClick={onOpenAssistant}
                >
                  Open Assistant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstituteMode;
