
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { User, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function AppLayout() {
  const { toast } = useToast();
  const location = useLocation();
  
  const showNotification = () => {
    toast({
      title: "New wellness tip!",
      description: "Taking short breaks during study sessions can improve focus and reduce stress.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background h-16 w-full flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-lg">
                Campus Wellness Monitor
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="relative"
              >
                <Link to="/notifications">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Link>
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
