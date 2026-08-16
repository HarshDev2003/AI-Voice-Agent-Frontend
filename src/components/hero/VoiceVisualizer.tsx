import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mic, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { voiceStateLabels, type VoiceState } from "@/lib/voice";

interface VoiceVisualizerProps {
  state?: VoiceState;
  className?: string;
}

const BAR_COUNT = 26;

export function VoiceVisualizer({ state = "idle", className }: VoiceVisualizerProps) {
  const label = voiceStateLabels[state];

  return (
    <div
      className={cn(
        "wave-" + state,
        "relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-glow-cyan opacity-60" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-muted uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" />
          AI Voice Assistant
        </div>

        <div className="relative flex h-24 w-24 items-center justify-center">
          <AnimatePresence mode="wait">
            {state === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Loader2 className="h-10 w-10 text-accent animate-spin" />
              </motion.div>
            )}
            {state === "listening" && (
              <motion.span
                key="ring-listening"
                initial={{ scale: 0.6, opacity: 0.6 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-accent"
              />
            )}
            {state === "speaking" && (
              <motion.span
                key="ring-speaking"
                initial={{ scale: 0.7, opacity: 0.7 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-glow"
              />
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              scale: state === "speaking" ? [1, 1.12, 1] : 1,
              boxShadow:
                state === "speaking"
                  ? "0 0 44px rgba(34,211,238,0.55)"
                  : state !== "idle"
                    ? "0 0 34px rgba(139,92,246,0.5)"
                    : "0 0 22px rgba(139,92,246,0.25)",
            }}
            transition={state === "speaking" ? { duration: 0.9, repeat: Infinity } : { duration: 0.5 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-strong to-accent"
          >
            <AnimatePresence mode="wait" initial={false}>
              {state === "thinking" ? null : state === "speaking" ? (
                <Volume2 key="speaking" className="h-9 w-9 text-white" aria-hidden="true" />
              ) : (
                <Mic key="mic" className={cn("h-9 w-9 text-white", state === "listening" && "animate-blink")} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex h-16 w-full items-center justify-center gap-[3px]" aria-hidden="true">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              style={{ "--bar-i": i } as React.CSSProperties}
              className="wave-bar h-10 w-[3px] rounded-full bg-gradient-to-t from-accent-strong via-accent to-glow"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
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
    </div>
  );
}
