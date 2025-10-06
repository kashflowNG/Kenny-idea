import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PinInput from "@/components/PinInput";
import { showError } from "@/lib/notifications";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'credentials' | 'pin'>('credentials');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setStep('pin');
    }
  };

  const handlePinComplete = async (pinValue: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, pin: pinValue }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        // Use the standardized showError function
        showError(data.error || 'Registration failed');
        setPin(""); // Clear PIN on error
        return; // Stop execution if registration failed
      }

      // Assuming the registration API now handles session creation correctly
      // and we don't need to manually set localStorage here.
      // If session persistence is still an issue, it needs to be addressed in the API.

      // Success message can be handled differently if needed, but for now,
      // we'll assume the redirection is sufficient upon successful registration.
      // If a success toast is desired, it can be re-added here.
      // toast({
      //   title: "Account created!",
      //   description: "Welcome to TRON Wallet",
      // });

      setLocation('/');
    } catch (error: any) {
      // Use the standardized showError function for network or unexpected errors
      showError(error.message || 'An unexpected error occurred');
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#E6004D] mb-4">
            <span className="text-2xl font-bold text-white">T</span>
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">
            {step === 'credentials' ? 'Enter your credentials' : 'Set up your 6-digit PIN'}
          </p>
        </div>

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
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
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!username || !password}
              data-testid="button-continue"
            >
              Continue
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button 
                type="button"
                className="text-primary hover:underline"
                onClick={() => setLocation('/login')}
                data-testid="link-login"
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <div className="space-y-4">
            <PinInput
              value={pin}
              onChange={setPin}
              onComplete={handlePinComplete}
            />

            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep('credentials')}
              data-testid="button-back"
            >
              Back to credentials
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}