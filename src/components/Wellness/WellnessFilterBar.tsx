
import React from "react";
import { Button } from "@/components/ui/button";

type FilterType = "week" | "month" | "custom";
interface Props {
  selected: FilterType;
  setSelected: (f: FilterType) => void;
}

const options: { label: string; value: FilterType }[] = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Custom", value: "custom" }
];

export default function WellnessFilterBar({ selected, setSelected }: Props) {
  return (
    <div className="w-full flex flex-wrap items-center gap-2 mb-4">
      {options.map(option => (
        <Button
          key={option.value}
          size="sm"
          className={
            "rounded-full px-4 py-1 font-semibold " +
            (selected === option.value
              ? "bg-learnzy-purple text-white"
              : "bg-white border border-gray-300 text-gray-700")
          }
          onClick={() => setSelected(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
