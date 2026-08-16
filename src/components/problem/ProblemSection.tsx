import { motion } from "framer-motion";
import { ArrowDown, Headset, MessageSquareOff, Timer, UserX } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const PROBLEMS = [
  {
    icon: UserX,
    title: "Missed calls",
    result: "Lost opportunities",
  },
  {
    icon: Timer,
    title: "Limited availability",
    result: "Customers wait",
  },
  {
    icon: MessageSquareOff,
    title: "Repetitive conversations",
    result: "Human time is wasted",
  },
  {
    icon: Headset,
    title: "Inconsistent communication styles",
    result: "Inconsistent experience",
  },
];

export function ProblemSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The problem"
        title="Your calls shouldn't have to wait."
        description="Every missed or mishandled call is a lost conversation — and a lost opportunity for your business."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROBLEMS.map(({ icon: Icon, title, result }) => (
          <motion.article
            key={title}
            variants={fadeUp}
            className="group rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-border-strong hover:bg-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface">
              <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-medium text-balance">{title}</h3>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted">
              <ArrowDown className="h-4 w-4 text-border-strong" aria-hidden="true" />
              <span>{result}</span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
