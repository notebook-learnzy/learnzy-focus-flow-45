
import { Task } from "@/types";
import { format, addDays, isToday, isTomorrow } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarWidgetProps {
  tasks: Task[];
}

const CalendarWidget = ({ tasks }: CalendarWidgetProps) => {
  const today = new Date();
  
  const getTasksForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return tasks.filter(task => task.date === dateString);
  };
  
  const formatDate = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEE, MMM d");
  };
  
  const getDateClasses = (date: Date) => {
    if (isToday(date)) return "bg-learnzy-purple text-white";
    return "bg-white border border-gray-100";
  };
  
  const getDotColor = (type: string) => {
    if (type === "practice") return "bg-learnzy-orange";
    if (type === "wellness") return "bg-learnzy-mint";
    return "bg-gray-300";
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      <div className="flex items-center mb-4">
        <CalendarIcon className="mr-2 text-learnzy-purple" />
        <h3 className="text-lg font-semibold">Upcoming</h3>
      </div>
      
      <div className="space-y-4">
        {[0, 1, 2].map((dayOffset) => {
          const date = addDays(today, dayOffset);
          const dayTasks = getTasksForDate(date);
          
          return (
            <div key={dayOffset} className="flex flex-col">
              <div className={`flex justify-between items-center p-3 rounded-lg ${getDateClasses(date)}`}>
                <span className="font-medium">{formatDate(date)}</span>
                <div className="flex space-x-1">
                  {dayTasks.length > 0 ? (
                    dayTasks.map((task, idx) => (
                      <span key={idx} className={`dot ${getDotColor(task.type)}`} />
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No tasks</span>
                  )}
                </div>
              </div>
              
              {dayTasks.length > 0 && (
                <div className="mt-2 space-y-1 pl-2">
                  {dayTasks.map((task) => (
                    <div key={task.id} className="flex items-center text-sm">
                      <span className={`dot mr-2 ${getDotColor(task.type)}`} />
                      <span className="truncate">{task.title}</span>
                      <span className="ml-auto text-xs text-gray-400">{task.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
