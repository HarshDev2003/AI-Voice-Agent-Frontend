import { cn } from "@/lib/utils";
import { voiceStateLabels, type VoiceState } from "@/lib/voice";

interface AudioVisualizerProps {
  state: VoiceState;
  className?: string;
}

const BAR_COUNT = 22;

export function AudioVisualizer({ state, className }: AudioVisualizerProps) {
  const label = voiceStateLabels[state];

  return (
    <div
      className={cn(
        "wave-" + state,
        "relative flex flex-col items-center gap-5 rounded-3xl border border-border bg-card p-7 shadow-card",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-80 rounded-3xl" />

      <div className="relative flex h-20 w-20 items-center justify-center">
        <span
          className={cn(
            "absolute inset-0 rounded-full border-2",
            state === "speaking" && "border-glow",
            state === "listening" && "border-accent",
            state === "thinking" && "border-amber-400"
          )}
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-strong to-accent text-sm font-semibold text-white">
          {state === "thinking" ? "…" : "AI"}
        </div>
      </div>

      <div className="relative flex h-10 w-full max-w-[240px] items-center justify-center gap-[3px]" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            style={{ "--bar-i": i } as React.CSSProperties}
            className="wave-bar h-8 w-[3px] rounded-full bg-gradient-to-t from-accent-strong via-accent to-glow"
          />
        ))}
      </div>

      <div className="relative flex items-center gap-2 text-sm text-muted">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            state === "idle" && "bg-border-strong",
            state === "listening" && "bg-accent animate-blink",
            state === "thinking" && "bg-amber-400 animate-blink",
            state === "speaking" && "bg-glow animate-blink"
          )}
        />
        {label}
      </div>
    </div>
  );
}
