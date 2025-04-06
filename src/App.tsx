
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import { GamificationProvider } from "./context/GamificationContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeProvider";

// Auth pages
import LoginPage from "./pages/LoginPage";

// App pages
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
import QuestsPage from "./pages/QuestsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import WellnessJourneyPage from "./pages/WellnessJourneyPage";

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
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <GamificationProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Login Route */}
                <Route path="/" element={<LoginPage />} />
                
                {/* App Routes (Protected) */}
                <Route element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/app" element={<Dashboard />} />
                  <Route path="/app/mood" element={<MoodTrackerPage />} />
                  <Route path="/app/habits" element={<HabitsPage />} />
                  <Route path="/app/journal" element={<JournalPage />} />
                  <Route path="/app/analytics" element={<AnalyticsPage />} />
                  <Route path="/app/chat" element={<ChatPage />} />
                  <Route path="/app/achievements" element={<AchievementsPage />} />
                  <Route path="/app/quests" element={<QuestsPage />} />
                  <Route path="/app/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/app/journey" element={<WellnessJourneyPage />} />
                  <Route path="/app/notifications" element={<NotificationsPage />} />
                  <Route path="/app/settings" element={<SettingsPage />} />
                  <Route path="/app/profile" element={<ProfilePage />} />
                  
                  {/* Resources and nested resource routes */}
                  <Route path="/app/resources" element={<ResourcesPage />} />
                  <Route path="/app/resources/managing-exam-stress" element={<ManagingExamStressPage />} />
                  <Route path="/app/resources/mindful-meditation" element={<MindfulMeditationPage />} />
                  <Route path="/app/resources/sleep-habits" element={<SleepHabitsPage />} />
                  <Route path="/app/resources/breathing-exercise" element={<BreathingExercisePage />} />
                  <Route path="/app/resources/stress-management" element={<StressManagementPage />} />
                  <Route path="/app/resources/brain-foods" element={<BrainFoodsPage />} />
                  <Route path="/app/resources/better-sleep" element={<SleepHabitsPage />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </GamificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
