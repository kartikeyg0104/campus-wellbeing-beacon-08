
import React from 'react';
import { ArrowLeft, Heart, Clock, Calendar, Shield, Brain, Zap } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const StressManagementPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Stress Management Techniques</h1>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span>Self-Care</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>8 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Updated April 3, 2025</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="lead text-lg text-muted-foreground">
          Learn effective techniques to manage exam stress and anxiety with these evidence-based strategies for students.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Understanding Stress Response</CardTitle>
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <CardDescription>What happens in your body when you feel stressed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            When you experience stress, your body activates its "fight-or-flight" response, releasing stress hormones like cortisol and adrenaline. This prepares your body to respond to perceived threats by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Increasing heart rate and blood pressure</li>
            <li>Redirecting blood flow to major muscle groups</li>
            <li>Heightening alertness and sensory perception</li>
            <li>Slowing digestion and other non-essential functions</li>
          </ul>
          <p>
            While this response is helpful in true emergencies, chronic activation can lead to mental health challenges, decreased immune function, and difficulty concentrating - particularly problematic during exam periods.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Physical Techniques</CardTitle>
              <Zap className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="breathing">
                <AccordionTrigger>Deep Breathing Exercises</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      Deep breathing activates the parasympathetic nervous system, which counteracts stress response.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Box Breathing</h4>
                      <ol className="text-sm list-decimal pl-4 space-y-1">
                        <li>Inhale through your nose for 4 counts</li>
                        <li>Hold your breath for 4 counts</li>
                        <li>Exhale through your mouth for 4 counts</li>
                        <li>Hold for 4 counts before inhaling again</li>
                        <li>Repeat for 2-5 minutes</li>
                      </ol>
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link to="/resources/breathing-exercise">Try Guided Exercise</Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="muscle">
                <AccordionTrigger>Progressive Muscle Relaxation</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      This technique involves tensing and then releasing each muscle group to reduce physical tension.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Basic Steps</h4>
                      <ol className="text-sm list-decimal pl-4 space-y-1">
                        <li>Find a quiet, comfortable place to sit or lie down</li>
                        <li>Tense your feet muscles for 5 seconds</li>
                        <li>Release and notice the relaxation for 10 seconds</li>
                        <li>Move upward through each muscle group: calves, thighs, abdomen, etc.</li>
                        <li>End with facial muscles</li>
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="exercise">
                <AccordionTrigger>Physical Activity</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      Just 10-15 minutes of activity can boost mood, reduce anxiety, and improve focus.
                    </p>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      <li>Walking or jogging</li>
                      <li>Yoga or stretching</li>
                      <li>Dancing to music</li>
                      <li>Quick bodyweight exercises (push-ups, squats)</li>
                    </ul>
                    <p className="text-sm">Try scheduling short activity breaks between study sessions.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Cognitive Techniques</CardTitle>
              <Shield className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="mindfulness">
                <AccordionTrigger>Mindfulness Meditation</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      Mindfulness involves focusing on the present moment without judgment.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Simple Practice</h4>
                      <ol className="text-sm list-decimal pl-4 space-y-1">
                        <li>Sit in a comfortable position</li>
                        <li>Focus your attention on your breath</li>
                        <li>When your mind wanders, gently return focus to breathing</li>
                        <li>Start with just 3-5 minutes daily</li>
                      </ol>
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link to="/resources/mindful-meditation">Try Guided Meditation</Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="reframing">
                <AccordionTrigger>Cognitive Reframing</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      Change your perspective by challenging negative thought patterns.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Steps to Reframe</h4>
                      <ol className="text-sm list-decimal pl-4 space-y-1">
                        <li>Identify negative thoughts ("I'll fail this exam")</li>
                        <li>Challenge the thought (What evidence supports/refutes it?)</li>
                        <li>Create a balanced alternative ("I've studied and done well before")</li>
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="grounding">
                <AccordionTrigger>Grounding Techniques</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      Reconnect to the present moment when feeling overwhelmed.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">5-4-3-2-1 Technique</h4>
                      <p className="text-sm">Identify:</p>
                      <ul className="text-sm list-disc pl-4 space-y-1">
                        <li>5 things you can see</li>
                        <li>4 things you can touch</li>
                        <li>3 things you can hear</li>
                        <li>2 things you can smell</li>
                        <li>1 thing you can taste</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Creating a Stress Management Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Develop a personalized stress management plan by combining techniques that work best for you:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Daily Practices (10-15 min)</h3>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>5-minute meditation or breathing exercise</li>
                  <li>Brief physical activity</li>
                  <li>Journaling about thoughts and feelings</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">During Study Sessions</h3>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Take regular 5-minute breaks (every 25-30 min)</li>
                  <li>Use grounding techniques when feeling anxious</li>
                  <li>Practice stretching between topics</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Before Exams</h3>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Progressive muscle relaxation the night before</li>
                  <li>Box breathing immediately before entering exam</li>
                  <li>Use positive affirmations ("I'm prepared for this")</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Self-Care Foundation</h3>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Prioritize sleep (7-9 hours)</li>
                  <li>Maintain balanced nutrition</li>
                  <li>Schedule social connections</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Remember that effective stress management is personal. Experiment with different techniques to find what works best for you, and be consistent with your practice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressManagementPage;
