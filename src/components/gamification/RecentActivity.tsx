
import React from 'react';
import { useGamification } from '@/context/GamificationContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Sparkles, Clock } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const { gameState } = useGamification();
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.round(diffMs / 1000);
    const diffMins = Math.round(diffSecs / 60);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    
    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest wellness achievements and rewards</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {gameState.recentEvents.length > 0 ? (
          <div className="divide-y divide-border/50">
            {gameState.recentEvents.map((event) => (
              <div key={event.id} className="py-2 px-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-xp/10 text-xp mt-0.5 shrink-0">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        <span className="text-xp">+{event.amount} XP</span> {event.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock size={12} />
                        <span>{formatRelativeTime(new Date(event.timestamp))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Sparkles size={24} className="mb-2" />
            <p>No activity yet</p>
            <p className="text-sm">Complete wellness activities to earn XP</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
