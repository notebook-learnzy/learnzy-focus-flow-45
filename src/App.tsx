
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Subject from "./pages/Subject";
import SubjectClass from "./pages/SubjectClass";
import ChapterList from "./pages/ChapterList";
import Practice from "./pages/Practice";
import PracticeRitual from "./pages/PracticeRitual";
import PracticeReport from "./pages/PracticeReport";
import Wellness from "./pages/Wellness";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/subject/:id" element={<Subject />} />
              <Route path="/subject/:id/class/:classId" element={<SubjectClass />} />
              <Route path="/subject/:id/class/:classId" element={<ChapterList />} />
              <Route path="/practice/:chapterId" element={<Practice />} />
              <Route path="/practice/:subjectId/:classId/:chapterId/set/:setId/ritual" element={<PracticeRitual />} />
              <Route path="/practice/:subjectId/:classId/:chapterId/set/:setId" element={<Practice />} />
              <Route path="/practice/:subjectId/:classId/:chapterId/set/:setId/report" element={<PracticeReport />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/assistant" element={<Assistant />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
