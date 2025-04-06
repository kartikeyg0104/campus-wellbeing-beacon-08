
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Activity, 
  Calendar, 
  BarChart2, 
  MessageSquare,
  Book,
  Lightbulb,
  Medal,
  PenTool,
  ChevronLeft,
  Target,
  Trophy,
  Map,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import { XpIndicator } from '../gamification/XpIndicator';
import { StreakCounter } from '../gamification/StreakCounter';

const mainMenuItems = [
  { title: 'Dashboard', icon: Home, path: '/app/dashboard' },
  { title: 'Mood Tracker', icon: Activity, path: '/app/mood' },
  { title: 'Habits', icon: Calendar, path: '/app/habits' },
  { title: 'Analytics', icon: BarChart2, path: '/app/analytics' },
];

const resourcesMenuItems = [
  { title: 'Journal', icon: PenTool, path: '/app/journal' },
  { title: 'Resources', icon: Lightbulb, path: '/app/resources' },
  { title: 'Chat Support', icon: MessageSquare, path: '/app/chat' },
];

const gamificationMenuItems = [
  { title: 'Quests', icon: Target, path: '/app/quests' },
  { title: 'Achievements', icon: Medal, path: '/app/achievements' },
  { title: 'Wellness Journey', icon: Map, path: '/app/journey' },
  { title: 'Leaderboard', icon: Trophy, path: '/app/leaderboard' },
];

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AppSidebar({ isOpen, setIsOpen }: AppSidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <Sidebar 
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transition-transform transform-gpu duration-300 ease-in-out border-r",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center animate-pulse-gentle">
            <span className="text-primary-foreground font-semibold">WB</span>
          </div>
          <span className="font-semibold tracking-tight">Wellness Beacon</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCloseSidebar}
          className="lg:hidden"
        >
          <ChevronLeft size={18} />
        </Button>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <XpIndicator />
        <StreakCounter />
      </div>
      
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 mx-3 px-3 py-2 rounded-lg transition-all",
                        isActive(item.path) 
                          ? "bg-primary/15 text-primary font-medium" 
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon size={18} className={isActive(item.path) ? "text-primary" : "text-foreground/70"} />
                      <span>{item.title}</span>
                      {isActive(item.path) && (
                        <div className="absolute w-1 h-5 right-0 bg-primary rounded-full animate-pulse-gentle"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 mx-3 px-3 py-2 rounded-lg transition-all",
                        isActive(item.path) 
                          ? "bg-primary/15 text-primary font-medium" 
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon size={18} className={isActive(item.path) ? "text-primary" : "text-foreground/70"} />
                      <span>{item.title}</span>
                      {isActive(item.path) && (
                        <div className="absolute w-1 h-5 right-0 bg-primary rounded-full animate-pulse-gentle"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
            Gamification
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {gamificationMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 mx-3 px-3 py-2 rounded-lg transition-all",
                        isActive(item.path) 
                          ? "bg-primary/15 text-primary font-medium" 
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon size={18} className={isActive(item.path) ? "text-primary" : "text-foreground/70"} />
                      <span>{item.title}</span>
                      {isActive(item.path) && (
                        <div className="absolute w-1 h-5 right-0 bg-primary rounded-full animate-pulse-gentle"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className={cn(
            "rounded-xl p-4 bg-gradient-to-br",
            theme === 'dark' 
              ? "from-primary/20 to-accent/20" 
              : "from-accent/50 to-accent/20"
          )}>
            <h4 className="font-medium text-sm mb-2">Need support?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Access professional help whenever you need it.
            </p>
            <Button size="sm" variant="secondary" className="w-full text-xs" asChild>
              <Link to="/app/chat">
                <MessageSquare size={14} className="mr-2" />
                Start Chat
              </Link>
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
