
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import HabitsPage from "./pages/HabitsPage";
import ResourcesPage from "./pages/ResourcesPage";
import JournalPage from "./pages/JournalPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ChatPage from "./pages/ChatPage";
import AchievementsPage from "./pages/AchievementsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ManagingExamStressPage from "./pages/ManagingExamStressPage";
import MindfulMeditationPage from "./pages/MindfulMeditationPage";
import SleepHabitsPage from "./pages/SleepHabitsPage";
import BreathingExercisePage from "./pages/BreathingExercisePage";
import StressManagementPage from "./pages/StressManagementPage";
import BrainFoodsPage from "./pages/BrainFoodsPage";
import { ThemeProvider } from "./context/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/mood" element={<MoodTrackerPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/managing-exam-stress" element={<ManagingExamStressPage />} />
              <Route path="/resources/mindful-meditation" element={<MindfulMeditationPage />} />
              <Route path="/resources/sleep-habits" element={<SleepHabitsPage />} />
              <Route path="/resources/breathing-exercise" element={<BreathingExercisePage />} />
              <Route path="/resources/stress-management" element={<StressManagementPage />} />
              <Route path="/resources/brain-foods" element={<BrainFoodsPage />} />
              <Route path="/resources/better-sleep" element={<SleepHabitsPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
