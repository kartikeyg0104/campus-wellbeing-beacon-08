
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText,
  BarChart,
  Clock,
} from 'lucide-react';
import { DailyTrendChart } from './charts/DailyTrendChart';
import { MonthlyAverageChart } from './charts/MonthlyAverageChart';
import { TimeOfDayChart } from './charts/TimeOfDayChart';

export const MoodAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Analytics</CardTitle>
        <CardDescription>
          Visual insights into your mood patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Daily Trend
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Monthly Average
            </TabsTrigger>
            <TabsTrigger value="timeOfDay" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time of Day
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="h-72 bg-card/50 rounded-md border p-2">
            <DailyTrendChart />
          </TabsContent>

          <TabsContent value="monthly" className="h-72 bg-card/50 rounded-md border p-2">
            <MonthlyAverageChart />
          </TabsContent>

          <TabsContent value="timeOfDay" className="h-72 bg-card/50 rounded-md border p-2">
            <TimeOfDayChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
