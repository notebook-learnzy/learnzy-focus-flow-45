
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface MoodAwareThemeToggleProps {
  className?: string;
}

const MoodAwareThemeToggle = ({ className }: MoodAwareThemeToggleProps) => {
  const [enabled, setEnabled] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("auto");
  
  const handleModeChange = (value: string) => {
    setCurrentTheme(value);
    // In a real implementation, this would change the actual theme
    // by applying CSS classes or variables
  };
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <Label htmlFor="mood-aware-theme">Mood-Aware Theming</Label>
          <p className="text-sm text-muted-foreground">
            Automatically adjust UI colors based on your focus and stress levels
          </p>
        </div>
        <Switch 
          id="mood-aware-theme" 
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>
      
      {enabled && (
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="theme-override">Manual Override</Label>
            <Select value={currentTheme} onValueChange={handleModeChange}>
              <SelectTrigger id="theme-override" className="mt-1">
                <SelectValue placeholder="Select theme mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Based on mood)</SelectItem>
                <SelectItem value="soothing">Soothing (Low contrast)</SelectItem>
                <SelectItem value="focus">Focus (High contrast)</SelectItem>
                <SelectItem value="energizing">Energizing (Vibrant)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 border rounded-md bg-blue-50 border-blue-100">
              <div className="w-full h-3 bg-blue-200 rounded-full mb-2"></div>
              <div className="w-3/4 h-3 bg-blue-300 rounded-full mb-2"></div>
              <div className="w-1/2 h-3 bg-blue-400 rounded-full"></div>
              <p className="text-xs text-center mt-2 text-blue-700">Soothing</p>
            </div>
            <div className="p-4 border rounded-md bg-orange-50 border-orange-100">
              <div className="w-full h-3 bg-orange-200 rounded-full mb-2"></div>
              <div className="w-3/4 h-3 bg-orange-300 rounded-full mb-2"></div>
              <div className="w-1/2 h-3 bg-orange-400 rounded-full"></div>
              <p className="text-xs text-center mt-2 text-orange-700">Energizing</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            When enabled, UI colors will automatically shift based on your latest mood check and focus metrics. 
            High stress triggers soothing colors, while low motivation activates energizing tones.
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodAwareThemeToggle;
