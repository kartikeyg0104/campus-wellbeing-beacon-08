
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
          <Link to="/app" className="flex items-center gap-2">
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
              <Button onClick={startExercise} size="lg">
                Begin Exercise
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-10">
              <div className="flex flex-col items-center justify-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold mb-6 
                  transition-all duration-700 ${
                    phase === 'inhale' ? 'bg-blue-100 text-blue-500 animate-pulse scale-110' : 
                    phase === 'hold' ? 'bg-indigo-100 text-indigo-500' : 
                    'bg-green-100 text-green-500 scale-90'
                  }`}
                >
                  {secondsLeft}
                </div>
                <h3 className="text-xl font-semibold mb-2 capitalize">{phase}</h3>
                <p className="text-muted-foreground mb-4">
                  {phase === 'inhale' ? 'Breathe in slowly through your nose' :
                   phase === 'hold' ? 'Hold your breath' :
                   'Exhale slowly through your mouth'}
                </p>
                <div className="w-full max-w-md">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingExercisePage;
