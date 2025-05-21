
import React, { createContext, useContext, useState } from "react";

type CustomPracticeSession = {
  subject: string;
  classId: string;
  chapter: string;
  selectedTopics: string[];
  questions: any[];
  results: any | null;
};

type CustomPracticeContextType = {
  session: CustomPracticeSession | null;
  setCustomPracticeSession: (data: CustomPracticeSession | null) => void;
  setCustomResults: (results: any) => void;
};

const CustomPracticeTestContext = createContext<CustomPracticeContextType>({
  session: null,
  setCustomPracticeSession: () => {},
  setCustomResults: () => {},
});

export const useCustomPracticeTest = () => useContext(CustomPracticeTestContext);

export const CustomPracticeTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<CustomPracticeSession | null>(null);

  const setCustomPracticeSession = (data: CustomPracticeSession | null) => setSession(data);
  const setCustomResults = (results: any) => {
    if (session) setSession({ ...session, results });
  };

  return (
    <CustomPracticeTestContext.Provider
      value={{
        session,
        setCustomPracticeSession,
        setCustomResults
      }}
    >
      {children}
    </CustomPracticeTestContext.Provider>
  );
};
