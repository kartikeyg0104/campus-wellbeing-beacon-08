
import { Resource } from '@/types/resource';

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Managing Exam Stress',
    description: 'Learn effective techniques to handle stress during exam periods.',
    type: 'article',
    category: 'mental',
    tags: ['stress', 'exams', 'anxiety'],
    link: '/resources/managing-exam-stress'
  },
  {
    id: '2',
    title: 'Mindful Meditation Guide',
    description: 'A 10-minute guided meditation practice for students.',
    type: 'audio',
    category: 'mental',
    tags: ['meditation', 'mindfulness', 'anxiety'],
    link: '/resources/mindful-meditation'
  },
  {
    id: '3',
    title: 'Campus Counseling Services',
    description: 'Free confidential counseling services for all students.',
    type: 'service',
    category: 'mental',
    tags: ['counseling', 'mental health', 'therapy'],
    serviceHours: 'Monday-Friday, 9am-5pm',
    location: 'Student Health Center, Room 302',
    contactPhone: '(123) 456-7890',
    contactWebsite: 'https://university.edu/counseling'
  },
  {
    id: '4',
    title: 'Healthy Sleep Habits',
    description: 'Tips for improving your sleep quality and establishing a routine.',
    type: 'article',
    category: 'sleep',
    tags: ['sleep', 'health', 'routine'],
    link: '/resources/sleep-habits'
  },
  {
    id: '5',
    title: 'Yoga for Beginners',
    description: '15-minute yoga routines designed for small spaces like dorm rooms.',
    type: 'video',
    category: 'physical',
    tags: ['yoga', 'exercise', 'stress-relief'],
    link: '/resources/yoga-beginners'
  },
  {
    id: '6',
    title: 'Effective Study Techniques',
    description: 'Evidence-based study methods to improve retention and efficiency.',
    type: 'article',
    category: 'academic',
    tags: ['study', 'academic', 'productivity'],
    link: '/resources/study-techniques'
  },
  {
    id: '7',
    title: 'Social Anxiety Workshop',
    description: 'Virtual workshop series on navigating social situations in college.',
    type: 'service',
    category: 'social',
    tags: ['anxiety', 'social', 'workshop'],
    serviceHours: 'Thursdays, 6pm-7:30pm',
    location: 'Online via Zoom',
    contactWebsite: 'https://university.edu/social-workshop'
  },
  {
    id: '8',
    title: 'Nutrition for Brain Health',
    description: 'Learn how diet affects cognitive function and mental wellbeing.',
    type: 'video',
    category: 'physical',
    tags: ['nutrition', 'brain health', 'diet'],
    link: '/resources/nutrition-brain'
  }
];
