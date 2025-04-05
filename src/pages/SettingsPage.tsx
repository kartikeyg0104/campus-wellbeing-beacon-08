
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Lock, User, Shield, Moon, Sun } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant={theme === 'light' ? "default" : "outline"} 
                      className="flex gap-2" 
                      onClick={() => setTheme('light')}
                    >
                      <Sun size={16} />
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? "default" : "outline"} 
                      className="flex gap-2" 
                      onClick={() => setTheme('dark')}
                    >
                      <Moon size={16} />
                      Dark
                    </Button>
                    <Button 
                      variant={theme === 'system' ? "default" : "outline"} 
                      className="flex gap-2" 
                      onClick={() => setTheme('system')}
                    >
                      <Settings size={16} />
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Adjust settings to improve your user experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduce-motion">Reduce motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Limit the amount of animations and transitions.
                  </p>
                </div>
                <Switch id="reduce-motion" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifs">Email notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifs">Push notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device.
                  </p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mood-reminders">Mood tracking reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded to track your mood regularly.
                  </p>
                </div>
                <Switch id="mood-reminders" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="wellness-tips">Wellness tips</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive wellness tips and suggestions.
                  </p>
                </div>
                <Switch id="wellness-tips" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control how your data is used and shared.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Data sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous data to be used for improving the service.
                  </p>
                </div>
                <Switch id="data-sharing" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public-profile">Public profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your achievements visible to other users.
                  </p>
                </div>
                <Switch id="public-profile" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="mt-4">Change Password</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={saveSettings}>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
