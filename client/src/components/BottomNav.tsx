import { Home, Wallet, Send, Download, Settings } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wallets', icon: Wallet, label: 'Wallets' },
    { id: 'send', icon: Send, label: 'Send' },
    { id: 'receive', icon: Download, label: 'Receive' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 hover-elevate"
              data-testid={`nav-${item.id}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
