import { motion } from "framer-motion";
import {
  AudioLines,
  Bot,
  BrainCircuit,
  Clock,
  History,
  Languages,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const FEATURES = [
  {
    icon: AudioLines,
    title: "Natural Voice Conversations",
    detail: "Human-like conversation in real time — no scripts, menus or dead ends.",
  },
  {
    icon: Languages,
    title: "Multilingual",
    detail: "Understands and responds in English, Hindi and Hinglish.",
  },
  {
    icon: Bot,
    title: "AI Agent",
    detail: "Reasons about requests and executes workflows end to end.",
  },
  {
    icon: BrainCircuit,
    title: "Memory",
    detail: "Keeps relevant context and user preferences across conversations.",
  },
  {
    icon: Workflow,
    title: "Tool Calling",
    detail: "Interacts with external services and APIs to get things done.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    detail: "Handles conversations outside normal working hours, every day.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personal Personality",
    detail: "Configure tone, style and response behavior to match your brand.",
  },
  {
    icon: History,
    title: "Conversation History",
    detail: "Store and review previous conversations in your dashboard.",
  },
];

export function FeaturesSection() {
  return (
    <Section id="features" className="bg-surface/40">
      <SectionHeading
        eyebrow="Core features"
        title="Everything a great assistant needs."
        description="Built on an AI agent architecture — with reasoning, memory, tools and personality baked in."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURES.map(({ icon: Icon, title, detail }) => (
          <motion.article
            key={title}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface transition-colors duration-300 group-hover:border-accent/40">
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-medium text-balance">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{detail}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
