import { useState } from "react";
import { useLocation } from "wouter";
import PinInput from "@/components/PinInput";
import { showError } from "@/lib/notifications";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [pin, setPin] = useState("");

  const handlePinComplete = async (value: string) => {
    try {
      const response = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: value }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Invalid PIN');
      }

      setLocation('/');
    } catch (error: any) {
      showError("Authentication Failed", error.message || "Please try again");
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
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your PIN to continue</p>
        </div>

        <PinInput
          value={pin}
          onChange={setPin}
          onComplete={handlePinComplete}
        />

        <p className="text-center text-sm text-muted-foreground">
          Forgot your PIN?{" "}
          <button 
            className="text-primary hover:underline"
            onClick={() => console.log('Reset PIN')}
            data-testid="button-forgot-pin"
          >
            Reset
          </button>
        </p>
      </div>
    </div>
  );
}
