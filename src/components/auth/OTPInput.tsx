import { useRef } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  id?: string;
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function OTPInput({ id = "otp", length = 6, value, onChange, error }: OTPInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const focusIndex = (index: number) => {
    const el = inputs.current[Math.max(0, Math.min(length - 1, index))];
    el?.focus();
    el?.select();
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = value.split("");
    next[index] = digit;
    const joined = next.join("").slice(0, length);
    onChange(joined);
    if (digit) focusIndex(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const next = value.split("");
        next[index] = "";
        onChange(next.join(""));
      } else {
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      focusIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!digits) return;
    onChange(digits);
    focusIndex(digits.length);
  };

  return (
    <div>
      <div
        id={id}
        tabIndex={-1}
        className="flex justify-between gap-2 focus:outline-none"
        onPaste={handlePaste}
        role="group"
        aria-label={`Enter the ${length}-digit verification code`}
      >
        {Array.from({ length }).map((_, i) => {
          const digit = value[i] ?? "";
          return (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1} of ${length}`}
              aria-invalid={Boolean(error) && value.length < length}
              className={cn(
                "h-13 w-full min-w-0 rounded-xl border bg-surface text-center text-lg font-semibold text-foreground transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                error ? "border-danger/70" : "border-border focus:border-accent"
              )}
            />
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
