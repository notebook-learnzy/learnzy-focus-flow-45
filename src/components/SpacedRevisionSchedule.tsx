
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionSet } from '@/types';
import { chapters } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface SpacedRevisionScheduleProps {
  questionSets: QuestionSet[];
  className?: string;
}

const SpacedRevisionSchedule = ({ questionSets, className }: SpacedRevisionScheduleProps) => {
  // Filter for scheduled sets only
  const scheduledSets = questionSets.filter(set => set.scheduled_date && !set.completed_date);
  
  // Sort by scheduled date
  const sortedSets = [...scheduledSets].sort((a, b) => {
    return new Date(a.scheduled_date!).getTime() - new Date(b.scheduled_date!).getTime();
  });
  
  // Get chapter name for a set
  const getChapterName = (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    return chapter ? chapter.name : 'Unknown Chapter';
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon size={18} />
          <span>Spaced Revision Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedSets.length > 0 ? (
          <div className="space-y-3">
            {sortedSets.map(set => (
              <div key={set.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">
                    {getChapterName(set.chapter_id)} - Set {set.set_type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(set.scheduled_date!)} • {set.questions.length} questions
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  set.set_type === 'A' ? 'bg-blue-100 text-blue-700' :
                  set.set_type === 'B' ? 'bg-green-100 text-green-700' :
                  set.set_type === 'C' ? 'bg-yellow-100 text-yellow-700' :
                  set.set_type === 'D' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  Set {set.set_type}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No spaced revision sets scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpacedRevisionSchedule;
