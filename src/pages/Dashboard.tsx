import React, { useState, useEffect } from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import { HabitTracker } from '@/components/wellness/HabitTracker';
import { WellnessRecommendations } from '@/components/wellness/Recommendations';
import { WellnessStats } from '@/components/wellness/WellnessStats';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ArrowRight, 
  Bell, 
  Clock, 
  Calendar, 
  Brain, 
  Heart, 
  MessageSquare, 
  Zap, 
  TrendingUp 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChartContainer } from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '@/context/ThemeProvider';

const weeklyMoodData = [
  { day: 'Mon', value: 35 },
  { day: 'Tue', value: 45 },
  { day: 'Wed', value: 70 },
  { day: 'Thu', value: 55 },
  { day: 'Fri', value: 80 },
  { day: 'Sat', value: 60 },
  { day: 'Sun', value: 75 }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const timeOfDay = getTimeOfDay();
  const [loaded, setLoaded] = useState(false);

  const barColor = isDarkMode ? '#9b87f5' : 'hsl(var(--primary))';
  const hoverBarColor = isDarkMode ? '#a594f8' : 'hsl(var(--primary))';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        duration: 0.4
      }
    }
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const chartConfig = {
    mood: {
      label: "Mood",
      theme: {
        light: "hsl(var(--primary))",
        dark: isDarkMode ? "#9b87f5" : "hsl(var(--primary))"
      }
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground border border-border p-2 rounded-md shadow-lg">
          <p className="font-medium">{`${payload[0].value}%`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate={loaded ? "show" : "hidden"}
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        variants={itemVariants}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
              Good {timeOfDay}, {user?.name}
            </h1>
            <div className="hidden md:block animate-bounce">
              {timeOfDay === 'morning' && '☀️'}
              {timeOfDay === 'afternoon' && '⛅'}
              {timeOfDay === 'evening' && '🌙'}
            </div>
          </div>
          <p className="text-muted-foreground">
            Track your wellness journey and build healthy habits.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="shadow-soft transition-all hover:shadow-md hover:-translate-y-1" asChild>
            <Link to="/app/analytics">
              <TrendingUp size={16} className="mr-1" />
              View insights
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
          <Button className="shadow-soft transition-all hover:shadow-md hover:-translate-y-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground" asChild>
            <Link to="/app/mood">
              <Zap size={16} className="mr-1" />
              Track mood
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <Card className="col-span-3 md:col-span-2 bg-card shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  Today's Overview
                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                    <Clock size={12} className="mr-1" /> 
                    Daily
                  </Badge>
                </CardTitle>
                <CardDescription>Your wellness stats for {today}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { 
                  title: "Mental Wellness Score", 
                  icon: Brain, 
                  score: "82%", 
                  change: "+3%", 
                  trend: "from last week", 
                  colorClass: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700" 
                },
                { 
                  title: "Habit Completion", 
                  icon: Calendar, 
                  score: "3/5", 
                  change: "60%", 
                  trend: "completed today", 
                  colorClass: "from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700" 
                },
                { 
                  title: "Stress Level", 
                  icon: Heart, 
                  score: "Low", 
                  change: "-12%", 
                  trend: "from yesterday", 
                  colorClass: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700" 
                },
                { 
                  title: "Upcoming", 
                  icon: Bell, 
                  score: "2", 
                  change: "Events", 
                  trend: "this week", 
                  colorClass: "from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700" 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl flex flex-col items-start justify-between h-32 overflow-hidden relative group",
                    `bg-gradient-to-br ${item.colorClass} text-white`
                  )}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <item.icon size={18} />
                  </div>
                  <div className="z-10">
                    <p className="text-xs font-medium opacity-90">{item.title}</p>
                    <h3 className="text-2xl font-bold">{item.score}</h3>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="inline-block p-1 rounded bg-white/20">{item.change}</span>
                      <span className="opacity-80">{item.trend}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center text-card-foreground">
                    <TrendingUp size={14} className="mr-1.5 text-primary" />
                    Weekly Mood Trend
                  </h3>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
                
                <div className="h-48 w-full rounded-lg border border-border bg-card/50 overflow-hidden">
                  <ChartContainer 
                    className="h-full w-full" 
                    config={chartConfig}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyMoodData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <XAxis 
                          dataKey="day" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis 
                          hide 
                          domain={[0, 100]} 
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <defs>
                          <linearGradient id="moodBarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={barColor} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={barColor} stopOpacity={0.5}/>
                          </linearGradient>
                        </defs>
                        <Bar 
                          dataKey="value" 
                          fill="url(#moodBarGradient)" 
                          stroke={barColor}
                          strokeWidth={1}
                          radius={[4, 4, 0, 0]}
                          barSize={30} 
                          name="mood"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h3 className="text-sm font-medium flex items-center text-card-foreground">
                      <Calendar size={14} className="mr-1.5 text-primary" />
                      April Goals Progress
                    </h3>
                    <p className="text-xs text-muted-foreground">25 days remaining</p>
                  </div>
                  <Link to="/app/habits" className="text-xs text-primary hover:underline flex items-center">
                    View all
                    <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Mindfulness meditation", progress: 60, color: "bg-primary" },
                    { name: "Daily exercise", progress: 45, color: "bg-secondary" },
                    { name: "Journal entries", progress: 80, color: "bg-blue-500 dark:bg-blue-600" }
                  ].map((goal, index) => (
                    <motion.div 
                      key={index} 
                      className="space-y-1.5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between text-xs">
                        <span className="text-card-foreground">{goal.name}</span>
                        <span className="font-medium text-card-foreground">{goal.progress}%</span>
                      </div>
                      <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${goal.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-1 bg-card shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            <CardDescription>Easy access to wellness tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Breathing Exercise", icon: Brain, path: "/app/resources/breathing-exercise" },
                { title: "New Journal Entry", icon: ChevronRight, path: "/app/journal" },
                { title: "Stress Management", icon: Heart, path: "/app/resources/stress-management" },
                { title: "Chat Support", icon: MessageSquare, path: "/app/chat" }
              ].map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="h-24 w-full flex flex-col justify-center bg-gradient-to-br from-background to-muted/30 hover:from-background hover:to-primary/10 border-muted" 
                    asChild
                  >
                    <Link to={action.path}>
                      <div className="bg-primary/10 p-2 rounded-full mb-2 text-primary">
                        <action.icon size={18} />
                      </div>
                      <span className="text-xs text-card-foreground">{action.title}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm mt-6 border border-primary/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="font-medium text-sm mb-2 flex items-center text-card-foreground">
                <Zap size={14} className="mr-1.5 text-primary" />
                Wellness Tip
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                "Taking just 5 minutes to practice mindful breathing can significantly reduce stress hormones and improve focus."
              </p>
              <Button size="sm" variant="outline" className="w-full bg-background/50 text-xs" asChild>
                <Link to="/app/resources">
                  Explore more tips
                </Link>
              </Button>
            </motion.div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" className="w-full text-xs text-primary" asChild>
              <Link to="/app/resources">
                View all wellness resources
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <Card className="col-span-3 md:col-span-2 bg-card shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-card-foreground">Wellness Stats</CardTitle>
            <CardDescription>Your wellness journey at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <WellnessStats />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-1 bg-card shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-card-foreground">Daily Habits</CardTitle>
            <CardDescription>Track your wellness routines</CardDescription>
          </CardHeader>
          <CardContent>
            <HabitTracker />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="bg-card shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-card-foreground">Personalized Recommendations</CardTitle>
            <CardDescription>Based on your wellness patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <WellnessRecommendations />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
