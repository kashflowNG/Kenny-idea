import { useEffect, useRef, useState } from "react";

interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
}

export default function PinInput({ length = 6, value, onChange, onComplete }: PinInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, length);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-3" onClick={handleClick}>
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < value.length 
                ? 'bg-primary' 
                : focused 
                ? 'bg-primary/30' 
                : 'bg-muted'
            }`}
            data-testid={`pin-dot-${i}`}
          />
        ))}
      </div>
      
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="sr-only"
        data-testid="input-pin"
        autoFocus
      />
      
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((key, i) => (
          key !== '' ? (
            <button
              key={i}
              onClick={() => {
                if (key === '⌫') {
                  onChange(value.slice(0, -1));
                } else {
                  if (value.length < length) {
                    onChange(value + key);
                  }
                }
              }}
              className="h-14 rounded-xl bg-card hover-elevate active-elevate-2 font-semibold text-lg"
              data-testid={`button-key-${key}`}
            >
              {key}
            </button>
          ) : (
            <div key={i} />
          )
        ))}
      </div>
    </div>
  );
}
