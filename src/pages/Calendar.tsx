import { useState, useEffect } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tasks, chapters } from "@/data/mockData";
import { Task, TaskType } from "@/types";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Clock, 
  Check,
  X
} from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, parseISO, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

import CalendarSidebar from "@/components/CalendarSidebar";
import CalendarTimeGrid from "@/components/CalendarTimeGrid";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("week");
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Set week start based on selected date
    if (viewMode === "week") {
      setWeekStart(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    }
  }, [selectedDate, viewMode]);
  
  const getTasksForDate = (date: Date | undefined): Task[] => {
    if (!date) return [];
    const dateString = format(date, "yyyy-MM-dd");
    return allTasks.filter(task => task.date === dateString);
  };
  
  const getTaskDotColor = (type: TaskType) => {
    switch (type) {
      case "practice": return "bg-learnzy-orange";
      case "wellness": return "bg-learnzy-mint";
      default: return "bg-gray-300";
    }
  };
  
  const selectedDateTasks = getTasksForDate(selectedDate);
  
  const nextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1));
    setSelectedDate(addWeeks(selectedDate, 1));
  };
  
  const prevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1));
    setSelectedDate(subWeeks(selectedDate, 1));
  };
  
  const [newTask, setNewTask] = useState<Partial<Task>>({
    type: "practice",
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "12:00",
    duration: 30,
    completed: false
  });
  
  const handleAddTask = () => {
    if (!newTask.title || !newTask.date || !newTask.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const createdTask: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title!,
      type: newTask.type as TaskType || "practice",
      date: newTask.date!,
      time: newTask.time!,
      duration: newTask.duration || 30,
      completed: false,
      chapterId: newTask.chapterId
    };
    
    setAllTasks([...allTasks, createdTask]);
    
    toast({
      title: "Task added",
      description: `${createdTask.title} has been scheduled for ${format(parseISO(createdTask.date), "MMMM d")}`,
    });
    
    // Reset form
    setNewTask({
      type: "practice",
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "12:00",
      duration: 30,
      completed: false
    });
  };
  
  const handleCompleteTask = (taskId: string, completed: boolean) => {
    setAllTasks(allTasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
    
    toast({
      title: completed ? "Task completed" : "Task marked incomplete",
    });
  };
  
  const handleDeleteTask = (taskId: string) => {
    setAllTasks(allTasks.filter(task => task.id !== taskId));
    
    toast({
      title: "Task removed",
    });
  };

  return (
    <div className="flex w-full min-h-[700px] relative">
      {/* Sidebar (hid on mobile) */}
      <CalendarSidebar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onCreate={() => setShowDialog(true)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-4 pt-4 pb-2 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={viewMode === "day" ? "bg-gray-200" : ""}
              onClick={() => setViewMode("day")}
            >
              Day
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={viewMode === "week" ? "bg-gray-200" : ""}
              onClick={() => setViewMode("week")}
            >
              Week
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </Button>
          </div>
          <div>
            <span className="font-semibold text-lg">{format(selectedDate, "MMMM d, yyyy")}</span>
          </div>
        </div>
        {/* Time grid (main calendar) */}
        <CalendarTimeGrid
          weekStart={weekStart}
          selectedDate={selectedDate}
          tasks={allTasks}
          onSelectDate={setSelectedDate}
          viewMode={viewMode}
        />

        {/* Dialog for Add Task */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Title</label>
                <Input 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Type</label>
                <Select
                  value={newTask.type as string}
                  onValueChange={(value) => setNewTask({...newTask, type: value as TaskType})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="wellness">Wellness</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newTask.type === "practice" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chapter</label>
                  <Select
                    value={newTask.chapterId}
                    onValueChange={(value) => setNewTask({...newTask, chapterId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.map(chapter => (
                        <SelectItem key={chapter.id} value={chapter.id}>{chapter.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input 
                  type="number"
                  value={newTask.duration}
                  onChange={(e) => setNewTask({...newTask, duration: Number(e.target.value)})}
                  min={5}
                  max={240}
                />
              </div>
              
              <Button className="w-full bg-learnzy-purple" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
