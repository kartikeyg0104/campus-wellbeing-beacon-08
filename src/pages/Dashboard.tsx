
import React from 'react';
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
import { ChevronRight, ArrowRight, Bell, Clock, Calendar, Brain, Heart, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Good {timeOfDay}, {user?.name}</h1>
            <div className="hidden md:block">
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
          <Button variant="outline" className="shadow-soft" asChild>
            <Link to="/app/analytics">
              View insights
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
          <Button className="shadow-soft" asChild>
            <Link to="/app/mood">
              Track mood
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-3 md:col-span-2 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Today's Overview</CardTitle>
                <CardDescription>Your wellness stats for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary" /> Daily
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className={cn(
                "p-4 rounded-xl flex flex-col items-start justify-between h-32",
                "bg-gradient-to-br from-wellness-calm to-wellness-calm/60 text-primary-foreground"
              )}>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Brain size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-90">Mental Wellness Score</p>
                  <h3 className="text-2xl font-bold">82%</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="inline-block p-1 rounded bg-white/20">+3%</span>
                    <span className="opacity-80">from last week</span>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "p-4 rounded-xl flex flex-col items-start justify-between h-32",
                "bg-gradient-to-br from-wellness-soothe to-wellness-soothe/60 text-primary-foreground"
              )}>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-90">Habit Completion</p>
                  <h3 className="text-2xl font-bold">3/5</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="inline-block p-1 rounded bg-white/20">60%</span>
                    <span className="opacity-80">completed today</span>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "p-4 rounded-xl flex flex-col items-start justify-between h-32",
                "bg-gradient-to-br from-wellness-energize to-wellness-energize/60 text-primary-foreground"
              )}>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Heart size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-90">Stress Level</p>
                  <h3 className="text-2xl font-bold">Low</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="inline-block p-1 rounded bg-white/20">-12%</span>
                    <span className="opacity-80">from yesterday</span>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "p-4 rounded-xl flex flex-col items-start justify-between h-32",
                "bg-gradient-to-br from-wellness-balance to-wellness-balance/60 text-primary-foreground"
              )}>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-90">Upcoming</p>
                  <h3 className="text-2xl font-bold">2</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="inline-block p-1 rounded bg-white/20">Events</span>
                    <span className="opacity-80">this week</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Weekly Mood Trend</h3>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
                <div className="h-32 relative">
                  <div className="absolute inset-0 flex items-end justify-around">
                    {[35, 45, 70, 55, 80, 60, 75].map((value, i) => (
                      <div key={i} className="relative group">
                        <div 
                          className="w-8 rounded-t-lg bg-primary/80 transition-all group-hover:bg-primary" 
                          style={{ height: `${value}%` }}
                        ></div>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background rounded px-2 py-1 text-xs transition-opacity">
                          {value}%
                        </div>
                      </div>
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
                    <h3 className="text-sm font-medium">April Goals Progress</h3>
                    <p className="text-xs text-muted-foreground">25 days remaining</p>
                  </div>
                  <Link to="/app/habits" className="text-xs text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Mindfulness meditation</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Daily exercise</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Journal entries</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-1 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Easy access to wellness tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-24 flex flex-col justify-center card-hover-effect" asChild>
                <Link to="/app/resources/breathing-exercise">
                  <div className="bg-accent/50 p-2 rounded-full mb-2">
                    <Brain size={18} className="text-primary" />
                  </div>
                  <span className="text-xs">Breathing Exercise</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-24 flex flex-col justify-center card-hover-effect" asChild>
                <Link to="/app/journal">
                  <div className="bg-accent/50 p-2 rounded-full mb-2">
                    <ChevronRight size={18} className="text-primary" />
                  </div>
                  <span className="text-xs">New Journal Entry</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-24 flex flex-col justify-center card-hover-effect" asChild>
                <Link to="/app/resources/stress-management">
                  <div className="bg-accent/50 p-2 rounded-full mb-2">
                    <Heart size={18} className="text-primary" />
                  </div>
                  <span className="text-xs">Stress Management</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-24 flex flex-col justify-center card-hover-effect" asChild>
                <Link to="/app/chat">
                  <div className="bg-accent/50 p-2 rounded-full mb-2">
                    <MessageSquare size={18} className="text-primary" />
                  </div>
                  <span className="text-xs">Chat Support</span>
                </Link>
              </Button>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mt-6">
              <h3 className="font-medium text-sm mb-2">Wellness Tip</h3>
              <p className="text-xs text-muted-foreground mb-3">
                "Taking just 5 minutes to practice mindful breathing can significantly reduce stress hormones and improve focus."
              </p>
              <Button size="sm" variant="outline" className="w-full bg-background/50 text-xs" asChild>
                <Link to="/app/resources">
                  Explore more tips
                </Link>
              </Button>
            </div>
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-3 md:col-span-2 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wellness Stats</CardTitle>
            <CardDescription>Your wellness journey at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <WellnessStats />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-1 bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Daily Habits</CardTitle>
            <CardDescription>Track your wellness routines</CardDescription>
          </CardHeader>
          <CardContent>
            <HabitTracker />
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white/50 dark:bg-gray-900/50 shadow-soft border backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Based on your wellness patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <WellnessRecommendations />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
