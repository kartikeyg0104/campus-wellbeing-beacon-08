
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Medal, Calendar, Heart, BookOpen, BarChart2 } from 'lucide-react';
import EditProfileDialog from '@/components/profile/EditProfileDialog';

interface ProfileData {
  name: string;
  bio: string;
  email: string;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Jane Doe",
    bio: "Student at University",
    email: "jane.doe@university.edu",
    avatarUrl: "https://github.com/shadcn.png"
  });

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
                  <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription className="flex flex-col gap-2 items-center">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-primary/10">Student</Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm mt-2">{profileData.bio}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Member since March 2025
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Tracking days</span>
                </div>
                <span className="font-medium">32</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-sm">Mood entries</span>
                </div>
                <span className="font-medium">47</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm">Journal entries</span>
                </div>
                <span className="font-medium">12</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Medal className="h-4 w-4 text-primary" />
                  <span className="text-sm">Achievements</span>
                </div>
                <span className="font-medium">8</span>
              </div>
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
                <a href="/achievements">View All Achievements</a>
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
