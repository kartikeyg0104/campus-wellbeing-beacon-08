
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Medal, Calendar, Heart, BookOpen, BarChart2, Loader2 } from 'lucide-react';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  name: string;
  bio: string;
  email: string;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    bio: "",
    email: "",
    avatarUrl: "https://github.com/shadcn.png"
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState({
    trackingDays: 0,
    moodEntries: 0,
    journalEntries: 0,
    achievements: 0
  });
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProfileData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('name, bio, email, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setProfileData({
            name: data.name || "",
            bio: data.bio || "",
            email: data.email || "",
            avatarUrl: data.avatar_url || "https://github.com/shadcn.png"
          });
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error loading profile",
          description: error.message || "Could not load profile data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    async function fetchUserStats() {
      if (!user) return;
      
      try {
        setStatsLoading(true);
        
        // Get mood entries count
        const { count: moodCount, error: moodError } = await supabase
          .from('mood_entries')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (moodError) throw moodError;
        
        // Get journal entries count
        const { count: journalCount, error: journalError } = await supabase
          .from('journal_entries')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (journalError) throw journalError;
        
        // Get earliest mood entry to calculate tracking days
        const { data: earliestEntry, error: earliestError } = await supabase
          .from('mood_entries')
          .select('created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(1);
          
        if (earliestError) throw earliestError;
        
        // Calculate tracking days
        let trackingDays = 0;
        if (earliestEntry && earliestEntry.length > 0) {
          const firstDay = new Date(earliestEntry[0].created_at);
          const today = new Date();
          trackingDays = Math.floor((today.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        }
        
        setStats({
          trackingDays,
          moodEntries: moodCount || 0,
          journalEntries: journalCount || 0,
          achievements: 8 // Hard-coded for now, we'll implement achievements in a future update
        });
      } catch (error: any) {
        console.error("Error fetching stats:", error);
        // Don't show a toast for stats errors, just log it
      } finally {
        setStatsLoading(false);
      }
    }
    
    fetchProfileData();
    fetchUserStats();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                  <AvatarFallback>{profileData.name ? profileData.name.split(' ').map(n => n[0]).join('') : 'U'}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{profileData.name || "No name set"}</CardTitle>
              <CardDescription className="flex flex-col gap-2 items-center">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-primary/10">Student</Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm mt-2">{profileData.bio || "No bio yet"}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                {user?.email || profileData.email || "No email set"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => setOpenEditDialog(true)}>Edit Profile</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statsLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">Tracking days</span>
                    </div>
                    <span className="font-medium">{stats.trackingDays}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-sm">Mood entries</span>
                    </div>
                    <span className="font-medium">{stats.moodEntries}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm">Journal entries</span>
                    </div>
                    <span className="font-medium">{stats.journalEntries}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-primary" />
                      <span className="text-sm">Achievements</span>
                    </div>
                    <span className="font-medium">{stats.achievements}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Summary</CardTitle>
              <CardDescription>
                Your wellness metrics for the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <BarChart2 className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Wellness chart visualization</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>
                Your latest wellness milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Medal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">7-Day Streak</h4>
                    <p className="text-sm text-muted-foreground">
                      Tracked your mood for 7 consecutive days
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned on April 2, 2025
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Medal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Reflection Master</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed 10 journal entries
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned on March 25, 2025
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Medal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Resource Explorer</h4>
                    <p className="text-sm text-muted-foreground">
                      Accessed 5 different wellness resources
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned on March 18, 2025
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/app/achievements">View All Achievements</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <EditProfileDialog 
        open={openEditDialog} 
        setOpen={setOpenEditDialog} 
        profileData={profileData}
        setProfileData={setProfileData}
      />
    </div>
  );
};

export default ProfilePage;
