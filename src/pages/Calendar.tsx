
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tasks } from "@/data/mockData";
import { Task, TaskType } from "@/types";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const getTasksForDate = (date: Date | undefined): Task[] => {
    if (!date) return [];
    const dateString = format(date, "yyyy-MM-dd");
    return tasks.filter(task => task.date === dateString);
  };
  
  const getTaskDotColor = (type: TaskType) => {
    switch (type) {
      case "practice": return "bg-learnzy-orange";
      case "wellness": return "bg-learnzy-mint";
      default: return "bg-gray-300";
    }
  };
  
  const selectedDateTasks = getTasksForDate(selectedDate);
  
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button className="bg-learnzy-purple">
          <Plus size={18} className="mr-1" /> Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Daily Agenda</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {selectedDateTasks.length} {selectedDateTasks.length === 1 ? "task" : "tasks"}
                  </span>
                </div>
                
                {selectedDateTasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateTasks.map(task => (
                      <div 
                        key={task.id}
                        className={cn(
                          "flex items-center p-3 rounded-lg border",
                          task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
                        )}
                      >
                        <span className={cn("dot mr-3", getTaskDotColor(task.type))} />
                        <div className="flex-1">
                          <p className={cn("font-medium", task.completed ? "line-through text-gray-400" : "")}>
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500">{task.time} · {task.duration} min</p>
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="sm">
                            {task.completed ? "Undo" : "Complete"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="mx-auto mb-2 h-10 w-10 opacity-30" />
                    <p>No tasks scheduled for this day</p>
                    <Button variant="link" className="mt-2 text-learnzy-purple">
                      Add a task
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Select a date to view tasks
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly View</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
