
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Eye, Lock, RefreshCw } from "lucide-react";

const Settings = () => {
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="practice-reminder">Practice Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about scheduled practice sessions
                </p>
              </div>
              <Switch id="practice-reminder" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="wellness-reminder">Wellness Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about wellness activities
                </p>
              </div>
              <Switch id="wellness-reminder" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="focus-alerts">Focus Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when focus level drops significantly
                </p>
              </div>
              <Switch id="focus-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="default-mode">Default Mode</Label>
              <Select defaultValue="self-study">
                <SelectTrigger id="default-mode">
                  <SelectValue placeholder="Select default mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self-study">Self-Study</SelectItem>
                  <SelectItem value="institute">Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="light-mode">Light Mode (Low Contrast)</Label>
                <p className="text-sm text-muted-foreground">
                  Auto-enable during high stress or late-night
                </p>
              </div>
              <Switch id="light-mode" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="focus-mode">Focus Mode Default</Label>
                <p className="text-sm text-muted-foreground">
                  Auto-enable focus mode during practice
                </p>
              </div>
              <Switch id="focus-mode" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your data preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="biometric-data">Share Biometric Data</Label>
                <p className="text-sm text-muted-foreground">
                  Allow app to process focus and wellness metrics
                </p>
              </div>
              <Switch id="biometric-data" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sync-offline">Offline Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Download content for offline usage
                </p>
              </div>
              <Switch id="sync-offline" />
            </div>
            
            <div className="space-y-2">
              <Label>Data Management</Label>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Button variant="outline" className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Data
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="flex items-center text-red-500 hover:text-red-600">
                  Clear All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
