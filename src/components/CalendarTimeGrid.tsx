
import { format, isSameDay, addDays, setHours, setMinutes, isToday, isThisHour, differenceInMinutes } from "date-fns";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Task } from "@/types";

type CalendarTimeGridProps = {
  weekStart: Date;
  selectedDate: Date;
  tasks: Task[];
  onSelectDate: (date: Date) => void;
  viewMode: "week" | "day";
};

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 21 PM

const COLORS: Record<string, string> = {
  practice: "bg-learnzy-orange",
  wellness: "bg-learnzy-mint",
  custom: "bg-learnzy-purple",
};

const CalendarTimeGrid: React.FC<CalendarTimeGridProps> = ({
  weekStart,
  selectedDate,
  tasks,
  onSelectDate,
  viewMode
}) => {
  const now = new Date();
  const gridRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current hour when mounting
  useEffect(() => {
    if (gridRef.current && isToday(selectedDate)) {
      const hour = now.getHours() - 7;
      if (hour > 0) {
        gridRef.current.scrollTop = hour * 60;
      }
    }
  }, [selectedDate]);

  const renderTaskBlocks = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const dayTasks = tasks.filter(t => t.date === dateStr);

    return dayTasks.map(task => {
      // Position by time (in minutes from 7 AM)
      const [h, m] = task.time.split(":").map(Number);
      const top = ((h - 7) * 60 + m); // px
      const height = Math.max(task.duration, 30); // at least 30 min visually

      return (
        <div
          key={task.id}
          className={cn(
            "absolute left-2 right-2 rounded-md text-xs px-2 py-1 text-white shadow",
            COLORS[task.type] || "bg-gray-300",
            "cursor-pointer hover:opacity-90 overflow-hidden"
          )}
          style={{
            top,
            height,
            zIndex: 10,
          }}
          title={task.title}
        >
          <div className={cn("truncate font-medium")}>{task.title}</div>
          <div className="opacity-80">{task.time} • {task.duration} min</div>
        </div>
      );
    });
  };

  // "Now" indicator
  const renderNowIndicator = (day: Date) => {
    if (!isToday(day)) return null;
    const minutes = now.getHours() * 60 + now.getMinutes();
    const offset = minutes - 420; // 7 AM = 0 px
    if (offset < 0) return null;
    return (
      <div
        className="absolute left-0 right-0 h-0.5 bg-red-500"
        style={{ top: offset }}
      >
        <div className="absolute left-[-16px] top-[-4px] w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
      </div>
    );
  };

  // Render grid for days in week or just selected day
  const days =
    viewMode === "week"
      ? Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))
      : [selectedDate];

  return (
    <div className="flex-1 flex flex-col relative overflow-x-auto">
      <div className="flex border-b bg-white shadow-sm z-10">
        <div className="w-14" /> {/* Time gutter */}
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 py-2 px-1 text-center cursor-pointer border-r last:border-r-0 border-gray-100",
              isSameDay(day, selectedDate) ? "bg-blue-50" : "bg-white"
            )}
            onClick={() => onSelectDate(day)}
          >
            <div className="text-xs text-gray-400">{format(day, "EEE")}</div>
            <div className={cn(
              "text-base font-semibold flex items-center justify-center w-8 h-8 mx-auto",
              isToday(day)
                ? "bg-learnzy-purple text-white rounded-full"
                : undefined
            )}>
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex min-h-[700px] overflow-auto relative"
        ref={gridRef}
        style={{ background: "#fcfcfd" }}
      >
        {/* Time gutter */}
        <div className="flex flex-col w-14 border-r border-gray-100 relative z-10 bg-white">
          {HOURS.map(hour => (
            <div
              key={hour}
              className="h-12 text-xs text-right pr-2 text-gray-400 pt-1"
              style={{ minHeight: 48 }}
            >
              {hour < 12
                ? `${hour} AM`
                : hour === 12
                  ? "12 PM"
                  : `${hour - 12} PM`}
            </div>
          ))}
        </div>
        {/* Day columns */}
        <div className="flex-1 flex relative z-0">
          {days.map((day, dayIdx) => (
            <div
              key={dayIdx}
              className="flex-1 border-r last:border-r-0 border-gray-100 relative"
              style={{ minWidth: 156, height: HOURS.length * 48 }}
            >
              {/* Grid lines */}
              {HOURS.map((_, hIdx) => (
                <div
                  key={hIdx}
                  className="border-t border-dashed border-gray-100 absolute left-0 right-0"
                  style={{ top: hIdx * 48, height: 0 }}
                />
              ))}
              {/* Now indicator */}
              {renderNowIndicator(day)}
              {/* Tasks */}
              <div className="absolute left-0 right-0 top-0" style={{ height: HOURS.length * 48 }}>
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
