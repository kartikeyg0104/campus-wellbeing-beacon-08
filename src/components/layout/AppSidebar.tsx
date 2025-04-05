
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Activity, 
  Calendar,, 
  BarChart2, 
  MessageSquare,
  Book,
  Lightbulb,
  Medal
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainMenuItems = [
  { title: 'Dashboard', icon: Home, path: '/' },
  { title: 'Mood Tracker', icon: Activity, path: '/mood' },
  { title: 'Habits', icon: Calendar, path: '/habits' },
  { title: 'Analytics', icon: BarChart2, path: '/analytics' },
];

const resourcesMenuItems = [
  { title: 'Journal', icon: Book, path: '/journal' },
  { title: 'Resources', icon: Lightbulb, path: '/resources' },
  { title: 'Chat Support', icon: MessageSquare, path: '/chat' },
  { title: 'Achievements', icon: Medal, path: '/achievements' },
];

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <div className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">WB</span>
          </div>
          <span className="font-semibold">Wellness Beacon</span>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive(item.path) && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        isActive(item.path) && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
