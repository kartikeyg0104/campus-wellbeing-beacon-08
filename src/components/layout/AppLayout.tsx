
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { User, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export function AppLayout() {
  const { toast } = useToast();
  const location = useLocation();
  
  const showNotification = () => {
    toast({
      title: "New wellness tip!",
      description: "Taking short breaks during study sessions can improve focus and reduce stress.",
    });
  };

  const notificationCount = 3;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background h-16 w-full flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-lg">
                Campus Wellness Monitor
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={showNotification}
                className="relative"
              >
                <Bell size={20} />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {notificationCount}
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/settings">
                  <Settings size={20} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User size={20} />
                </Link>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
