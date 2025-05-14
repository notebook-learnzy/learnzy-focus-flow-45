
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  range: "week" | "month" | "custom";
  onChange: (range: "week" | "month" | "custom") => void;
  customDisabled?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ range, onChange, customDisabled }) => {
  return (
    <div className="flex gap-2 mb-5">
      <Button 
        variant={range === "week" ? "default" : "outline"} 
        onClick={() => onChange("week")}
        className={range === "week" ? "font-bold shadow-md" : ""}
      >
        Week
      </Button>
      <Button 
        variant={range === "month" ? "default" : "outline"} 
        onClick={() => onChange("month")}
        className={range === "month" ? "font-bold shadow-md" : ""}
      >
        Month
      </Button>
      <Button 
        variant={range === "custom" ? "default" : "outline"} 
        onClick={() => onChange("custom")}
        disabled={customDisabled}
        className={range === "custom" ? "font-bold shadow-md" : ""}
      >
        Custom
      </Button>
    </div>
  );
};

export default FilterBar;
