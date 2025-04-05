
import React from 'react';
import { ArrowLeft, Moon, Clock, Calendar, BedDouble, Lightbulb, Clock12 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

const SleepHabitsPage: React.FC = () => {
  const { toast } = useToast();

  const handleSaveResource = () => {
    toast({
      title: "Resource Saved",
      description: "This resource has been added to your saved items.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/resources" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Resources
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={handleSaveResource}>
          Save Resource
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Healthy Sleep Habits</h1>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Moon size={16} />
            <span>Sleep</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>8 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Updated March 15, 2025</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="lead text-lg text-muted-foreground">
          Tips for improving your sleep quality and establishing a healthy sleep routine to boost your academic performance and overall wellbeing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Why Sleep Matters for Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Sleep is essential for cognitive function, memory consolidation, and emotional regulation - all critical for academic success. Research shows that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Students who get 7-9 hours of quality sleep perform better on exams</li>
              <li>Memory consolidation occurs primarily during sleep</li>
              <li>Sleep deprivation impairs judgment and decision-making abilities</li>
              <li>Consistent sleep schedules help regulate mood and stress levels</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Signs of Sleep Deprivation</CardTitle>
            <BedDouble className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Difficulty concentrating in class or while studying</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Irritability and mood swings</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Falling asleep in lectures</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Relying heavily on caffeine</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                </div>
                <span>Weakened immune system</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Building Better Sleep Habits</CardTitle>
          <Lightbulb className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Clock12 className="h-4 w-4 text-primary" />
                <span>Consistent Sleep Schedule</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock and can help you fall asleep and stay asleep for the night.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" />
                <span>Create a Restful Environment</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Keep your room cool, quiet, and dark. Consider using earplugs, an eye mask, or a white noise machine if needed. Invest in a comfortable mattress and pillows.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-primary" />
                <span>Pre-Sleep Routine</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Develop a relaxing routine before bed to signal to your body that it's time to wind down. This could include reading a book, taking a warm bath, or practicing relaxation exercises.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span>Limit Screen Time</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                The blue light emitted by phones, tablets, and computers can interfere with your ability to fall asleep. Try to avoid screens for at least an hour before bed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepHabitsPage;
