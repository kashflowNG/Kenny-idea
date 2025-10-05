import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DemoProfileBadgeProps {
  email: string;
  phone: string;
  password: string;
}

export default function DemoProfileBadge({ email, phone, password }: DemoProfileBadgeProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-chart-4/20 border border-chart-4/40 rounded-2xl p-4" data-testid="demo-profile-badge">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-chart-4/30 flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4 text-chart-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 bg-chart-4/30 text-chart-4 rounded-full text-xs font-medium">
              Demo Mode
            </span>
          </div>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-16 shrink-0">Email:</span>
              <span className="font-mono text-xs truncate" data-testid="text-demo-email">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-16 shrink-0">Phone:</span>
              <span className="font-mono text-xs" data-testid="text-demo-phone">{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-16 shrink-0">Password:</span>
              <span className="font-mono text-xs flex-1" data-testid="text-demo-password">
                {showPassword ? password : '••••••••'}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 shrink-0"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="button-toggle-password"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
