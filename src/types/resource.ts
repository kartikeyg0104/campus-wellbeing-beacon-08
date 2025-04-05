
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'service';
  category: 'mental' | 'physical' | 'academic' | 'social' | 'sleep';
  tags: string[];
  link?: string;
  serviceHours?: string;
  location?: string;
  contactPhone?: string;
  contactWebsite?: string;
}
