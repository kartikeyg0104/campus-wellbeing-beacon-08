
import React, { useState } from 'react';
import { 
  BellRing, 
  Bell, 
  BellOff,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: string;
  title: string;
  description: string;
  date: Date;
  read: boolean;
  category: 'wellness' | 'achievement' | 'system';
  priority: 'high' | 'medium' | 'low';
}

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Wellness Tip',
    description: 'Taking short breaks during study sessions can improve focus and reduce stress.',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    category: 'wellness',
    priority: 'medium'
  },
  {
    id: '2',
    title: 'Achievement Unlocked',
    description: 'Congratulations! You've completed 7 consecutive days of mood tracking.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: true,
    category: 'achievement',
    priority: 'high'
  },
  {
    id: '3',
    title: 'New Resource Available',
    description: 'We've added new meditation sessions to the resources section.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    category: 'system',
    priority: 'low'
  },
  {
    id: '4',
    title: 'Weekly Wellness Summary',
    description: 'Your wellness score improved by 15% this week. Check the analytics page for details.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    category: 'wellness',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Chat Support Update',
    description: 'Our support team has responded to your recent inquiry.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: false,
    category: 'system',
    priority: 'high'
  }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [filterBy, setFilterBy] = useState<'all' | 'unread' | 'read'>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  // Filter notifications based on current filter
  const filteredNotifications = notifications.filter(notification => {
    if (filterBy === 'all') return true;
    if (filterBy === 'unread') return !notification.read;
    if (filterBy === 'read') return notification.read;
    return true;
  });

  // Sort notifications based on current sort direction
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortDirection === 'desc') {
      return b.date.getTime() - a.date.getTime();
    } else {
      return a.date.getTime() - b.date.getTime();
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // Format notification date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Get category badge color
  const getCategoryBadge = (category: Notification['category']) => {
    switch (category) {
      case 'wellness':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Wellness</Badge>;
      case 'achievement':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">Achievement</Badge>;
      case 'system':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">System</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated on your wellness journey and campus resources.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-[300px]" onValueChange={(value) => setFilterBy(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleSortDirection}>
            {sortDirection === 'desc' ? <ArrowDown className="mr-1 h-4 w-4" /> : <ArrowUp className="mr-1 h-4 w-4" />}
            {sortDirection === 'desc' ? 'Newest first' : 'Oldest first'}
          </Button>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>

      {sortedNotifications.length === 0 ? (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>No notifications found</AlertTitle>
          <AlertDescription>
            You don't have any {filterBy !== 'all' ? filterBy : ''} notifications at the moment.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {sortedNotifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? 'bg-background' : 'bg-muted/20 border-l-4 border-l-primary'}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center">
                      {!notification.read && <BellRing className="h-4 w-4 mr-2 text-primary animate-pulse" />}
                      {notification.title}
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                      {getCategoryBadge(notification.category)}
                      <CardDescription>{formatDate(notification.date)}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {!notification.read && (
                        <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => setNotifications(notifications.filter(n => n.id !== notification.id))}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p>{notification.description}</p>
              </CardContent>
              {!notification.read && (
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                    Mark as read
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
