
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
import { useIsMobile } from '@/hooks/use-mobile';

export const MoodAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const isMobile = useIsMobile();

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
            <TabsTrigger value="daily" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Daily</span> Trend
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Monthly</span> Average
            </TabsTrigger>
            <TabsTrigger value="timeOfDay" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Time of</span> Day
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="h-56 sm:h-64 md:h-72 bg-card/50 rounded-md border p-1 sm:p-2">
            <DailyTrendChart />
          </TabsContent>

          <TabsContent value="monthly" className="h-56 sm:h-64 md:h-72 bg-card/50 rounded-md border p-1 sm:p-2">
            <MonthlyAverageChart />
          </TabsContent>

          <TabsContent value="timeOfDay" className="h-56 sm:h-64 md:h-72 bg-card/50 rounded-md border p-1 sm:p-2">
            <TimeOfDayChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
