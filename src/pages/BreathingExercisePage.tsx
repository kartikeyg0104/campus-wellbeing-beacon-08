
import React, { useState } from 'react';
import { ArrowLeft, Brain, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const BreathingExercisePage: React.FC = () => {
  const { toast } = useToast();
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  
  const handleSaveResource = () => {
    toast({
      title: "Resource Saved",
      description: "This resource has been added to your saved items.",
    });
  };
  
  const startExercise = () => {
    setIsExerciseActive(true);
    setPhase('inhale');
    setProgress(0);
    setSecondsLeft(4);
    
    let currentPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
    let timeLeft = 4;
    
    const interval = setInterval(() => {
      timeLeft -= 1;
      setSecondsLeft(timeLeft);
      
      if (currentPhase === 'inhale') {
        setProgress(((4 - timeLeft) / 4) * 100);
        if (timeLeft <= 0) {
          currentPhase = 'hold';
          timeLeft = 7;
          setPhase('hold');
          setSecondsLeft(7);
        }
      } else if (currentPhase === 'hold') {
        setProgress(((7 - timeLeft) / 7) * 100);
        if (timeLeft <= 0) {
          currentPhase = 'exhale';
          timeLeft = 8;
          setPhase('exhale');
          setSecondsLeft(8);
        }
      } else {
        setProgress(((8 - timeLeft) / 8) * 100);
        if (timeLeft <= 0) {
          if (Math.floor(Math.random() * 5) === 0) {
            clearInterval(interval);
            setIsExerciseActive(false);
            toast({
              title: "Exercise Complete",
              description: "Great job! You've completed the breathing exercise.",
            });
          } else {
            currentPhase = 'inhale';
            timeLeft = 4;
            setPhase('inhale');
            setSecondsLeft(4);
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={handleSaveResource}>
          Save Resource
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">5-Minute Breathing Exercise</h1>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Brain size={16} />
            <span>Mindfulness</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>5 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Updated April 1, 2025</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="lead text-lg text-muted-foreground">
          Take a quick break to reset with this guided breathing exercise using the 4-7-8 technique.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Guided Breathing Exercise</CardTitle>
          <CardDescription>Follow the prompts to complete the breathing exercise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isExerciseActive ? (
            <div className="text-center py-10">
              <p className="text-lg mb-6">Ready to begin a 5-minute guided breathing exercise?</p>
              <Button size="lg" onClick={startExercise}>
                Start Exercise
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                  {phase === 'inhale' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale'}
                </h2>
                <p className="text-xl">{secondsLeft} seconds</p>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0s</span>
                  <span>
                    {phase === 'inhale' ? '4s' : phase === 'hold' ? '7s' : '8s'}
                  </span>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-center">
                  {phase === 'inhale' 
                    ? 'Breathe in slowly through your nose' 
                    : phase === 'hold' 
                    ? 'Hold your breath' 
                    : 'Exhale completely through your mouth'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefits of Deep Breathing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Deep breathing exercises like the 4-7-8 technique can help:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reduce anxiety and stress levels</li>
            <li>Lower heart rate and blood pressure</li>
            <li>Improve focus and concentration</li>
            <li>Promote relaxation and better sleep</li>
            <li>Increase oxygen supply to your brain</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The 4-7-8 breathing technique consists of:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold">1</span>
              </div>
              <div>
                <span className="font-medium">Inhale</span>
                <p className="text-sm text-muted-foreground">Breathe in quietly through your nose for 4 seconds</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold">2</span>
              </div>
              <div>
                <span className="font-medium">Hold</span>
                <p className="text-sm text-muted-foreground">Hold your breath for 7 seconds</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold">3</span>
              </div>
              <div>
                <span className="font-medium">Exhale</span>
                <p className="text-sm text-muted-foreground">Exhale completely through your mouth for 8 seconds</p>
              </div>
            </li>
          </ul>
          <p className="pt-2 text-sm text-muted-foreground">
            Try to practice this exercise at least twice daily for best results. It can be especially helpful before stressful events or at bedtime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingExercisePage;
