import { motion } from "framer-motion";
import {
  ArrowDown,
  AudioLines,
  Bot,
  BrainCircuit,
  Database,
  FolderKanban,
  Globe2,
  Puzzle,
  Workflow,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const CORE = [
  { icon: BrainCircuit, label: "Reasoning" },
  { icon: Database, label: "Memory" },
  { icon: Puzzle, label: "Tools" },
  { icon: FolderKanban, label: "Context" },
];

const CAPABILITIES = [
  { icon: Database, label: "RAG" },
  { icon: BrainCircuit, label: "Memory" },
  { icon: Puzzle, label: "Tool Calling" },
  { icon: FolderKanban, label: "Context Management" },
  { icon: Workflow, label: "Agent Workflows" },
  { icon: Globe2, label: "Multilingual Conversations" },
];

export function AICapabilities() {
  return (
    <Section className="bg-surface/40">
      <SectionHeading
        eyebrow="AI capabilities"
        title="More than a voice bot. An AI agent."
        description="Ordinary bots play back scripts. This agent reasons, remembers and acts — with tools and context, end to end."
      />

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative flex flex-col items-stretch gap-2 rounded-3xl border border-border bg-card p-5 shadow-card">
            <div className="pointer-events-none absolute inset-0 bg-glow opacity-70 rounded-3xl" />
            <div className="relative flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
              <AudioLines className="h-5 w-5 text-glow" aria-hidden="true" />
              <span className="text-sm font-medium">Voice Input</span>
            </div>
            <ArrowDown className="relative mx-auto h-4 w-4 text-border-strong" aria-hidden="true" />
            <div className="relative rounded-2xl border border-accent/50 bg-accent/10 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Bot className="h-5 w-5 text-accent" aria-hidden="true" />
                AI Agent
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CORE.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <ArrowDown className="relative mx-auto h-4 w-4 text-border-strong" aria-hidden="true" />
            <div className="relative flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
              <AudioLines className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="text-sm font-medium">Voice Output</span>
            </div>
          </div>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid content-center gap-3 sm:grid-cols-2"
        >
          {CAPABILITIES.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors duration-300 hover:border-accent/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface">
                <Icon className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
