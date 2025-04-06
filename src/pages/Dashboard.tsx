
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
import { ChevronRight, ArrowRight, Bell, Clock, Calendar, Brain, Heart, MessageSquare, Zap, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();
  const [loaded, setLoaded] = useState(false);

  // Animation variants for staggered loading
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
          <Button className="shadow-soft transition-all hover:shadow-md hover:-translate-y-1 bg-gradient-to-r from-primary to-secondary" asChild>
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
        <Card className="col-span-3 md:col-span-2 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Today's Overview
                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                    <Clock size={12} className="mr-1" /> 
                    Daily
                  </Badge>
                </CardTitle>
                <CardDescription>Your wellness stats for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</CardDescription>
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
                  color: "wellness-calm" 
                },
                { 
                  title: "Habit Completion", 
                  icon: Calendar, 
                  score: "3/5", 
                  change: "60%", 
                  trend: "completed today", 
                  color: "wellness-soothe" 
                },
                { 
                  title: "Stress Level", 
                  icon: Heart, 
                  score: "Low", 
                  change: "-12%", 
                  trend: "from yesterday", 
                  color: "wellness-energize" 
                },
                { 
                  title: "Upcoming", 
                  icon: Bell, 
                  score: "2", 
                  change: "Events", 
                  trend: "this week", 
                  color: "wellness-balance" 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl flex flex-col items-start justify-between h-32 overflow-hidden relative group",
                    `bg-gradient-to-br from-${item.color} to-${item.color}/60 text-primary-foreground`
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
                  <h3 className="text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-1.5 text-primary" />
                    Weekly Mood Trend
                  </h3>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
                <div className="h-32 relative">
                  <div className="absolute inset-0 flex items-end justify-around">
                    {[35, 45, 70, 55, 80, 60, 75].map((value, i) => (
                      <motion.div 
                        key={i} 
                        className="relative group"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-8 rounded-t-lg bg-gradient-to-t from-primary/90 to-primary/50 transition-all group-hover:from-primary group-hover:to-primary"
                          style={{ height: `${value}%` }}
                          whileHover={{ scale: 1.1 }}
                        ></motion.div>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background rounded px-2 py-1 text-xs transition-opacity shadow-md">
                          {value}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={i}>{day}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h3 className="text-sm font-medium flex items-center">
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
                    { name: "Journal entries", progress: 80, color: "bg-wellness-calm" }
                  ].map((goal, index) => (
                    <motion.div 
                      key={index} 
                      className="space-y-1.5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between text-xs">
                        <span>{goal.name}</span>
                        <span className="font-medium">{goal.progress}%</span>
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

        <Card className="col-span-3 md:col-span-1 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
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
                      <span className="text-xs">{action.title}</span>
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
              <h3 className="font-medium text-sm mb-2 flex items-center">
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
        <Card className="col-span-3 md:col-span-2 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>Wellness Stats</CardTitle>
            <CardDescription>Your wellness journey at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <WellnessStats />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-1 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>Daily Habits</CardTitle>
            <CardDescription>Track your wellness routines</CardDescription>
          </CardHeader>
          <CardContent>
            <HabitTracker />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
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
