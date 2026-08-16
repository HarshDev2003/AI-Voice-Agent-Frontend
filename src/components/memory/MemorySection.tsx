import { motion } from "framer-motion";
import { ArrowDown, BrainCircuit, MessageSquareText, History } from "lucide-react";
import { Section } from "@/components/common/Section";
import { fadeLeft, fadeRight } from "@/lib/motion";

const MEMORY_FLOW = [
  { icon: MessageSquareText, label: "Conversation" },
  { icon: BrainCircuit, label: "Memory" },
  { icon: History, label: "Future Context" },
];

export function MemorySection() {
  return (
    <Section className="bg-surface/40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mx-auto w-full max-w-md"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-5 py-3.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-widest text-muted uppercase">
                Memory in action
              </span>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md border border-accent/30 bg-accent/15 px-4 py-2.5 text-sm">
                  I prefer morning meetings.
                </p>
              </div>
              <div className="flex justify-start">
                <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-2.5 text-sm text-muted">
                  Got it.
                </p>
              </div>
              <div className="flex items-center gap-3 py-1 text-xs text-muted">
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
                Later…
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md border border-accent/30 bg-accent/15 px-4 py-2.5 text-sm">
                  Schedule my meeting.
                </p>
              </div>
              <div className="flex justify-start">
                <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-2.5 text-sm">
                  Would you like it in the morning?
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            It remembers <span className="text-gradient">what matters.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            The assistant keeps relevant context across conversations, so it never asks twice and
            acts on what it already knows.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {MEMORY_FLOW.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </span>
                {i < MEMORY_FLOW.length - 1 && (
                  <ArrowDown className="h-4 w-4 text-border-strong sm:rotate-[-90deg]" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
