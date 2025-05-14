import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { RitualLog } from "@/types/wellness";

export type AppMode = "institute" | "self-study";
export type MoodState = "calm" | "focused" | "stressed" | "tired" | "energetic";
export type ThemeMode = "auto" | "soothing" | "focus" | "energizing";

type AppContextType = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  focusScore: number;
  setFocusScore: (score: number) => void;
  
  // New additions
  currentMood: MoodState;
  setCurrentMood: (mood: MoodState) => void;
  showMoodCheck: boolean;
  setShowMoodCheck: (show: boolean) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  userStreaks: {
    meditation_days: number;
    high_focus_days: number;
    practice_days: number;
  };
  updateStreak: (type: keyof AppContextType["userStreaks"]) => void;
  ritualCount: number;
  ritualLog: RitualLog[];
  incrementRitual: () => void;
  logRitualResult: (log: RitualLog) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppMode>("self-study");
  const [focusScore, setFocusScore] = useState(75);
  
  // New state additions
  const [currentMood, setCurrentMood] = useState<MoodState>("focused");
  const [showMoodCheck, setShowMoodCheck] = useState(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [userStreaks, setUserStreaks] = useState({
    meditation_days: 0,
    high_focus_days: 0,
    practice_days: 0
  });
  const [ritualCount, setRitualCount] = useState(0);
  const [ritualLog, setRitualLog] = useState<RitualLog[]>([]);

  // Apply theme based on mood or manual selection
  useEffect(() => {
    const applyTheme = () => {
      let activeTheme: ThemeMode = themeMode;
      
      // If auto, determine theme based on mood
      if (themeMode === "auto") {
        if (currentMood === "stressed" || currentMood === "tired") {
          activeTheme = "soothing";
        } else if (currentMood === "energetic") {
          activeTheme = "energizing";
        } else {
          activeTheme = "focus";
        }
      }
      
      // Remove any existing theme classes
      document.documentElement.classList.remove("theme-soothing", "theme-focus", "theme-energizing");
      
      // Apply the appropriate theme class
      document.documentElement.classList.add(`theme-${activeTheme}`);
    };
    
    applyTheme();
  }, [themeMode, currentMood]);

  // Function to update user streaks
  const updateStreak = (type: keyof typeof userStreaks) => {
    setUserStreaks(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const incrementRitual = () => setRitualCount(c => c + 1);
  const logRitualResult = (log: RitualLog) => setRitualLog(l => [...l, log]);

  return (
    <AppContext.Provider 
      value={{ 
        mode, 
        setMode, 
        focusScore, 
        setFocusScore, 
        currentMood,
        setCurrentMood,
        showMoodCheck,
        setShowMoodCheck,
        themeMode,
        setThemeMode,
        userStreaks,
        updateStreak,
        ritualCount,
        ritualLog,
        incrementRitual,
        logRitualResult
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
