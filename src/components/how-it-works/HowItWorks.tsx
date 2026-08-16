import { motion } from "framer-motion";
import { Brain, PhoneCall, Reply, Sparkles } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const STEPS = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Receive",
    detail: "The assistant picks up the incoming call and opens the conversation.",
  },
  {
    icon: Brain,
    step: "02",
    title: "Understand",
    detail: "Speech is converted to text and context. The agent grasps intent, history and what's needed.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Think & Act",
    detail: "The agent decides: answer a question, search, use a tool, recall memory or take an action.",
  },
  {
    icon: Reply,
    step: "04",
    title: "Respond",
    detail: "A natural AI response is spoken back — in English, Hindi or Hinglish.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="From call to action in seconds."
        description="Four steps. One continuous conversation — the assistant listens, reasons and responds like a real agent."
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        <div
          className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          aria-hidden="true"
        />
        {STEPS.map(({ icon: Icon, step, title, detail }) => (
          <motion.li key={step} variants={fadeUp} className="relative">
            <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-card-hover">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-strong to-accent shadow-glow">
                  <Icon className="h-5.5 w-5.5 text-white" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold tracking-widest text-border-strong">
                  {step}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
