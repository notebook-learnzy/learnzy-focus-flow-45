
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar as MiniCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

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
  return (
    <aside className="w-72 min-w-[256px] hidden md:flex flex-col bg-white border-r border-gray-100 h-full p-4">
      <Button
        className="mb-4 bg-learnzy-purple text-white flex items-center"
        onClick={onCreate}
      >
        <Plus className="mr-2" size={18} />
        Create
      </Button>
      <MiniCalendar
        selected={selectedDate}
        onSelect={date => date && onSelectDate(date)}
        mode="single"
        className="rounded-md border"
      />
      <div className="mt-6">
        <span className="font-semibold text-gray-600 mb-2 block">
          My calendars
        </span>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="accent-learnzy-purple" />
            <span>Personal</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="accent-learnzy-mint" />
            <span>Wellness</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" readOnly />
            <span>Other</span>
          </label>
        </div>
      </div>
      <div className="mt-auto text-xs text-gray-400 pt-8">
        <span>© Learnzy Calendar • Terms • Privacy</span>
      </div>
    </aside>
  );
};

export default CalendarSidebar;
