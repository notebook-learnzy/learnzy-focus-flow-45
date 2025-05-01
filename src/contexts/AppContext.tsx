
import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppMode = "institute" | "self-study";

type AppContextType = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  focusScore: number;
  setFocusScore: (score: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppMode>("self-study");
  const [focusScore, setFocusScore] = useState(75);

  return (
    <AppContext.Provider value={{ mode, setMode, focusScore, setFocusScore }}>
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
