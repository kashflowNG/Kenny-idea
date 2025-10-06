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
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const hasAuth = localStorage.getItem('authenticated');
      if (hasAuth) {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('authenticated');
          }
        } catch {
          localStorage.removeItem('authenticated');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !['/register', '/login', '/auth'].includes(location)) {
      setLocation('/login');
    }
  }, [isAuthenticated, location, setLocation, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#E6004D]">
          <span className="text-2xl font-bold text-white">T</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/auth" component={AuthPage} />
      </Switch>
    );
  }

  if (location === '/auth') {
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
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
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
