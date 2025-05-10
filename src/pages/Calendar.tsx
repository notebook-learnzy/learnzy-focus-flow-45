
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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    type: "practice",
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "12:00",
    duration: 30,
    completed: false
  });
  
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
  
  // Generate days of the week for weekly view
  const renderWeekDays = () => {
    return Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(weekStart, index);
      const dayTasks = getTasksForDate(day);
      const isSelected = isSameDay(day, selectedDate);
      
      return (
        <div 
          key={index} 
          className={cn(
            "flex-1 min-w-[120px] border-r last:border-r-0 border-gray-200",
            isSelected ? "bg-blue-50" : ""
          )}
        >
          <div 
            className={cn(
              "sticky top-0 p-2 text-center border-b cursor-pointer hover:bg-gray-50",
              isSelected ? "bg-blue-100" : "bg-white"
            )}
            onClick={() => setSelectedDate(day)}
          >
            <p className="text-sm text-gray-500">{format(day, "EEE")}</p>
            <p className={cn(
              "text-lg font-medium", 
              isSameDay(day, new Date()) ? "bg-learnzy-purple text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""
            )}>
              {format(day, "d")}
            </p>
          </div>
          
          <div className="space-y-1 p-1">
            {dayTasks.map((task) => (
              <Popover key={task.id}>
                <PopoverTrigger asChild>
                  <div 
                    className={cn(
                      "p-2 text-xs rounded-md cursor-pointer",
                      task.completed ? "bg-gray-100" : task.type === "practice" ? "bg-orange-100" : "bg-green-100"
                    )}
                  >
                    <div className="flex items-center">
                      <span className={cn("dot mr-1", getTaskDotColor(task.type))} />
                      <span className={cn(task.completed ? "line-through text-gray-500" : "")}>
                        {task.time} - {task.title}
                      </span>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon size={14} className="mr-1" />
                        {format(parseISO(task.date), "MMMM d, yyyy")}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock size={14} className="mr-1" />
                        {task.time} • {task.duration} min
                      </div>
                    </div>
                    <div className="flex justify-between pt-2 border-t mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCompleteTask(task.id, !task.completed)}
                      >
                        {task.completed ? <X size={14} className="mr-1" /> : <Check size={14} className="mr-1" />}
                        {task.completed ? "Undo" : "Complete"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>
      );
    });
  };
  
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-learnzy-purple">
              <Plus size={18} className="mr-1" /> Add Task
            </Button>
          </DialogTrigger>
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
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1">
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
              className={viewMode === "month" ? "bg-gray-200" : ""}
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevWeek}>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={nextWeek}>
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div>
            <h2 className="text-lg font-medium">
              {viewMode === "day" 
                ? format(selectedDate, "MMMM d, yyyy") 
                : viewMode === "week" 
                  ? `${format(weekStart, "MMMM d")} - ${format(addDays(weekStart, 6), "MMMM d, yyyy")}`
                  : format(selectedDate, "MMMM yyyy")
              }
            </h2>
          </div>
          
          <Button variant="outline" size="icon">
            <MoreHorizontal size={16} />
          </Button>
        </div>
        
        {viewMode === "week" ? (
          <Card className="overflow-hidden">
            <div className="flex overflow-x-auto min-h-[600px]">
              {renderWeekDays()}
            </div>
          </Card>
        ) : viewMode === "month" ? (
          <Card>
            <CardContent className="pt-6">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="pointer-events-auto"
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Agenda</CardTitle>
            </CardHeader>
            <CardContent>
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
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCompleteTask(task.id, !task.completed)}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="mx-auto mb-2 h-10 w-10 opacity-30" />
                  <p>No tasks scheduled for this day</p>
                  <DialogTrigger asChild>
                    <Button variant="link" className="mt-2 text-learnzy-purple">
                      Add a task
                    </Button>
                  </DialogTrigger>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Calendar;
