
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  PlusCircle,
  Edit,
  Trash2,
  Calendar,
  Save,
  ChevronLeft,
  ChevronRight,
  Search,
  ListFilter,
  BarChart2,
  Clock,
  Lock,
  Lightbulb
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Sample journal entries
const sampleEntries = [
  {
    id: 1,
    title: 'Midterm week stress',
    content: 'Feeling overwhelmed with three exams coming up. Need to create a better study schedule. I noticed I\'ve been sleeping less and my anxiety is higher than usual.',
    date: '2025-04-03T15:30:00',
    mood: 'Stressed',
    category: 'Academic'
  },
  {
    id: 2,
    title: 'Great study session',
    content: 'Had a productive study group for calculus today. It really helped clarify concepts I was struggling with. I feel more confident about the exam now.',
    date: '2025-04-02T18:45:00',
    mood: 'Satisfied',
    category: 'Academic'
  },
  {
    id: 3,
    title: 'Social anxiety at the party',
    content: 'Went to a dorm party last night but felt really anxious. Left early. Need to work on my social comfort level or find more comfortable social settings.',
    date: '2025-04-01T22:10:00',
    mood: 'Anxious',
    category: 'Social'
  },
  {
    id: 4,
    title: 'Weekend reflection',
    content: 'Had a good weekend balancing study time and relaxation. Went for a hike with friends which really improved my mood. I need to incorporate more outdoor activities.',
    date: '2025-03-31T09:15:00',
    mood: 'Content',
    category: 'Self-care'
  },
];

// Journal entry categories
const categories = [
  'Academic', 'Social', 'Self-care', 'Health', 'Personal', 'Other'
];

// Mood options
const moodOptions = [
  'Happy', 'Content', 'Neutral', 'Stressed', 'Anxious', 'Sad', 'Frustrated', 'Satisfied', 'Tired', 'Energetic'
];

// Sample insights based on journal analysis
const journalInsights = [
  {
    title: 'Academic stress pattern',
    description: 'Your journal entries show increased stress levels before exams. Consider implementing stress management techniques during these periods.',
    category: 'Academic',
  },
  {
    title: 'Social anxiety triggers',
    description: 'You tend to feel anxious in large group settings. Consider smaller gatherings or activities with closer friends.',
    category: 'Social',
  },
  {
    title: 'Mood improvement',
    description: 'Outdoor activities consistently improve your mood. Try to incorporate more nature time into your weekly routine.',
    category: 'Self-care',
  },
];

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState(sampleEntries);
  const [newEntryMode, setNewEntryMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    id: 0,
    title: '',
    content: '',
    date: new Date().toISOString().slice(0, 16),
    mood: '',
    category: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('entries');
  const { toast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredEntries = entries.filter(entry => {
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.mood.toLowerCase().includes(query) ||
      entry.category.toLowerCase().includes(query)
    );
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleNewEntry = () => {
    setCurrentEntry({
      id: 0,
      title: '',
      content: '',
      date: new Date().toISOString().slice(0, 16),
      mood: '',
      category: ''
    });
    setNewEntryMode(true);
  };

  const handleEditEntry = (entry: typeof currentEntry) => {
    setCurrentEntry(entry);
    setNewEntryMode(true);
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been removed.",
    });
  };

  const handleSaveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) {
      toast({
        title: "Missing information",
        description: "Please provide a title and content for your entry.",
        variant: "destructive",
      });
      return;
    }

    if (currentEntry.id === 0) {
      // New entry
      const newEntry = {
        ...currentEntry,
        id: Date.now(),
      };
      setEntries([newEntry, ...entries]);
      toast({
        title: "Entry created",
        description: "Your journal entry has been saved.",
      });
    } else {
      // Update existing entry
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
      toast({
        title: "Entry updated",
        description: "Your journal entry has been updated.",
      });
    }
    
    setNewEntryMode(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (newEntryMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setNewEntryMode(false)}
            className="flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            Back to entries
          </Button>
          <h1 className="text-xl font-bold">
            {currentEntry.id === 0 ? 'New Journal Entry' : 'Edit Journal Entry'}
          </h1>
          <div className="w-28"></div> {/* Spacer for alignment */}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              <Input
                placeholder="Entry title"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                className="text-xl border-none px-0 font-bold focus-visible:ring-0"
              />
            </CardTitle>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="space-y-1">
                <Label htmlFor="date" className="text-xs text-muted-foreground">Date & Time</Label>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <Input
                    id="date"
                    type="datetime-local"
                    value={currentEntry.date}
                    onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})}
                    className="h-8 w-auto"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="mood" className="text-xs text-muted-foreground">Mood</Label>
                <select
                  id="mood"
                  value={currentEntry.mood}
                  onChange={(e) => setCurrentEntry({...currentEntry, mood: e.target.value})}
                  className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select mood</option>
                  {moodOptions.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="category" className="text-xs text-muted-foreground">Category</Label>
                <select
                  id="category"
                  value={currentEntry.category}
                  onChange={(e) => setCurrentEntry({...currentEntry, category: e.target.value})}
                  className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your thoughts here..."
              value={currentEntry.content}
              onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
              className="min-h-[300px] resize-none border-none focus-visible:ring-0"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setNewEntryMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEntry}>
              <Save size={16} className="mr-2" />
              Save Entry
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Writing Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <ChevronRight size={12} className="text-primary" />
                </div>
                <span>Be specific about your emotions and what triggered them.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <ChevronRight size={12} className="text-primary" />
                </div>
                <span>Include both challenges and positive experiences in your entries.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <ChevronRight size={12} className="text-primary" />
                </div>
                <span>Reflect on patterns you notice in your thoughts and behaviors.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <ChevronRight size={12} className="text-primary" />
                </div>
                <span>Consider writing about your goals and progress toward them.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reflection Journal</h1>
          <p className="text-muted-foreground">
            Record your thoughts, track patterns, and gain personal insights.
          </p>
        </div>
        <Button onClick={handleNewEntry}>
          <PlusCircle size={16} className="mr-2" />
          New Entry
        </Button>
      </div>

      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search journal entries..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="entries" className="flex items-center gap-1.5">
              <ListFilter size={16} />
              <span className="hidden sm:inline">Entries</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1.5">
              <BarChart2 size={16} />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="entries" className="mt-0 space-y-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <Card key={entry.id} className="overflow-hidden">
              <div className={`h-1 ${
                entry.mood === 'Happy' || entry.mood === 'Content' || entry.mood === 'Satisfied' || entry.mood === 'Energetic'
                  ? 'bg-green-500'
                  : entry.mood === 'Stressed' || entry.mood === 'Anxious' || entry.mood === 'Frustrated'
                    ? 'bg-red-500'
                    : entry.mood === 'Sad' || entry.mood === 'Tired'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
              }`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{entry.title}</CardTitle>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(entry.date)}
                      </div>
                      {entry.mood && (
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          Mood: {entry.mood}
                        </div>
                      )}
                      {entry.category && (
                        <div className="flex items-center">
                          <ListFilter size={14} className="mr-1" />
                          {entry.category}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{entry.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <PlusCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No journal entries found</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              {searchQuery ? 
                "No entries match your search. Try different keywords or clear your search." :
                "Start documenting your thoughts and experiences to track patterns and gain insights."
              }
            </p>
            {!searchQuery && (
              <Button onClick={handleNewEntry} className="mt-4">
                Create your first entry
              </Button>
            )}
          </div>
        )}
      </TabsContent>

      <TabsContent value="insights" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Journal Insights</CardTitle>
            <CardDescription>
              AI-generated patterns and observations based on your entries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {journalInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{insight.title}</h3>
                      <p className="text-muted-foreground">{insight.description}</p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <ListFilter size={12} className="mr-1" />
                        {insight.category} insight
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Your journal content is private and secure. AI insights are generated locally.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default JournalPage;
