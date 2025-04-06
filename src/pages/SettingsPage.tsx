
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Lock, User, Shield, Moon, Sun, Sparkles, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from '@/context/ThemeProvider';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-muted/80 backdrop-blur-sm border border-border/50 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-foreground">General</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-foreground">Notifications</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-foreground">Privacy</TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-foreground">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 animate-fade-in-up">
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how the application looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base">Theme</Label>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant={theme === 'light' ? "default" : "outline"} 
                      className="flex gap-2 items-center border-2 hover:bg-muted/50" 
                      onClick={() => setTheme('light')}
                    >
                      <Sun size={16} className={theme === 'light' ? "text-primary-foreground" : "text-foreground"} />
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? "default" : "outline"} 
                      className="flex gap-2 items-center border-2 hover:bg-muted/50" 
                      onClick={() => setTheme('dark')}
                    >
                      <Moon size={16} className={theme === 'dark' ? "text-primary-foreground" : "text-foreground"} />
                      Dark
                    </Button>
                    <Button 
                      variant={theme === 'system' ? "default" : "outline"} 
                      className="flex gap-2 items-center border-2 hover:bg-muted/50" 
                      onClick={() => setTheme('system')}
                    >
                      <Settings size={16} className={theme === 'system' ? "text-primary-foreground" : "text-foreground"} />
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Accessibility</CardTitle>
              </div>
              <CardDescription>
                Adjust settings to improve your user experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="reduce-motion" className="text-foreground font-medium">Reduce motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Limit the amount of animations and transitions.
                  </p>
                </div>
                <Switch id="reduce-motion" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 animate-fade-in-up">
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Choose what notifications you receive and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="email-notifs" className="text-foreground font-medium">Email notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="push-notifs" className="text-foreground font-medium">Push notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device.
                  </p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="mood-reminders" className="text-foreground font-medium">Mood tracking reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded to track your mood regularly.
                  </p>
                </div>
                <Switch id="mood-reminders" defaultChecked />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="wellness-tips" className="text-foreground font-medium">Wellness tips</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive wellness tips and suggestions.
                  </p>
                </div>
                <Switch id="wellness-tips" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-4 animate-fade-in-up">
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>
                Control how your data is used and shared.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="data-sharing" className="text-foreground font-medium">Data sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous data to be used for improving the service.
                  </p>
                </div>
                <Switch id="data-sharing" />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <Label htmlFor="public-profile" className="text-foreground font-medium">Public profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your achievements visible to other users.
                  </p>
                </div>
                <Switch id="public-profile" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4 animate-fade-in-up">
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>
                Update your account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input id="name" defaultValue="Jane Doe" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" className="bg-background/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Password</CardTitle>
              </div>
              <CardDescription>
                Change your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-foreground">Current password</Label>
                <Input id="current-password" type="password" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-foreground">New password</Label>
                <Input id="new-password" type="password" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground">Confirm password</Label>
                <Input id="confirm-password" type="password" className="bg-background/50" />
              </div>
              <Button className="mt-4">Change Password</Button>
            </CardContent>
          </Card>
          
          <Card className="border border-border bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
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
        <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
