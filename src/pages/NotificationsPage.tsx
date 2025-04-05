
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  read: boolean;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch(type) {
    case 'info': return Info;
    case 'success': return CheckCircle;
    case 'warning': return AlertTriangle;
    case 'reminder': return Calendar;
  }
};

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New wellness tip available',
    message: 'Check out our latest tip on managing study stress during finals week.',
    timestamp: '2025-04-05T10:30:00',
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'Mood tracking streak achieved!',
    message: 'Congratulations on tracking your mood for 7 days in a row!',
    timestamp: '2025-04-04T14:15:00',
    type: 'success',
    read: true
  },
  {
    id: '3',
    title: 'Haven\'t tracked your mood today',
    message: 'Remember to take a moment to record how you\'re feeling today.',
    timestamp: '2025-04-04T09:00:00',
    type: 'reminder',
    read: false
  },
  {
    id: '4',
    title: 'Wellness workshop tomorrow',
    message: 'Don\'t forget about the stress management workshop at 3 PM tomorrow in the Student Center.',
    timestamp: '2025-04-03T16:20:00',
    type: 'warning',
    read: true
  },
  {
    id: '5',
    title: 'Your journal entry was saved',
    message: 'Your reflection on academic progress has been saved successfully.',
    timestamp: '2025-04-02T20:45:00',
    type: 'success',
    read: true
  }
];

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important information and reminders.
          </p>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all" className="relative">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 shrink-0 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="warning">Warnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const NotificationIcon = getNotificationIcon(notification.type);
                const formattedDate = new Date(notification.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                return (
                  <Card key={notification.id} className={notification.read ? 'bg-background' : 'bg-muted/30'}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full p-1.5 ${
                            notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'success' ? 'bg-green-100 text-green-600' :
                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            <NotificationIcon className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-base">{notification.title}</CardTitle>
                        </div>
                        <span className="text-xs text-muted-foreground">{formattedDate}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{notification.message}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No notifications found</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                You don't have any notifications in this category yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
