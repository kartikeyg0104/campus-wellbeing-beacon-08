
import { LucideIcon } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  total: number;
  completed: boolean;
  category: string;
  dateEarned?: string;
}
