
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Subject from "./pages/Subject";
import Practice from "./pages/Practice";
import Wellness from "./pages/Wellness";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import SubjectClasses from "./pages/SubjectClasses";
import BiologyChapters from "./pages/BiologyChapters";
import BiologyChapterDetail from "./pages/BiologyChapterDetail";
import MeditationRitual from "./pages/MeditationRitual";
import PerformanceReport from "./pages/PerformanceReport";
import MistakeNotebook from "./pages/MistakeNotebook";
import Social from "./pages/Social";
import MoodCheckModal from "./components/MoodCheckModal";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MoodCheckModal />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/subject/:id" element={<Subject />} />
              <Route path="/practice/:chapterId" element={<Practice />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/mistake-notebook" element={<MistakeNotebook />} />
              <Route path="/social" element={<Social />} />
              
              {/* Updated Subject Routes */}
              <Route path="/:subjectId" element={<SubjectClasses />} />
              <Route path="/:subjectId/class/:classId" element={<BiologyChapters />} />
              <Route path="/:subjectId/chapter/:chapterId" element={<BiologyChapterDetail />} />
              <Route path="/practice/:subjectId/:chapterId/set/:setId/ritual" element={<MeditationRitual />} />
              <Route path="/practice/:subjectId/:chapterId/set/:setId/report" element={<PerformanceReport />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
