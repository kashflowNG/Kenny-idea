import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import WalletsPage from "@/pages/WalletsPage";
import SendPage from "@/pages/SendPage";
import ReceivePage from "@/pages/ReceivePage";
import SettingsPage from "@/pages/SettingsPage";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasAuth = localStorage.getItem('authenticated');
    if (hasAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const showBottomNav = ['/', '/wallets', '/send', '/receive', '/settings'].includes(location);
  
  const getActiveTab = () => {
    if (location === '/') return 'home';
    if (location === '/wallets') return 'wallets';
    if (location === '/send') return 'send';
    if (location === '/receive') return 'receive';
    if (location === '/settings') return 'settings';
    return 'home';
  };

  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/wallets" component={WalletsPage} />
        <Route path="/send" component={SendPage} />
        <Route path="/receive" component={ReceivePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
      
      {showBottomNav && (
        <BottomNav
          active={getActiveTab()}
          onNavigate={(page) => {
            const routes: Record<string, string> = {
              home: '/',
              wallets: '/wallets',
              send: '/send',
              receive: '/receive',
              settings: '/settings'
            };
            setLocation(routes[page] || '/');
          }}
        />
      )}
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
