import { useState } from "react";
import { useLocation } from "wouter";
import PinInput from "@/components/PinInput";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [pin, setPin] = useState("");

  const handlePinComplete = (value: string) => {
    console.log('PIN entered:', value);
    setTimeout(() => {
      setLocation('/');
    }, 500);
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
