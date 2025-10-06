import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError } from "@/lib/notifications";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        showError("Login Failed", data.error || "Invalid username or password");
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      // Store session token in localStorage for subsequent requests
      if (data.sessionToken) {
        localStorage.setItem('sessionToken', data.sessionToken);
      }
      
      setLocation('/auth');
    } catch (error: any) {
      showError("Login Error", error.message || "Unable to login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#E6004D] mb-4">
            <span className="text-2xl font-bold text-white">T</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="input-username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-password"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!username || !password || loading}
            data-testid="button-login"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button 
              type="button"
              className="text-primary hover:underline"
              onClick={() => setLocation('/register')}
              data-testid="link-register"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
