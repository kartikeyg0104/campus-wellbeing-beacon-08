
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Clock, CheckCircle, Trophy } from 'lucide-react';
import { Quest } from '@/types/gamification';
import { useGamification } from '@/context/GamificationContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface QuestCardProps {
  quest: Quest;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const { completeQuest } = useGamification();
  
  const handleComplete = () => {
    if (!quest.completed) {
      completeQuest(quest.id);
    }
  };
  
  const getQuestTypeBadge = () => {
    switch (quest.type) {
      case 'daily':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">Daily</Badge>;
      case 'weekly':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/30">Weekly</Badge>;
      case 'challenge':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/30">Challenge</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
    >
      <Card className={cn(
        "overflow-hidden transition-all",
        quest.completed 
          ? "border-green-500/30 bg-green-500/5" 
          : "border-quest/20 bg-quest/5"
      )}>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-start gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {getQuestTypeBadge()}
                {quest.badgeReward && (
                  <Badge variant="outline" className="bg-badge/10 text-badge border-badge/30">
                    <Trophy size={12} className="mr-1" />
                    Badge
                  </Badge>
                )}
              </div>
              <h3 className="font-medium text-foreground">{quest.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
            </div>
          </div>
          
          {quest.deadline && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={14} />
              <span>
                {new Date(quest.deadline).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          )}
          
          <div className="space-y-2">
            {quest.total > 1 && (
              <>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{quest.progress}/{quest.total}</span>
                </div>
                <Progress value={(quest.progress / quest.total) * 100} className="h-1" />
              </>
            )}
            
            <div className="flex gap-2 items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-sm">
                <Sparkles size={14} className="text-xp" />
                <span className="font-medium">{quest.xpReward} XP</span>
              </div>
              
              <Button 
                size="sm" 
                variant={quest.completed ? "outline" : "default"} 
                onClick={handleComplete} 
                disabled={quest.completed}
                className={quest.completed ? "pointer-events-none" : ""}
              >
                {quest.completed ? (
                  <>
                    <CheckCircle size={14} className="mr-1" />
                    Completed
                  </>
                ) : (
                  "Complete"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
