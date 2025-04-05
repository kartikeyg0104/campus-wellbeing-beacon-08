
import React from 'react';
import { ArrowLeft, Utensils, Clock, Calendar, Brain, Apple, Fish, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const BrainFoodsPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Brain-Boosting Foods</h1>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Utensils size={16} />
            <span>Nutrition</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>6 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Updated April 4, 2025</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="lead text-lg text-muted-foreground">
          Foods that improve focus, memory, and cognitive function. Learn how to fuel your brain for optimal performance during exam periods and beyond.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How Diet Affects Your Brain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your brain requires a constant supply of nutrients to function optimally. What you eat directly impacts your:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-medium">Cognitive function</span> - Including memory, focus, and problem-solving</li>
            <li><span className="font-medium">Energy levels</span> - How alert and attentive you feel throughout the day</li>
            <li><span className="font-medium">Mood regulation</span> - Your emotional stability and stress response</li>
            <li><span className="font-medium">Long-term brain health</span> - Protection against cognitive decline</li>
          </ul>
          <p>
            The foods below have been scientifically shown to support brain function through various mechanisms, from providing essential nutrients to reducing inflammation.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-700/20 h-2" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Fish className="h-5 w-5 text-primary" />
                Fatty Fish
              </CardTitle>
              <Badge variant="outline">Omega-3 Rich</Badge>
            </div>
            <CardDescription>Salmon, trout, sardines, mackerel</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">
              Rich in omega-3 fatty acids, particularly DHA, which makes up 40% of the polyunsaturated fatty acids in your brain.
            </p>
            <div className="mt-3">
              <h4 className="text-sm font-medium">Benefits:</h4>
              <ul className="text-sm mt-1 list-disc pl-5 space-y-1">
                <li>Builds brain and nerve cells</li>
                <li>Improves memory and learning</li>
                <li>Slows age-related mental decline</li>
                <li>Reduces inflammation in the brain</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">Aim for 2-3 servings per week</p>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/20 to-purple-700/20 h-2" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                Berries
              </CardTitle>
              <Badge variant="outline">Antioxidant Rich</Badge>
            </div>
            <CardDescription>Blueberries, strawberries, blackberries</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">
              Contain flavonoids, especially anthocyanins, which have powerful antioxidant and anti-inflammatory effects.
            </p>
            <div className="mt-3">
              <h4 className="text-sm font-medium">Benefits:</h4>
              <ul className="text-sm mt-1 list-disc pl-5 space-y-1">
                <li>Improves communication between brain cells</li>
                <li>Enhances memory and concentration</li>
                <li>Delays brain aging</li>
                <li>Reduces oxidative stress and inflammation</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">Add 1/2 cup to your daily diet</p>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-500/20 to-green-700/20 h-2" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Leafy Greens
              </CardTitle>
              <Badge variant="outline">Vitamin K Rich</Badge>
            </div>
            <CardDescription>Kale, spinach, collards, broccoli</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">
              Excellent sources of vitamin K, lutein, folate, and beta carotene, which support brain health.
            </p>
            <div className="mt-3">
              <h4 className="text-sm font-medium">Benefits:</h4>
              <ul className="text-sm mt-1 list-disc pl-5 space-y-1">
                <li>Slows cognitive decline</li>
                <li>Improves memory</li>
                <li>Provides neuroprotective effects</li>
                <li>Supports overall brain function</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">Include 1-2 servings daily</p>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>More Brain-Boosting Foods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Nuts and Seeds</span>
              </h3>
              <p className="text-sm mb-2">
                Walnuts, almonds, flaxseeds, and sunflower seeds are excellent sources of vitamin E, zinc, and healthy fats.
              </p>
              <p className="text-sm text-muted-foreground">
                Try: A small handful (1 oz) as a daily snack
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Dark Chocolate</span>
              </h3>
              <p className="text-sm mb-2">
                Contains flavonoids, caffeine, and antioxidants. Look for chocolate with 70% or higher cocoa content.
              </p>
              <p className="text-sm text-muted-foreground">
                Try: 1-2 squares as an occasional treat
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Whole Grains</span>
              </h3>
              <p className="text-sm mb-2">
                Brown rice, barley, oats, and quinoa provide a steady supply of energy to the brain through complex carbohydrates.
              </p>
              <p className="text-sm text-muted-foreground">
                Try: Including a serving at most meals
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Turmeric</span>
              </h3>
              <p className="text-sm mb-2">
                Contains curcumin, which crosses the blood-brain barrier and has anti-inflammatory and antioxidant benefits.
              </p>
              <p className="text-sm text-muted-foreground">
                Try: Adding to smoothies, eggs, or rice dishes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brain-Boosting Meal Ideas for Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-medium">Quick Breakfast Options</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <span className="font-medium">Berry & nut oatmeal</span>: Oats topped with blueberries, walnuts, and a drizzle of honey
              </li>
              <li>
                <span className="font-medium">Avocado toast with eggs</span>: Whole grain toast with avocado, topped with a poached egg
              </li>
              <li>
                <span className="font-medium">Brain-boost smoothie</span>: Spinach, banana, blueberries, flaxseed, and almond milk
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Study Snacks</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <span className="font-medium">Trail mix</span>: Walnuts, almonds, dark chocolate chips, and dried berries
              </li>
              <li>
                <span className="font-medium">Greek yogurt parfait</span>: Greek yogurt layered with berries and a sprinkle of flaxseeds
              </li>
              <li>
                <span className="font-medium">Hummus with vegetables</span>: Carrot and cucumber sticks with chickpea hummus
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Exam Day Nutrition</h3>
            <p className="text-sm">On exam days, focus on:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Eating a balanced breakfast with protein and complex carbs</li>
              <li>Staying hydrated (dehydration negatively impacts cognitive function)</li>
              <li>Avoiding excessive caffeine, which can increase anxiety</li>
              <li>Bringing brain-friendly snacks for long exam sessions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrainFoodsPage;
