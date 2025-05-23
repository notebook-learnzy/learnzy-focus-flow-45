
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { Calendar as MiniCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type CalendarSidebarProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onCreate: () => void;
};

const CalendarSidebar = ({
  selectedDate,
  onSelectDate,
  onCreate,
}: CalendarSidebarProps) => {
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  return (
    <aside className="w-64 min-w-[256px] hidden md:flex flex-col bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-100">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm rounded-full py-3"
          onClick={onCreate}
        >
          <Plus className="mr-2" size={20} />
          Create
        </Button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">
            {format(calendarMonth, "MMMM yyyy")}
          </h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <MiniCalendar
          selected={selectedDate}
          onSelect={date => date && onSelectDate(date)}
          mode="single"
          month={calendarMonth}
          onMonthChange={setCalendarMonth}
          className="rounded-lg border border-gray-200 shadow-sm"
          classNames={{
            head_cell: "text-xs font-medium text-gray-500 w-8 h-8",
            cell: "text-center text-sm relative h-8 w-8 hover:bg-blue-50 rounded",
            day: "h-8 w-8 p-0 text-sm hover:bg-blue-100 hover:text-blue-900 rounded",
            day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
            day_today: "bg-blue-100 text-blue-900 font-semibold",
          }}
        />
      </div>

      <div className="px-4 py-3 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-900 mb-3">My calendars</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input type="checkbox" checked readOnly className="h-4 w-4 text-blue-600 rounded border-gray-300" />
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-gray-700">Personal</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input type="checkbox" checked readOnly className="h-4 w-4 text-green-600 rounded border-gray-300" />
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">Wellness</span>
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input type="checkbox" readOnly className="h-4 w-4 text-gray-400 rounded border-gray-300" />
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span className="text-gray-700">Other</span>
          </label>
        </div>
      </div>

      <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-100">
        <span>© Learnzy Calendar • Terms • Privacy</span>
      </div>
    </aside>
  );
};

export default CalendarSidebar;
