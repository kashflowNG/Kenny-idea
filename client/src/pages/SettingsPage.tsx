import { Shield, Key, Bell, Moon, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const settingsItems = [
    {
      icon: Shield,
      label: 'Security & PIN',
      description: 'Change your PIN or security settings',
      action: () => console.log('Security settings'),
      testId: 'button-security'
    },
    {
      icon: Key,
      label: 'Backup Private Keys',
      description: 'Export and backup your wallet keys',
      action: () => console.log('Backup keys'),
      testId: 'button-backup'
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Preferences</h2>
          
          <div className="bg-card rounded-2xl divide-y divide-card-border">
            <div className="flex items-center justify-between p-4" data-testid="setting-dark-mode">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Adjust theme appearance</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="flex items-center justify-between p-4" data-testid="setting-notifications">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Transaction alerts</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Security</h2>
          
          <div className="bg-card rounded-2xl divide-y divide-card-border">
            {settingsItems.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="w-full flex items-center gap-3 p-4 hover-elevate text-left"
                data-testid={item.testId}
              >
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">About</h2>
          
          <div className="bg-card rounded-2xl">
            <button
              onClick={() => console.log('About')}
              className="w-full flex items-center gap-3 p-4 hover-elevate text-left"
              data-testid="button-about"
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">About TRON Wallet</p>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              </div>
            </button>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => console.log('Logout')}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
