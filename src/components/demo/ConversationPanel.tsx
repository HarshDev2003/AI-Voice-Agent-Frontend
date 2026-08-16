import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type DemoMessage =
  | { kind: "user"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "action"; title: string };

interface ConversationPanelProps {
  messages: DemoMessage[];
  className?: string;
}

export function ConversationPanel({ messages, className }: ConversationPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container && messages.length > 0) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={cn(
        "flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card",
        className
      )}
      aria-label="Demo conversation transcript"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-5 py-3.5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="ml-2 text-xs font-medium tracking-widest text-muted uppercase">
          Live conversation
        </span>
      </div>

      <div
        ref={containerRef}
        className="flex-1 space-y-4 overflow-y-auto p-5"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <p className="flex h-full items-center justify-center text-sm text-muted">
            Press “Start Demo” and the conversation will play here.
          </p>
        )}

        <AnimatePresence initial={false}>
          {messages.map((message, i) => {
            if (message.kind === "action") {
              return (
                <motion.div
                  key={`${i}-action`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-glow/30 bg-glow/10 px-4 py-1.5 text-xs font-medium text-glow">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {message.title}
                  </span>
                </motion.div>
              );
            }

            const isUser = message.kind === "user";
            return (
              <motion.div
                key={`${i}-${message.text}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
              >
                {!isUser && (
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-strong to-accent text-[10px] font-semibold text-white">
                    AI
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    isUser
                      ? "rounded-br-md border border-accent/30 bg-accent/15 text-foreground"
                      : "rounded-bl-md border border-border bg-surface text-foreground"
                  )}
                >
                  {message.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
