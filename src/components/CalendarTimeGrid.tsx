
import { format, isSameDay, addDays, isToday, parseISO } from "date-fns";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Task } from "@/types";
import { Clock, MapPin } from "lucide-react";

type CalendarTimeGridProps = {
  weekStart: Date;
  selectedDate: Date;
  tasks: Task[];
  onSelectDate: (date: Date) => void;
  viewMode: "week" | "day";
  onAddTaskSlot?: (date: string, time: string) => void;
};

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM

const COLORS: Record<string, { bg: string; border: string; text: string }> = {
  practice: { bg: "bg-blue-500", border: "border-blue-600", text: "text-white" },
  wellness: { bg: "bg-green-500", border: "border-green-600", text: "text-white" },
  custom: { bg: "bg-purple-500", border: "border-purple-600", text: "text-white" },
};

const CalendarTimeGrid: React.FC<CalendarTimeGridProps> = ({
  weekStart,
  selectedDate,
  tasks,
  onSelectDate,
  viewMode,
  onAddTaskSlot
}) => {
  const now = new Date();
  const gridRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current hour when mounting
  useEffect(() => {
    if (gridRef.current && isToday(selectedDate)) {
      const hour = now.getHours();
      const hourIndex = hour - 7;
      if (hourIndex > 0) {
        gridRef.current.scrollTop = hourIndex * 60;
      }
    }
  }, [selectedDate]);

  const renderTaskBlocks = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const dayTasks = tasks.filter(t => t.date === dateStr);

    return dayTasks.map(task => {
      const [h, m] = task.time.split(":").map(Number);
      const top = ((h - 7) * 60 + m);
      const height = Math.max(task.duration, 30);
      const colors = COLORS[task.type] || COLORS.custom;

      return (
        <div
          key={task.id}
          className={cn(
            "absolute left-1 right-1 rounded-md text-xs px-3 py-2 shadow-sm border cursor-pointer hover:shadow-md transition-all",
            colors.bg,
            colors.border,
            colors.text,
            "overflow-hidden group"
          )}
          style={{
            top,
            height: Math.max(height, 40),
            zIndex: 10,
          }}
          title={task.title}
        >
          <div className="font-medium truncate">{task.title}</div>
          <div className="flex items-center gap-1 mt-1 opacity-90">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{task.time}</span>
            {task.location && (
              <>
                <MapPin className="h-3 w-3 ml-1" />
                <span className="text-xs truncate">{task.location}</span>
              </>
            )}
          </div>
          {task.description && height > 50 && (
            <div className="text-xs mt-1 opacity-75 truncate">{task.description}</div>
          )}
        </div>
      );
    });
  };

  const renderNowIndicator = (day: Date) => {
    if (!isToday(day)) return null;
    const minutes = now.getHours() * 60 + now.getMinutes();
    const calendarStartMinutes = 7 * 60;
    const offset = minutes - calendarStartMinutes;
    if (offset < 0 || offset > (HOURS.length * 60)) return null;
    
    return (
      <div
        className="absolute left-0 right-0 z-20 flex items-center"
        style={{ top: offset }}
      >
        <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
        <div className="flex-1 h-0.5 bg-red-500"></div>
      </div>
    );
  };

  // Render grid for days in week or just selected day
  const days =
    viewMode === "week"
      ? Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))
      : [selectedDate];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
      {/* Header with days */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="w-16 border-r border-gray-200 bg-gray-50"></div>
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 py-4 px-2 text-center cursor-pointer border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors",
              isSameDay(day, selectedDate) ? "bg-blue-50" : "bg-white"
            )}
            onClick={() => onSelectDate(day)}
          >
            <div className="text-xs text-gray-500 uppercase font-medium">
              {format(day, "EEE")}
            </div>
            <div className={cn(
              "text-2xl font-normal flex items-center justify-center w-10 h-10 mx-auto mt-1 rounded-full",
              isToday(day)
                ? "bg-blue-600 text-white"
                : isSameDay(day, selectedDate)
                ? "text-blue-600 bg-blue-100"
                : "text-gray-900 hover:bg-gray-100"
            )}>
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div
        className="flex-1 flex overflow-auto relative"
        ref={gridRef}
        style={{ background: "#fafafa" }}
      >
        {/* Time gutter */}
        <div className="flex flex-col w-16 border-r border-gray-200 bg-white sticky left-0 z-20">
          {HOURS.map(hour => (
            <div
              key={hour}
              className="h-15 text-xs text-right pr-2 text-gray-500 flex items-start pt-1 border-b border-gray-100"
              style={{ minHeight: 60 }}
            >
              {hour < 12
                ? `${hour}:00`
                : hour === 12
                ? "12:00"
                : `${hour - 12}:00`}
              <span className="ml-1 text-xs">{hour < 12 ? 'AM' : 'PM'}</span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        <div className="flex-1 flex relative">
          {days.map((day, dayIdx) => (
            <div
              key={dayIdx}
              className="flex-1 border-r border-gray-200 last:border-r-0 relative bg-white"
              style={{ minWidth: viewMode === "week" ? 140 : "auto", height: HOURS.length * 60 }}
            >
              {/* Hour grid lines */}
              {HOURS.map((_, hIdx) => (
                <div
                  key={hIdx}
                  className="border-b border-gray-100 absolute left-0 right-0 hover:bg-blue-25 cursor-pointer group"
                  style={{ top: hIdx * 60, height: 60 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddTaskSlot) {
                      const time = `${String(HOURS[hIdx]).padStart(2, "0")}:00`;
                      onAddTaskSlot(format(day, "yyyy-MM-dd"), time);
                    }
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded m-1">
                    Click to add event
                  </div>
                </div>
              ))}

              {/* Half-hour lines */}
              {HOURS.map((_, hIdx) => (
                <div
                  key={`half-${hIdx}`}
                  className="border-b border-dashed border-gray-100 absolute left-0 right-0"
                  style={{ top: hIdx * 60 + 30, height: 0 }}
                />
              ))}

              {/* Now indicator */}
              {renderNowIndicator(day)}

              {/* Tasks */}
              <div className="absolute left-0 right-0 top-0" style={{ height: HOURS.length * 60 }}>
                {renderTaskBlocks(day)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarTimeGrid;
