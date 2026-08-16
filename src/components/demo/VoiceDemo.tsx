import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AudioVisualizer } from "@/components/demo/AudioVisualizer";
import {
  ConversationPanel,
  type DemoMessage,
} from "@/components/demo/ConversationPanel";
import type { VoiceState } from "@/lib/voice";

interface DemoStep {
  state: VoiceState;
  wait: number;
  message?: DemoMessage;
}

const SCRIPT: DemoStep[] = [
  { state: "listening", wait: 1700 },
  {
    state: "listening",
    wait: 800,
    message: { kind: "user", text: "Can you tell me when my next meeting is?" },
  },
  { state: "thinking", wait: 1300 },
  {
    state: "speaking",
    wait: 2400,
    message: { kind: "ai", text: "Your next meeting is tomorrow at 10:00 AM." },
  },
  {
    state: "thinking",
    wait: 1100,
    message: { kind: "action", title: "Meeting details fetched" },
  },
  {
    state: "speaking",
    wait: 2100,
    message: { kind: "ai", text: "Would you like me to add a reminder for it?" },
  },
  { state: "listening", wait: 1100, message: { kind: "user", text: "Yes, please." } },
  {
    state: "thinking",
    wait: 1100,
    message: { kind: "action", title: "Reminder set for tomorrow 10:00 AM" },
  },
  {
    state: "speaking",
    wait: 2300,
    message: { kind: "ai", text: "Done — you're all set for tomorrow at 10 AM." },
  },
  { state: "thinking", wait: 700 },
  { state: "idle", wait: 500 },
];

export function VoiceDemo() {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [state, setState] = useState<VoiceState>("idle");
  const [messages, setMessages] = useState<DemoMessage[]>([]);

  useEffect(() => {
    if (!started) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = window.setTimeout(resolve, ms);
        timers.push(t);
      });

    (async () => {
      for (const step of SCRIPT) {
        if (cancelled) return;
        setState(step.state);
        if (step.message) setMessages((prev) => [...prev, step.message!]);
        await wait(step.wait);
      }
      if (!cancelled) {
        setStarted(false);
        setDone(true);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [started]);

  const start = () => {
    setMessages([]);
    setDone(false);
    setStarted(true);
  };

  const reset = () => {
    setStarted(false);
    setDone(false);
    setMessages([]);
    setState("idle");
  };

  return (
    <Section id="demo" className="bg-surface/40">
      <SectionHeading
        eyebrow="Live demo"
        title="Don't just read about it. Talk to it."
        description="A mock conversation showing how the agent listens, reasons, responds and takes action."
      />

      <div className="mx-auto grid max-w-5xl items-stretch gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <AudioVisualizer state={state} className="flex-1" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!started && !done && (
              <Button variant="primary" size="lg" onClick={start}>
                Start Demo
              </Button>
            )}
            {done && (
              <Button variant="primary" size="lg" onClick={start}>
                Run Again
              </Button>
            )}
            {(started || done) && (
              <Button variant="outline" size="lg" onClick={reset}>
                Reset
              </Button>
            )}
          </div>
          <p className="text-center text-xs text-muted">
            Mock preview — the real voice pipeline connects through your backend later.
          </p>
        </div>

        <ConversationPanel messages={messages} />
      </div>
    </Section>
  );
}
