
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
  X,
  Settings,
  Grid3X3,
  List
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
import { supabase } from "@/integrations/supabase/client";

import CalendarSidebar from "@/components/CalendarSidebar";
import CalendarTimeGrid from "@/components/CalendarTimeGrid";

const VALID_TASK_TYPES: TaskType[] = ["practice", "wellness", "custom"];

const Calendar = () => {
  // Ensure all tasks loaded have type as TaskType, not just string
  const cleanTasks = (rawTasks: any[]): Task[] => {
    return rawTasks
      .filter((task) => typeof task.type === "string" && VALID_TASK_TYPES.includes(task.type))
      .map((task) => ({
        ...task,
        type: task.type as TaskType,
      }));
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [allTasks, setAllTasks] = useState<Task[]>(cleanTasks(tasks));
  const [showDialog, setShowDialog] = useState(false);
  const [revisionEvents, setRevisionEvents] = useState<any[]>([]);
  
  // --- Fetch scheduled revisions from Supabase for REAL DATA (not mock) ---
  useEffect(() => {
    let ignore = false;
    async function fetchRevisions() {
      const { data } = await supabase
        .from("scheduled_revisions")
        .select("*")
        .order("scheduled_date", { ascending: true });
      if (!ignore) setRevisionEvents(data || []);
    }
    fetchRevisions();
    // Sub for realtime updates, update on change
    const channel = supabase
      .channel('revisions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'scheduled_revisions',
      }, () => fetchRevisions())
      .subscribe();
    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Set week start based on selected date
    if (viewMode === "week") {
      setWeekStart(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    }
  }, [selectedDate, viewMode]);

  // Track target day/time for quick add
  const [taskModalDefaults, setTaskModalDefaults] = useState<{date?:string, time?:string}>({});

  const [newTask, setNewTask] = useState<Partial<Task>>({
    type: "practice",
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "12:00",
    duration: 30,
    description: "",
    color: "",
    location: "",
    completed: false
  });

  // When opening dialog for a specific slot
  const openAddTaskDialog = (date: string, time?: string) => {
    setTaskModalDefaults({ date, time });
    setNewTask({
      ...newTask,
      date,
      time: time || "12:00"
    });
    setShowDialog(true);
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
      chapterId: newTask.chapterId,
      description: newTask.description || "",
      color: newTask.color || "",
      location: newTask.location || ""
    };

    setAllTasks(prev => cleanTasks([...prev, createdTask]));

    toast({
      title: "Task added",
      description: `${createdTask.title} has been scheduled for ${format(parseISO(createdTask.date), "MMMM d")}`,
    });

    setNewTask({
      type: "practice",
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "12:00",
      duration: 30,
      description: "",
      color: "",
      location: "",
      completed: false
    });

    setShowDialog(false);
    setTaskModalDefaults({});
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

  // Navigation functions
  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setWeekStart(subWeeks(weekStart, 1));
      setSelectedDate(subWeeks(selectedDate, 1));
    } else {
      setWeekStart(addWeeks(weekStart, 1));
      setSelectedDate(addWeeks(selectedDate, 1));
    }
  };

// For mini task dots in the calendar, include revisionEvents
const getTasksForDate = (date: Date | undefined): Task[] => {
  if (!date) return [];
  const dateString = format(date, "yyyy-MM-dd");
  // Merge allTasks and ALL revision events from Supabase (not just demo)
  const merged: Task[] = [
    ...allTasks,
    ...revisionEvents
      .filter(r => !!r.scheduled_date)
      .map(r => ({
        id: `revision-${r.id ?? ""}`,
        title: r.set_id
          ? `Revise Set ${r.set_id}`
          : "Revision Session",
        type: "practice" as TaskType, // Fix: force TaskType
        date: r.scheduled_date,
        time: r.scheduled_time || "18:00",
        duration: 45,
        completed: false,
        chapterId: r.chapter_id, // optional, for later
        description: r.notes || "",
        color: "#b377fa", // subtle purple for revision, can update later
        location: "",
      })),
  ];
  return merged.filter(task => task.date === dateString);
};

return (
  <div className="flex w-full min-h-screen bg-white">
    {/* Sidebar */}
    <CalendarSidebar
      selectedDate={selectedDate}
      onSelectDate={setSelectedDate}
      onCreate={() => setShowDialog(true)}
    />

    {/* Main Content */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-medium text-gray-900">Calendar</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(new Date())}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            Today
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateWeek('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateWeek('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-xl font-normal text-gray-900">
            {viewMode === "week" 
              ? format(weekStart, "MMMM yyyy")
              : format(selectedDate, "MMMM d, yyyy")
            }
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "day" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3 text-sm",
                viewMode === "day" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              )}
              onClick={() => setViewMode("day")}
            >
              Day
            </Button>
            <Button
              variant={viewMode === "week" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3 text-sm",
                viewMode === "week" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              )}
              onClick={() => setViewMode("week")}
            >
              Week
            </Button>
            <Button
              variant={viewMode === "month" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3 text-sm",
                viewMode === "month" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              )}
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden">
        {(viewMode === "day" || viewMode === "week") && (
          <CalendarTimeGrid
            weekStart={weekStart}
            selectedDate={selectedDate}
            tasks={[
              ...allTasks,
              ...revisionEvents.map(r => ({
                id: `revision-${r.id ?? ""}`,
                title: r.set_id
                  ? `Revise Set ${r.set_id}`
                  : "Revision Session",
                type: "practice" as TaskType,
                date: r.scheduled_date,
                time: r.scheduled_time || "18:00",
                duration: 45,
                completed: false,
                chapterId: r.chapter_id,
                description: r.notes || "",
                color: "#b377fa",
                location: "",
              })),
            ]}
            onSelectDate={setSelectedDate}
            viewMode={viewMode}
            onAddTaskSlot={(date, time) => openAddTaskDialog(date, time)}
          />
        )}

        {viewMode === "month" && (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-10 text-lg">
            Month view coming soon!
          </div>
        )}
      </div>

      {/* Floating Create Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
          onClick={() => {
            setShowDialog(true);
            setTaskModalDefaults({
              date: format(selectedDate, "yyyy-MM-dd"),
              time: undefined
            });
          }}
        >
          <Plus size={24} />
        </Button>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={showDialog} onOpenChange={(open) => {
        setShowDialog(open);
        if (!open) setTaskModalDefaults({});
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input 
                value={newTask.title} 
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Add title"
                className="text-lg border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input 
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  className="border border-gray-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  className="border border-gray-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Input 
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Add description"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Input 
                value={newTask.location}
                onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                placeholder="Add location"
                className="border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Select
                value={newTask.type as string}
                onValueChange={(value) => setNewTask({...newTask, type: value as TaskType})}
              >
                <SelectTrigger className="border border-gray-200">
                  <SelectValue placeholder="Select calendar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practice">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      Practice
                    </div>
                  </SelectItem>
                  <SelectItem value="wellness">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      Wellness
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      Other
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newTask.type === "practice" && (
              <div className="space-y-2">
                <Select
                  value={newTask.chapterId}
                  onValueChange={(value) => setNewTask({...newTask, chapterId: value})}
                >
                  <SelectTrigger className="border border-gray-200">
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

            <div className="space-y-2">
              <Input 
                type="number"
                value={newTask.duration}
                onChange={(e) => setNewTask({...newTask, duration: Number(e.target.value)})}
                placeholder="Duration (minutes)"
                min={5}
                max={240}
                className="border border-gray-200"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddTask}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
);
};

export default Calendar;
