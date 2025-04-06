
import React, { useState } from 'react';
import { PageTitle } from '@/components/ui/page-title';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Trophy, 
  Medal,
  Crown,
  Users,
  CalendarCheck
} from "lucide-react";
import { useGamification } from '@/context/GamificationContext';
import { useAuth } from '@/context/AuthContext';

// Mock leaderboard data
const leaderboardData = [
  { id: 1, name: "Alex Johnson", xp: 4250, level: 7, badges: 12, streak: 14, avatar: "" },
  { id: 2, name: "Sam Wilson", xp: 3890, level: 6, badges: 9, streak: 8, avatar: "" },
  { id: 3, name: "Jamie Smith", xp: 3520, level: 6, badges: 11, streak: 21, avatar: "" },
  { id: 4, name: "Taylor Reed", xp: 2980, level: 5, badges: 7, streak: 5, avatar: "" },
  { id: 5, name: "Jordan Lee", xp: 2750, level: 5, badges: 6, streak: 12, avatar: "" },
  { id: 6, name: "Casey Morgan", xp: 2340, level: 4, badges: 5, streak: 3, avatar: "" },
  { id: 7, name: "Riley Cooper", xp: 2100, level: 4, badges: 8, streak: 9, avatar: "" },
  { id: 8, name: "Avery Davis", xp: 1850, level: 3, badges: 4, streak: 6, avatar: "" },
  { id: 9, name: "Cameron White", xp: 1520, level: 3, badges: 3, streak: 4, avatar: "" },
  { id: 10, name: "Quinn Martin", xp: 1240, level: 2, badges: 2, streak: 2, avatar: "" },
];

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState<string>("weekly");
  const [sortBy, setSortBy] = useState<string>("xp");
  const { gameState } = useGamification();
  const { user } = useAuth();
  
  // Get user rank based on XP
  const getUserRank = () => {
    const sortedUsers = [...leaderboardData];
    sortedUsers.push({
      id: 999,
      name: user?.name || "You",
      xp: gameState.totalXp,
      level: gameState.level,
      badges: gameState.badges.filter(b => b.unlocked).length,
      streak: gameState.streak.currentStreak,
      avatar: "",
    });
    
    sortedUsers.sort((a, b) => b.xp - a.xp);
    const userIndex = sortedUsers.findIndex(u => u.id === 999);
    return userIndex + 1;
  };
  
  // Sort and filter leaderboard data
  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (sortBy) {
      case "xp": return b.xp - a.xp;
      case "streak": return b.streak - a.streak;
      case "badges": return b.badges - a.badges;
      case "level": return b.level - a.level;
      default: return b.xp - a.xp;
    }
  });
  
  return (
    <div className="space-y-6">
      <PageTitle
        title="Leaderboard"
        description="See how you rank among other students on campus"
      />
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="col-span-full md:col-span-1 border-level/30 bg-gradient-to-b from-level/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-center py-4">
              <div className="relative w-20 h-20 bg-level/20 rounded-full flex items-center justify-center mb-3">
                <Trophy size={36} className="text-level" />
                <div className="absolute -bottom-2 -right-2 bg-level text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-background">
                  #{getUserRank()}
                </div>
              </div>
              <h3 className="text-xl font-bold">{user?.name || "You"}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Sparkles size={14} className="text-xp" />
                <span>{gameState.totalXp.toLocaleString()} XP</span>
                <span className="mx-1">•</span>
                <Trophy size={14} className="text-level" />
                <span>Level {gameState.level}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-full md:col-span-3">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Campus Leaderboard</CardTitle>
                <CardDescription>See who's leading the wellness journey</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Tabs 
                  defaultValue="weekly" 
                  value={timeframe} 
                  onValueChange={setTimeframe}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="alltime">All Time</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xp">XP</SelectItem>
                    <SelectItem value="streak">Streak</SelectItem>
                    <SelectItem value="badges">Badges</SelectItem>
                    <SelectItem value="level">Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px] text-center">#</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-center">Badges</TableHead>
                    <TableHead className="text-center">Streak</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-center font-medium">
                        {index === 0 ? (
                          <Crown className="h-5 w-5 text-yellow-500 mx-auto" />
                        ) : index === 1 ? (
                          <Medal className="h-5 w-5 text-stone-400 mx-auto" />
                        ) : index === 2 ? (
                          <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                            <Users size={14} className="text-muted-foreground" />
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Sparkles size={14} className="text-xp mr-1" />
                          <span>{user.xp.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-level/10 text-level border-level/30">
                          {user.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Trophy size={14} className="text-badge mr-1" />
                          <span>{user.badges}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <CalendarCheck size={14} className="text-streak mr-1" />
                          <span>{user.streak}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
