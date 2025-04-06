
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { 
  User, 
  Bell, 
  Settings, 
  Moon, 
  Sun, 
  LogOut, 
  ChevronRight,
  Menu,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppLayout() {
  const { toast } = useToast();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);
  
  const showNotification = () => {
    toast({
      title: "New wellness tip!",
      description: "Taking short breaks during study sessions can improve focus and reduce stress.",
    });
  };

  const notificationCount = 3;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
  };

  // Get current page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isSidebarOpen && !isMobile ? "ml-64" : "ml-0"
        )}>
          <header className="border-b bg-card/95 backdrop-blur-md h-16 w-full flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="lg:hidden text-card-foreground hover:bg-muted"
              >
                <Menu size={20} />
              </Button>
              
              <div className="flex items-center gap-2">
                <h1 className="font-medium text-lg hidden md:block text-card-foreground">
                  {getPageTitle()}
                </h1>
                <ChevronRight size={16} className="text-muted-foreground hidden md:block" />
                <div className="text-sm text-muted-foreground hidden md:block">Campus Wellness Beacon</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search resources, tips, or tools..." 
                className="pl-10 bg-background/60 dark:bg-background/30 border-muted rounded-full"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="text-card-foreground hover:text-card-foreground hover:bg-muted"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={showNotification}
                className="relative text-card-foreground hover:text-card-foreground hover:bg-muted"
              >
                <Bell size={18} />
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-border bg-muted/50 hover:bg-muted">
                    <User size={18} className="text-card-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border border-border/60 bg-card/95 backdrop-blur-sm">
                  <DropdownMenuLabel className="text-card-foreground">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/60" />
                  <DropdownMenuItem asChild className="hover:bg-muted focus:bg-muted text-card-foreground">
                    <Link to="/app/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-muted focus:bg-muted text-card-foreground">
                    <Link to="/app/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/60" />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
            <div className="mx-auto max-w-7xl animate-slide-in-bottom">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
